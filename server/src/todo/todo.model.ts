import { Schema, model } from 'mongoose';

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  isDone: Boolean,
});

export const Todo = model('Todo', TodoSchema);
