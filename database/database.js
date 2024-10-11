import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backend",
    })
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch((err) => {
      console.log("Mongodb connection error", err);
    });
};
