import express from "express";
import { deleteUserFunction, getAllUsers, loginUserFunction, registerUserFunction } from "../controllers/user.js";

const router = express.Router();

router.post("/login", loginUserFunction)

router.post("/signup", registerUserFunction)

router.get("/all", getAllUsers)

router.delete("/delete", deleteUserFunction)

export default router;