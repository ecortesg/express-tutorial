import express from "express";
import employees from "../../data/employees.json" assert { type: "json" };

export const employeesRouter = express.Router();
const data = {};
data.employees = employees;

employeesRouter
  .route("/")
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .put((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .delete((req, res) => {
    res.json({
      id: req.body.id,
    });
  });

employeesRouter.route("/:id").get((req, res) => {
  res.json({ id: req.params.id });
});
