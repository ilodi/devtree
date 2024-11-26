import mongoose from "mongoose";

export const connectDB = async() =>{
  try {
    const {connection} = await mongoose.connect(process.env.MONGO_URI)
    const url = `${connection.host}:${connection.port}`
    console.log(`Mongo DB Conected ${url}`)
  } catch (error) {
    console.log(error.message)
    //termina la eje.. del programa
    process.exit(1)
  }
}