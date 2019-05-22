exports.checkLogin = (req, res, next) => {
  console.log(req.session.user);
  if (req.session.user && req.session.user.username) {
    return next();
  } else {
    return;
  }
};

exports.isMyUid = (req, res, next) => {
  if (
    req.session.user &&
    req.session.user.username &&
    req.session.user.username === parseInt(parseInt(req.params.uid))
  ) {
    return next();
  } else {
    return;
  }
};
