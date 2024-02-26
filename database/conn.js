import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (err) {
    console.log(err);
    // process.exit(1);
    return Promise.reject(err);
  }
};

export default connectMongo;
