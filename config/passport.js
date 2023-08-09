const User = require('../models/User');

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    User.findByPk(user.id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => done(err));
  });
};
