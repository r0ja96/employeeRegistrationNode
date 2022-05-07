const ChartModel = require('../models/chartModel');

const info = () => (req, res)=>{
    const chartModel = new ChartModel(req.body);
    ChartModel.info(chartModel,(err,data)=>{
     if (err)
     res.status(500).json({
       message: err|| "Some error occurred while reading."
     });
   else res.json({message:data});
    });
  };
  

module.exports = {info}