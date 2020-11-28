const _ = require('lodash');

const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, item) => sum + item.likes, 0);

const favoriteBlog = (blogs) => blogs.reduce((fav, blog) => {
  if (!fav.likes) {
    fav.likes = 0;
  }

  if (blog.likes > fav.likes) {
    fav.title = blog.title;
    fav.author = blog.author;
    fav.likes = blog.likes;
  }

  return fav;
}, {});

const mostBlogs = (blogs) => blogs.reduce((authorBlogs, blog) => {
  if (!authorBlogs.find((i) => i.author === blog.author)) {
    authorBlogs.push({
      author: blog.author,
      blogs: 1,
    });
  } else {
    authorBlogs.find((i) => i.author === blog.author).blogs += 1;
  }

  return authorBlogs;
}, [])
  .reduce((acc, autb) => {
    if (!acc.blogs) {
      acc.blogs = 0;
    }

    if (autb.blogs > acc.blogs) {
      acc.author = autb.author;
      acc.blogs = autb.blogs;
    }

    return acc;
  }, {});

const mostLikes = (blogs) => {
  const pairs = _(blogs)
    .groupBy('author')
    .mapValues((b) => _.sumBy(b, 'likes'))
    .toPairs()
    .maxBy((b) => b[1]);

  return pairs ? _.zipObject(['author', 'likes'], pairs) : {};
};

// Same method as mostBlogs
//
// const mostLikes = (blogs) => blogs.reduce((authorLikes, blog) => {
// if (!authorLikes.find((i) => i.author === blog.author)) {
// authorLikes.push({
// author: blog.author,
// likes: blog.likes,
// });
// } else {
// authorLikes.find((i) => i.author === blog.author).likes += blog.likes;
// }

// return authorLikes;
// }, [])
// .reduce((acc, autb) => {
// if (!acc.likes) {
// acc.likes = 0;
// }

// if (autb.likes > acc.likes) {
// acc.author = autb.author;
// acc.likes = autb.likes;
// }

// return acc;
// }, {});

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
