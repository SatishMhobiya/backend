import express from "express"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import userRouter from "./routes/user.js"
import {config} from "dotenv"

export const app = express();

config({
    path: "./config.env"
})

//middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use("/users", userRouter)
