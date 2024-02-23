import employees from "../model/employees.json" assert { type: "json" };

const data = {
  employees,
  setEmployees: function (data) {
    this.employees = data;
  },
};

export function getAllEmployees(req, res) {
  res.json(data.employees);
}

export function createNewEmployee(req, res) {
  const newEmployee = {
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and last name are required." });
  }

  data.setEmployees([...data.employees, newEmployee]);

  res.status(201).json(data.employees);
}

export function updateEmployee(req, res) {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found.` });
  }
  if (req.body.firstname) {
    employee.firstname = req.body.firstname;
  }
  if (req.body.lastname) {
    employee.lastname = req.body.lastname;
  }
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, employee];
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );

  res.json(data.employees);
}

export function deleteEmployee(req, res) {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    res.status(400).json({ message: `Employee ID ${req.body.id} not found.` });
  }
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployees(filteredArray);
  res.json(data.employees);
}

export function getEmployee(req, res) {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (!employee) {
    res
      .status(400)
      .json({ message: `Employee ID ${req.params.id} not found.` });
  }
  res.json(employee);
}
