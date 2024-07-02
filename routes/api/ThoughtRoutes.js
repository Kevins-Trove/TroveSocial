const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

// /api/Thought
router.route('/').get(getThought).post(createThought);

// /api/Thought/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

  // /api/Thought/:thoughtId/reaction
router
.route('/:thoughtId/reaction')
.post(createReaction);

// /api/user/:userId/friend/:friendId
router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);

module.exports = router;
