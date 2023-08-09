const router = require('express').Router();
const { Post } = require('../../models');
//const { withAuth } = require('../../utils/auth');

// @desc    Add post
// @route   /api/post
router.post('/', async (req, res) => {
  try {   
    const body = req.body;
    console.log(req.session);
    const newPost = await Post.create({ ...body, user_id: req.session.userId })
    console.log('post-routes', newPost)
    res.status(200).json(newPost);
  }

  catch (err) {
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
      console.log('before update routes', postData)
      const updatedData = await Post.update({
        title: req.body.title,
        text: req.body.content,
      }, {
        where: { id: req.params.id }
      });
      console.log('after update routes', updatedData)
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
