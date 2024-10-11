import express from "express";
import fs from "fs";
import path from "path"
import mongoose from "mongoose";

const app = express();

//connecting to mongodb
mongoose.connect("mongodb://localhost:27017/backend", {
    dbName: "backend",
}).then(()=>{
    console.log("connected to mongodb");
}).catch((err)=>{
    console.log("Mongodb connection error", err);
})

//Creating a schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String
})

//creating a model
const User = mongoose.model("User", userSchema)

//setting up view engine
app.set("view engine", "ejs");

//midddleware
app.use(express.static(path.join(path.resolve(), "public")))
app.use(express.urlencoded({extended: true}))
const users = []

app.get("/", (req, res) => {
    res.render("index",{name:"abhi"});
})

app.post("/contact", async (req, res) => {
    try {
        const {username, email} = req.body;
        console.log(req.body)
        users.push(req.body)
        await User.create({name: username, email: email})

        // const newUser = new User({
        //     name: req.body.username,
        //     email: req.body.email
        // })
        // const savedUser = await newUser.save();
        // console.log("savedUser", savedUser)
        // res.status(201).json({
        //     message: "user created successfully",
        //     user: savedUser
        // })
        res.redirect("/success")
    } catch (error) {
        // res.status(400).json({
        //     message: "user creation failed",
        //     error: error
        // })
    }
})

app.get("/success", (req, res) => {
    res.render("success")
})

app.get("/users", (req, res) => {
    res.json(users)
})

app.listen(5000, ()=>{
    console.log("server is running at port 5000");
})