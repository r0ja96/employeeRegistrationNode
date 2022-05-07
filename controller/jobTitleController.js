const JobTitle = require('../models/jobTitleModel');

const create = () => (req, res)=>{
   const jobTitle = new JobTitle(req.body);
   JobTitle.create(jobTitle,(err,data)=>{
    if (err)
    res.status(500).json({
      message: err|| "Some error occurred while inserting Job Title."
    });
  else res.json({message:data});
   });
};

const del = () => (req, res)=>{
    const jobTitle = new JobTitle(req.body);
   JobTitle.delete(jobTitle,(err,data)=>{
    if (err)
    res.status(500).json({
      message:
        err || "Some error occurred while deleting Job Title."
    });
  else res.json({message:data});
   });
};

const update = () => (req, res)=>{
    const jobTitle = new JobTitle(req.body);
   JobTitle.update(jobTitle,(err,data)=>{
    if (err)
    res.status(500).json({
      message:
        err || "Some error occurred while Upadating Job Title."
    });
  else res.json({message:data});
   });
};

const read = () => (req, res)=>{
  const jobTitle = new JobTitle(req.body);
  JobTitle.read(jobTitle,(err,data)=>{
   if (err)
   res.status(500).json({
     message: err|| "Some error occurred while reading Job Title."
   });
 else res.json({message:data});
  });
};

module.exports = {create,del,update,read};