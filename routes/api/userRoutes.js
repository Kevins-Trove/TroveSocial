const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  addThought,
  removeThought,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getUser).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/user/:userId/thought
router.route('/:userId/thought').post(addThought);

// /api/user/:userId/thoughts/:thoughtId
router.route('/:userId/thoughts/:thoughtId').delete(removeThought);

// /api/user/:userId/friend
router.route('/:userId/friend').post(addFriend);

// /api/user/:userId/friend/:friendId
router.route('/:userId/friend/:friendId').delete(removeFriend);
module.exports = router;
