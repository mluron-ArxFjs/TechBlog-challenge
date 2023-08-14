const router = require('express').Router();
const { User, Post } = require('../models');
const { withAuth, isGuest } = require('../utils/auth');

// @desc    homepage
// @route   /
router.get('/',withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [['createdAt', 'DESC']]
    });
    const posts = postData.map((post) =>
      post.get({ plain: true })
    );

    if (req.session.loggedIn || req.isAuthenticated()) {
      const userData = await User.findByPk(req.session.userId || req.user.id);
      const user = userData.get({ plain: true });

      res.render('homepage', {
        posts, user, loggedIn: req.session.loggedIn || req.isAuthenticated(),
      });
    } else {
      res.render('homepage', {
        posts, loggedIn: req.session.loggedIn || req.isAuthenticated(),
      });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// @desc    Signup page
// @route   /signup
router.get('/signup', isGuest, (req, res) => {
  res.render('signup');
});

// @desc    Login page
// @route   /login
router.get('/login', isGuest, (req, res) => {
  res.render('login');
});

module.exports = router;