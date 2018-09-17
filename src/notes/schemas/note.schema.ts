import { Schema } from 'mongoose';

export const NoteSchema = new Schema(
  {
    text: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);