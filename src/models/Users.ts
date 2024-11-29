import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

//  trim: true, Limpia los espacios blancos

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

//modelo
//generics <'codigo reusable'>
const User = mongoose.model<IUser>('User', userSchema);
export default User;
