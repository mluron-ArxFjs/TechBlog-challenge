const router = require('express').Router();
const { User, Post } = require('../models');
const { withAuth } = require('../utils/auth');

// @desc    Dashboard
// @route   /dashboard
router.get('/',withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId || req.user.id);
    const user = userData.get({ plain: true });
    const postData = await Post.findAll({
      where: { user_id: req.session.userId || req.user.id },
      order: [['createdAt', 'DESC']]
    });
    console.log(req.session)
    if (postData.length) {
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('dashboard', { posts, user, loggedIn: req.session.loggedIn || req.isAuthenticated() });
    } else {
      res.render('dashboard', { user, loggedIn: req.session.loggedIn || req.isAuthenticated() });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// @desc    Dashboard create post page
// @route   /dashboard/create
router.get('/create', async (req, res) => {
  res.render('dashboard-create', { loggedIn: req.session.loggedIn || req.isAuthenticated() });
  console.log(req.session);
});

// @desc    Dashboard edit post page
// @route   /dashboard/post/:id
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (postData) {
      const post = postData.get({ plain: true });
      res.render('dashboard-edit', { post, loggedIn: req.session.loggedIn || req.isAuthenticated() });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
