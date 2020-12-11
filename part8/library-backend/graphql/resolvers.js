const { UserInputError, AuthenticationError, PubSub } = require('apollo-server');
const jwt = require('jsonwebtoken');

const Author = require('../models/Author');
const Book = require('../models/Book');
const User = require('../models/User');

const pubsub = new PubSub();

const { SECRET } = process.env;

module.exports = {
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name }).populate('book');
      return author.books.length;
    },
  },

  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          throw new UserInputError('Author not in Database yet!');
        }
        return Book.find({ author: args.author, genres: { $in: args.genre } }).populate('author');
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          throw new UserInputError('Author not in Database yet!');
        }
        return Book.find({ author: author._id });
      }

      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate('author');
        // It also works without $in
        // return Book.find({ genres: args.genre }).populate('author');
      }

      return Book.find({}).populate('author');
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated');
      }

      const author = await Author.findOne({ name: args.author });
      if (!author) {
        throw new UserInputError('Author not in Database yet!');
      }

      const book = new Book({ ...args, author: author._id });

      try {
        const returnedBook = await book.save();
        author.books.push(returnedBook.id);
        author.save();

        const fullBook = await returnedBook.populate('author');

        pubsub.publish('BOOK_ADDED', { bookAdded: fullBook });

        return fullBook;
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated');
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        throw new UserInputError('Author not in Database yet!');
      }

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
      return author;
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username });

      try {
        await user.save();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }

      return user;
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('Wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};
