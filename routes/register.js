import express from "express";
import { handleNewUser } from "../controllers/registerController.js";

export const registerRouter = express.Router();

registerRouter.post("/", handleNewUser);
