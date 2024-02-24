import express from "express";
import { handleRefreshToken } from "../controllers/refreshTokenController.js";

export const refreshRouter = express.Router();

refreshRouter.get("/", handleRefreshToken);
