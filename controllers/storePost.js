const BlogPost = require("../models/BlogPost");
const path = require('path');

module.exports = async (req, res) => {
  let image = req.files.image;
  image.mv(path.join(__dirname, "../public/img", image.name), async (error) => {
    if (error) {
      req.flash('validationErrors', "Unable to upload image");
      return res.redirect('/posts/new');
    }

    await BlogPost.create({ ...req.body, image: "../img/" + image.name, userid: req.session.userId });
    res.redirect("/");
  });
};
