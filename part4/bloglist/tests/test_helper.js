const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    _id: '2a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '5fc0ea5ed0ecba81bdcb7277',
    __v: 0,
  }, {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '5fc0ea5ed0ecba81bdcb7277',
    __v: 0,
  }, {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '5fc0ea5ed0ecba81bdcb7277',
    __v: 0,
  }, {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '5fc0ea82d0ecba81bdcb7278',
    __v: 0,
  }, {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: '5fc0ea82d0ecba81bdcb7278',
    __v: 0,
  }, {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '5fc0ea82d0ecba81bdcb7278',
    __v: 0,
  },
];

const initialUsers = [
  {
    _id: '5fc0ea5ed0ecba81bdcb7277',
    username: 'john.doe',
    name: 'John Doe',
    passwordHash: '$2b$10$MQEercgBfq6O33gyXAjtU.QDB1cM1Yfq4A1seBT2uvuKNXDXiz95m',
    // password: 'guessagain',
    blogs: [
      '2a422a851b54a676234d17f7',
      '5a422aa71b54a676234d17f8',
      '5a422b3a1b54a676234d17f9',
    ],
    __v: 0,
  },
  {
    _id: '5fc0ea82d0ecba81bdcb7278',
    username: 'jane.miles',
    name: 'Jane Miles',
    passwordHash: '$2b$10$bXGASyn7XOVe.t6XwKwgzOjVZiT1hP/edkQOPvhLRfxL/PzPNHZlS',
    // password: 'notright',
    blogs: [
      '5a422b891b54a676234d17fa',
      '5a422ba71b54a676234d17fb',
      '5a422bc61b54a676234d17fc',
    ],
    __v: 0,
  },
];

const existingUser = {
  username: 'jane.miles',
  name: 'Jane Miles',
  password: 'notright',
};

const dumplicateUser = {
  username: 'john.doe',
  name: 'John Doe',
  password: 'anewme',
};

const validBlog = {
  title: 'How to Think for Yourself',
  author: 'Paul Graham',
  url: 'http://www.paulgraham.com/think.html',
};

const blogWithoutUrl = {
  title: 'Bad Guy',
};

const blogWithoutTitle = {
  url: 'https://example.com',
};

const nonExistingId = '2a422a851b54a676234d17f6';

const validUser = {
  username: 'jonsnow',
  name: 'Jon Snow',
  password: 'youknownothing',
};

const userInvalidUsername = {
  username: 'jx',
  name: 'Not Me',
  password: 'guessagain',
};

const userInvalidPassword = {
  username: 'johndoe',
  name: 'Anyway',
  password: 'no',
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  initialUsers,
  existingUser,
  dumplicateUser,
  validBlog,
  blogWithoutUrl,
  blogWithoutTitle,
  nonExistingId,
  validUser,
  userInvalidUsername,
  userInvalidPassword,
  blogsInDb,
  usersInDb,
};
