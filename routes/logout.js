import express from "express";
import { handleLogout } from "../controllers/logoutController.js";

export const logoutRouter = express.Router();

logoutRouter.get("/", handleLogout);
