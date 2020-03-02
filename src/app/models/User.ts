import { Schema, model, Document } from 'mongoose'

interface User extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: true
})

export default model<User>('User', schema)
