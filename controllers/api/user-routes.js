const router = require('express').Router();
const { User } = require('../../models');

// @desc    Signup
// CREATE new user
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = userData.id;
      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// @desc    Login
// @route   /api/users/login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = userData.id;
      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// @desc    Logout
// @route   /api/users/logout
router.get('/logout', (req, res, next) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect('/');
    });
    
  } else if (req.isAuthenticated()) {
    req.logout((error) => {
      if (error) {
        return next(error);
      }
      res.redirect('/');
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
