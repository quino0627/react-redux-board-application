exports.checkLogin = (req, res, next) => {
  console.log("HELLLLLO");
  console.log(req.session.user);
  if (req.session.user && req.session.user.username) {
    req.currentUsername = req.session.user.username;
    return next();
  } else {
    return;
  }
};

exports.isMyUid = (req, res, next) => {
  console.log("HIHI");
  console.log(` ${req.session.user.username}`);
  if (req.session.user && req.session.user.username) {
    req.currentUsername = req.session.user.username;
    return next();
  } else {
    return res.status(401).json({ success: false });
  }
};
