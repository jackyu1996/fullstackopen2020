const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

// Terrible network
jest.setTimeout(60000);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const blogObjects = helper.initialBlogs
    .map((blog) => new Blog(blog));

  const userObjects = helper.initialUsers
    .map((user) => new User(user));

  const promiseArrary = blogObjects.map((b) => b.save())
    .concat(userObjects.map((u) => u.save()));

  await Promise.all(promiseArrary);
});

describe('login endpoint works', () => {
  test('login with valid username and password works', async () => {
    const response = await api
      .post('/api/login')
      .send(helper.existingUser)
      .expect(200);

    expect(response.body.username).toEqual(helper.existingUser.username);
    expect(response.body.name).toEqual(helper.existingUser.name);
  });

  test('login with right username and wrong password fails', async () => {
    await api
      .post('/api/login')
      .send({
        ...helper.existingUser,
        password: 'absolutelynote',
      })
      .expect(401);
  });

  test('login with invalid username and password fails', async () => {
    const nonExistingUser = {
      username: 'nonExisting',
      password: 'falseone',
    };

    await api
      .post('/api/login')
      .send(nonExistingUser)
      .expect(401);
  });
});

describe('user endpoint works', () => {
  test('user api return json and right amount', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.length).toEqual(helper.initialUsers.length);
  });

  test('add valid user works', async () => {
    const usersBefore = await helper.usersInDb();

    await api
      .post('/api/users')
      .send(helper.validUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAfter = await helper.usersInDb();

    expect(usersAfter.length).toEqual(usersBefore.length + 1);
  });

  test('add duplicate username fails', async () => {
    const usersBefore = await helper.usersInDb();

    await api
      .post('/api/users')
      .send(helper.dumplicateUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAfter = await helper.usersInDb();
    expect(usersAfter).toHaveLength(usersBefore.length);

    expect(usersAfter).not.toContainEqual(helper.dumplicateUser);
  });

  test('invalid username fails', async () => {
    const usersBefore = await helper.usersInDb();

    await api
      .post('/api/users')
      .send(helper.userInvalidUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAfter = await helper.usersInDb();

    expect(usersAfter.length).toEqual(usersBefore.length);
  });

  test('invalid password fails', async () => {
    const usersBefore = await helper.usersInDb();

    await api
      .post('/api/users')
      .send(helper.userInvalidPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAfter = await helper.usersInDb();

    expect(usersAfter.length).toEqual(usersBefore.length);
  });
});

describe('blog endpoint works', () => {
  describe('get blog works', () => {
    test('get all blog works', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toHaveLength(helper.initialBlogs.length);
      response.body.map((b) => expect(b.id).toBeDefined());
      response.body.map((b) => expect(b._id).toBeFalsy());
    });

    test('get existing blog works', async () => {
      const wantedBlog = helper.initialBlogs[0];

      const response = await api
        .get(`/api/blogs/${wantedBlog._id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body.url).toEqual(wantedBlog.url);
      expect(response.body.title).toEqual(wantedBlog.title);
      expect(response.body.author).toEqual(wantedBlog.author);
      expect(response.body.likes).toEqual(wantedBlog.likes);
      expect(response.body.user).toEqual(wantedBlog.user.toString());
    });

    test('get invalidId blog fails', async () => {
      await api
        .get('/api/blogs/nonexistingid')
        .expect(400);
    });

    test('get non-existing blog fails', async () => {
      await api
        .get(`/api/blogs/${helper.nonExistingId}`)
        .expect(404);
    });
  });

  describe('post blog works', () => {
    test('post blog to endpoint from valid user adds it', async () => {
      const response = await api
        .post('/api/login')
        .send(helper.existingUser);

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${response.body.token}`)
        .send(helper.validBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const newBlogs = await helper.blogsInDb();
      expect(newBlogs).toHaveLength(helper.initialBlogs.length + 1);

      const blog = newBlogs.find((b) => b.title === helper.validBlog.title);

      expect(blog).not.toBeFalsy();
      expect(blog.likes).toEqual(0);
      expect(blog.url).toEqual(helper.validBlog.url);
      expect(blog.author).toEqual(helper.validBlog.author);
      expect(blog.user.toString()).toEqual(helper.initialUsers[1]._id);
    });

    test('post invalid blog from valid user get 400', async () => {
      const response = await api
        .post('/api/login')
        .send(helper.existingUser);

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${response.body.token}`)
        .send(helper.blogWithoutUrl)
        .expect(400);

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${response.body.token}`)
        .send(helper.blogWithoutTitle)
        .expect(400);
    });

    test('post without user verification fails', async () => {
      await api
        .post('/api/blogs')
        .send(helper.validBlog)
        .expect(401);
    });
  });

  describe('delete blog works', () => {
    test('delete valid blog from right user works', async () => {
      const blogsBefore = await helper.blogsInDb();
      const blogToDelete = blogsBefore[3];

      const response = await api
        .post('/api/login')
        .send(helper.existingUser);

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${response.body.token}`)
        .expect(204);

      const blogsAfter = await helper.blogsInDb();

      expect(blogsAfter).toHaveLength(helper.initialBlogs.length - 1);

      expect(blogsAfter.find((b) => b.id === blogToDelete.id)).toBeFalsy();
    });

    test('delete valid blog from wrong user fails', async () => {
      const blogsBefore = await helper.blogsInDb();
      const blogToDelete = blogsBefore[0];

      const response = await api
        .post('/api/login')
        .send(helper.existingUser);

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${response.body.token}`)
        .expect(401);

      const blogsAfter = await helper.blogsInDb();

      expect(blogsAfter).toHaveLength(helper.initialBlogs.length);
    });

    test('delete non-existing id from valid user fails', async () => {
      const response = await api
        .post('/api/login')
        .send(helper.existingUser);

      await api
        .delete(`/api/blogs/${helper.nonExistingId}`)
        .set('Authorization', `Bearer ${response.body.token}`)
        .expect(404);
    });

    test('delete without verification fails', async () => {
      await api
        .delete(`/api/blogs/${helper.initialBlogs[0]._id}`)
        .expect(401);
    });
  });

  describe('update blog works', () => {
    test('update blogs with right user and valid id works', async () => {
      const blogsBefore = await helper.blogsInDb();
      const blogToUpdate = blogsBefore[3];
      const newLikes = 11;

      const response = await api
        .post('/api/login')
        .send(helper.existingUser);

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `Bearer ${response.body.token}`)
        .send({ ...blogToUpdate, likes: newLikes })
        .expect(204);

      const blogsAfter = await helper.blogsInDb();

      expect(blogsAfter).toHaveLength(helper.initialBlogs.length);

      expect(blogsAfter.find((b) => b.id === blogToUpdate.id).likes)
        .toEqual(newLikes);
    });

    test('update blogs with wrong user and valid id fails', async () => {
      const blogsBefore = await helper.blogsInDb();
      const blogToUpdate = blogsBefore[0];
      const newLikes = 5;

      const response = await api
        .post('/api/login')
        .send(helper.existingUser);

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `Bearer ${response.body.token}`)
        .send({ ...blogToUpdate, likes: newLikes })
        .expect(401);

      const blogsAfter = await helper.blogsInDb();

      expect(blogsAfter).toHaveLength(helper.initialBlogs.length);

      expect(blogsAfter.find((b) => b.id === blogToUpdate.id).likes)
        .toEqual(blogsBefore[0].likes);
    });

    test('update non-existing id from valid user fails', async () => {
      const response = await api
        .post('/api/login')
        .send(helper.existingUser);

      await api
        .put(`/api/blogs/${helper.nonExistingId}`)
        .set('Authorization', `Bearer ${response.body.token}`)
        .expect(404);
    });

    test('update without verification fails', async () => {
      await api
        .put(`/api/blogs/${helper.initialBlogs[0]._id}`)
        .expect(401);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
