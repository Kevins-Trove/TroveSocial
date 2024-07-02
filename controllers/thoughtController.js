const { ObjectId } = require('mongoose').Types;
const {  User, Thought, Reaction } = require('../models');

module.exports = {
  // Get all Thoughts
  async getThought(req, res) {

    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  
  },
  // Get a Thought
  async getSingleThought(req, res) {

    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No Thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a Thought
  async createThought(req, res) {
    
    try {
      // Find user to assign thought to
      const userInfo = await User.findOne({ _id: req.body.userId });

      if (!userInfo) {
        return res.status(404).json({ message: 'No user exist to assign thought to that ID' })
      } 

      let dbThoughtData = req.body;
      dbThoughtData.username = userInfo.username

      const thought = await Thought.create(dbThoughtData);
      
      const dbUserData = await User.findOneAndUpdate(
        {_id: req.body.userId},
        {$push: { thoughts: thought._id}},
        {new: true}
      )
      
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a Thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      if (!thought) {
        res.status(404).json({ message: 'No Thought with that ID' });
      }

      await User.deleteMany({ _id: { $in: Thought.thoughts } });
      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a Thought
  async updateThought(req, res) {

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No Thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a Reaction
  async createReaction(req, res) {
    try {
      // Find thought to assign thought to
      const thoughtInfo = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thoughtInfo) {
        return res.status(404).json({ message: 'No thought exists to assign reaction to that ID' })
      } 
      
      const newData = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$push: { reactions: req.body}},
        {new: true}
      )
      
      res.json(newData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a Reaction
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: 'No reaction found with that ID :(' });
      }

     
      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
