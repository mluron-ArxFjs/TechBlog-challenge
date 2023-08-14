const router = require ("express").Router();
const { Comment } = require("../../models/");

router.post('/:id', (req, res) => {
    console.log(req.body)
      Comment.create({ ...req.body, user_id: req.session.userId, post_id: req.params.id })
        .then(newComment => {res.json(newComment); 
          })
        .catch(err => {
          res.status(500).json(err);
        });
  });
  
  module.exports = router;