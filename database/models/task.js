const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  dueDate: {
    type: Date,
    required: true
  },
  priority: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  }
});

module.exports = mongoose.model('Task', taskSchema);
