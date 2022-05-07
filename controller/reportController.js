const fs = require('fs');
const pdf = require('html-pdf');
const html = require('../reportTemplate/reportTemplate');
const options = { format: 'Letter' };
const Report = require('../models/reportModel');
const path = require('path');

const create = () => (req, res)=>{

  const report = new Report(req.body);
  const pdfPath = `./reports/${req.body.email+req.body.employeeID}.pdf`

   Report.read(report,(err,data)=>{
    if (err)
    res.status(500).json({
      message: err|| "Some error occurred while creating report."
    });
  else{
      if(!data.length == 0)
   
    pdf.create(html(data[0]), options).toFile(pdfPath, function(err, result) {
        if (err) res.json({message:"Some error occurred while creating report."}); 
    
        res.download(pdfPath);

        const directory = 'reports';

       /* fs.readdir(directory, (err, files) => {
            if (err) throw err;
          
            for (const file of files) {
              fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
              });
            }
          });
       */ 
    });

    else
    res.status(500).json({
        message:"Some error occurred while creating report."
      });

};
   });

}

module.exports = {create}