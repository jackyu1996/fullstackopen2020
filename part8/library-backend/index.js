const {
  ApolloServer, UserInputError, AuthenticationError, gql,
} = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/User');

const { SECRET } = process.env;
const { MONGODB_URI } = process.env;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book!

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          throw new UserInputError('Author not in Database yet!');
        }
        return Book.find({ author: author._id });
      }
      return Book.find({}).populate('author');
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },

  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });
      return Book.find({ author: author.id }).countDocuments();
    },
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
        await book.save();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }

      return book;
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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
