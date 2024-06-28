const { ObjectId } = require('mongoose').Types;
const {  Thought } = require('../models');

module.exports = {
  // Get all Thoughts
  async getThought(req, res) {
    console.log("getThought");

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
    console.log("getSingleThought");
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
      const dbThoughtData = await Thought.create(req.body);
      
      const dbUserData = await User.findOneAndUpdate(
        {_id: req.body.userId},
        {$push: { thoughts: dbThoughtData._id}},
        {new: true}
      )
      
      res.json(Thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a Thought
  async deleteThought(req, res) {
    try {
      const Thought = await Thought.findOneAndDelete({ _id: req.params.ThoughtId });

      if (!Thought) {
        res.status(404).json({ message: 'No Thought with that ID' });
      }

      await User.deleteMany({ _id: { $in: Thought.students } });
      res.json({ message: 'Thought and students deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a Thought
  async updateThought(req, res) {
    try {
      const Thought = await Thought.findOneAndUpdate(
        { _id: req.params.ThoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!Thought) {
        res.status(404).json({ message: 'No Thought with this id!' });
      }

      res.json(Thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
