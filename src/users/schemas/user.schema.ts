import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    username: {
      required: true,
      unique: true,
      type: String,
    },
    name: {
      required: true,
      type: String
    },
    notes: [{
      type: Schema.Types.ObjectId,
      ref: "Note" 
    }],
  },
  { timestamps: true }
);