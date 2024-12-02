import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  handle: string;
  name: string;
  email: string;
  password: string;
}

//  trim: true, Limpia los espacios blancos

const userSchema = new Schema({
  handle: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
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
    lowercase: true,
    match: [
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Por favor ingrese un correo electrónico válido',
    ],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
  },
});

//modelo
//generics <'codigo reusable'>
const User = mongoose.model<IUser>('User', userSchema);
export default User;
