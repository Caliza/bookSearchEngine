const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
            return User.findOne({ _id: context.user._id })
        }
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // First we create the user
      const user = await User.create({ username, email, password });
      // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
      const token = signToken(user);
      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ email });

      // If there is no user with that email address, return an Authentication error stating so
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);

      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    addThought: async (parent, { thoughtText, thoughtAuthor }) => {
      const thought = await Thought.create({ thoughtText, thoughtAuthor });

      await User.findOneAndUpdate(
        { username: thoughtAuthor },
        { $addToSet: { thoughts: thought._id } }
      );

      return thought;
    },
    saveBook: async (parent, arg, bookData) => {
      Book.findOneAndUpdate(
      { _id: req.params.bookData },
      { $addToSet: { reactions: req.body} },
      { runValidators: true, new: true }
    )
      .then((bookData) =>
        !bookData
          ? res
              .status(404)
              .json({ message: 'No book found with that ID :(' })
          : res.json(bookData)
      )
      .catch((err) => res.status(500).json(err));
  },
    // addComment: async (parent, { thoughtId, commentText, commentAuthor }) => {
    //   return Thought.findOneAndUpdate(
    //     { _id: thoughtId },
    //     {
    //       $addToSet: { comments: { commentText, commentAuthor } },
    //     },
    //     {
    //       new: true,
    //       runValidators: true,
    //     }
    //   );
    // },
    removeBook: async (parent, arg, bookId) => {
      return Book.findOneAndDelete({ _id: bookId });
    },
    // removeComment: async (parent, { thoughtId, commentId }) => {
    //   return Thought.findOneAndUpdate(
    //     { _id: thoughtId },
    //     { $pull: { comments: { _id: commentId } } },
    //     { new: true }
    //   );
    // },
  },
};

module.exports = resolvers;
