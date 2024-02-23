import express from "express";
import {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
} from "../../controllers/employeesController.js";

export const employeesRouter = express.Router();

employeesRouter
  .route("/")
  .get(getAllEmployees)
  .post(createNewEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

employeesRouter.route("/:id").get(getEmployee);
