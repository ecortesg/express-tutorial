import express from "express";
import {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
} from "../../controllers/employeesController.js";
import { ROLES_LIST } from "../../config/roles_list.js";
import { verifyRoles } from "../../middleware/verifyRoles.js";

export const employeesRouter = express.Router();

employeesRouter
  .route("/")
  .get(getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

employeesRouter.route("/:id").get(getEmployee);
