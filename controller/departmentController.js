const Department = require('../models/departmentModel');

const create = () => (req, res)=>{
   const department = new Department(req.body);
   Department.create(department,(err,data)=>{
    if (err)
    res.status(500).json({
      message: err|| "Some error occurred while inserting department."
    });
  else res.json({message:data});
   });
};

const del = () => (req, res)=>{
    const department = new Department(req.body);
   Department.delete(department,(err,data)=>{
    if (err)
    res.status(500).json({
      message:
        err || "Some error occurred while deleting department."
    });
  else res.json({message:data});
   });
};

const update = () => (req, res)=>{
    const department = new Department(req.body);
   Department.update(department,(err,data)=>{
    if (err)
    res.status(500).json({
      message:
        err || "Some error occurred while Upadating department."
    });
  else res.json({message:data});
   });
};

const read = () => (req, res)=>{
  const department = new Department(req.body);
  Department.read(department,(err,data)=>{
   if (err)
   res.status(500).json({
     message: err|| "Some error occurred while reading department."
   });
 else res.json({message:data});
  });
};

module.exports = {create,del,update,read};