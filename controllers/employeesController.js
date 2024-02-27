import { Employee } from "../model/Employee.js";

export async function getAllEmployees(req, res) {
  const employees = await Employee.find();
  if (!employees)
    return res.status(204).json({ message: "No employees found." });
  res.json(employees);
}

export async function createNewEmployee(req, res) {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }
  try {
    const newEmployee = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.status(201).json(newEmployee);
  } catch (err) {
    console.log(err);
  }
}

export async function updateEmployee(req, res) {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Employee ID is required." });
  const employee = await Employee.findById(req.body.id).exec();
  if (!employee)
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}.` });
  if (req.body?.firstname) {
    employee.firstname = req.body.firstname;
  }
  if (req.body?.lastname) {
    employee.lastname = req.body.lastname;
  }
  const result = await employee.save();
  res.json(result);
}

export async function deleteEmployee(req, res) {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Employee ID is required." });
  const employee = await Employee.findById(req.body.id).exec();
  if (!employee)
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}.` });
  const result = await employee.deleteOne({ _id: req.body.id });
  res.json(employee);
}

export async function getEmployee(req, res) {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Employee ID is required." });
  const employee = await Employee.findById(req.params.id).exec();
  if (!employee) {
    res
      .status(400)
      .json({ message: `No employee matches ID ${req.params.id}.` });
  }
  res.json(employee);
}
