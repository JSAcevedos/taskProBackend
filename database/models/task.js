const mongoose = require('mongoose')
const { Schema } = mongoose

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
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
  },
  userId: {
    type: String,
    required: true
  }
})

taskSchema.index(
  { title: 1, description: 1, dueDate: 1, userId: 1 },
  { unique: true, partialFilterExpression: { 
    'completed' : false
  }}
)
module.exports = mongoose.model('Task', taskSchema)
