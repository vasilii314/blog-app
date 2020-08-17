module.exports = (req, res, next) => {
  const errors = [];
  if (req.files === null || req.body === null) {

    req.flash('validationErrors', 'You forgot to provide either a title with body or an image');
    return res.redirect('/posts/new');
  }
  next();
};
