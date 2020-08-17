const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
  const searchTerm = new RegExp(req.query.title, "gi");
  const blogposts = await BlogPost.find({ title: searchTerm });
  res.render("search", {
    blogposts,
  });
};
