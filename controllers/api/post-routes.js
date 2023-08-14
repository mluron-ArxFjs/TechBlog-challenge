const router = require('express').Router();
const { Post, Comment } = require('../../models');

// @desc    Add post
// @route   POST /api/post
router.post('/', async (req, res) => {

  try {
    const body = req.body;
    const newPost = await Post.create({ ...body, user_id: req.session.userId })
    if (newPost) {
      res.status(200).redirect('/dashboard')
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// @desc    Add comment
// @route   POST /api/post/:id
router.post('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const commentData = await Comment.create({
        text: req.body.message,
        user_id: req.session.userId || req.user.id,
        post_id: parseInt(req.params.id)
      });
      res.status(200).json(commentData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// @desc    Update post
// @route   PUT /api/post/:id
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const updatedData = await Post.update({
        title: req.body.title,
        text: req.body.content
      }, {
        where: { id: req.params.id }
      });
      res.status(200).json(updatedData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// @desc    Delete post
// @route   DELETE /api/post/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedData = await Post.destroy({
      where: { id: req.params.id }
    });
    res.status(200).json(deletedData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
