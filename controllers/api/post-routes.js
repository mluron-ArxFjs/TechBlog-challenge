const router = require('express').Router();
const { Post } = require('../../models');
//const { withAuth } = require('../../utils/auth');

// @desc    Add post
// @route   POST /api/post
router.post('/', async (req, res) => {

  try {
    console.log('/api/post route', req.session);
    const body = req.body;
    const newPost = await Post.create({ ...body, user_id: req.session.userId })
    console.log('Create newPost-route', newPost)
    if (newPost) {
      res.status(200).redirect('/dashboard')
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
