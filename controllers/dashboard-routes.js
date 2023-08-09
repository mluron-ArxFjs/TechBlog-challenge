const router = require('express').Router();
const { User, Post } = require('../models');
const { withAuth } = require('../utils/auth');

// @desc    Dashboard
// @route   /dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId || req.user.id);
    const user = userData.get({ plain: true });
    const postData = await Post.findAll({
      where: { user_id: req.session.userId || req.user.id },
      order: [['createdAt', 'DESC']]
    });

    if (postData.length) {
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('dashboard', { posts, user: req.session.userId, loggedIn: req.session.loggedIn || req.isAuthenticated() });
    } else {
      res.render('dashboard', { user: req.session.userId, loggedIn: req.session.loggedIn || req.isAuthenticated() });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// @desc    Dashboard create post page
// @route   /dashboard/create
router.get('/create', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.userId || req.user.id },
      order: [['createdAt', 'DESC']]
    });
    if (postData.length) {
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('dashboard-create', { posts, user: req.session.userId, loggedIn: req.session.loggedIn || req.isAuthenticated() });
    } else {
      res.render('dashboard-create', { user: req.session.userId, loggedIn: req.session.loggedIn || req.isAuthenticated() });
    }
    console.log(req.session);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }  
});

// @desc    Dashboard edit post page
// @route   /dashboard/post/:id
router.get('/post/:id', withAuth, async (req, res) => {
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
