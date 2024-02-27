import express from "express";
import { getAllUsers, deleteUser } from "../../controllers/usersController.js";
import { ROLES_LIST } from "../../config/roles_list.js";
import { verifyRoles } from "../../middleware/verifyRoles.js";

export const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);
