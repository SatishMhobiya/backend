import mongoose from "mongoose";


//Creating a schema for user
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

//Creating a model for user
const User = mongoose.model("User", userSchema);

export default User;