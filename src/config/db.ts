import colors from 'colors';
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.cyan.bold(`Mongo DB Conected ${url}`));
  } catch (error) {
    console.log(colors.bgRed.white.bold(error.message));
    //termina la eje.. del programa... buena practica
    process.exit(1);
  }
};
