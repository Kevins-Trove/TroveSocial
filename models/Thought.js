const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughtName: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 2,
      default: 'Unnamed thought',
    },
    content: {
      type: String,
      required: true,
      maxlength: 250
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = thoughtSchema;
