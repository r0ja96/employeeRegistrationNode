const Employee = require('../models/employeeModel');

const create = () => (req, res)=>{
   const employee = new Employee(req.body);
   Employee.create(employee,(err,data)=>{
    if (err)
    res.status(500).json({
      message: err|| "Some error occurred while inserting Employee."
    });
  else res.json({message:data});
   });
};

const del = () => (req, res)=>{
   const employee = new Employee(req.body);
   Employee.delete(employee,(err,data)=>{
    if (err)
    res.status(500).json({
      message:
        err || "Some error occurred while deleting employee."
    });
  else res.json({message:data});
   });
};

const update = () => (req, res)=>{
    const employee = new Employee(req.body);
   Employee.update(employee,(err,data)=>{
    if (err)
    res.status(500).json({
      message:
        err || "Some error occurred while Updating employee."
    });
  else res.json({message:data});
   });
};

const read = () => (req, res)=>{
  const employee = new Employee(req.body);
  Employee.read(employee,(err,data)=>{
   if (err)
   res.status(500).json({
     message: err|| "Some error occurred while reading Employee."
   });
 else res.json({message:data});
  });
};

module.exports = { create, del, update, read};