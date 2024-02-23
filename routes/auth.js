import express from "express";
import { handleLogin } from "../controllers/authController.js";

export const authRouter = express.Router();

authRouter.post("/", handleLogin);
