const AccountModel = require('../models/accountModel');

const create = () => (req,res) =>{

    const accountModel = new AccountModel(req.body);
    AccountModel.create(accountModel,(err, data) =>{

        if (err){
      res.status(500).json({
        message:
          err || "Some error occurred while creating the account."
      });}
    else res.json({message:data});

    });
    
}

const signIn = () =>(req, res)=>{

  const accountModel = new AccountModel(req.body);
  AccountModel.signIn(accountModel,(err,data) =>{
    if (err){
      res.status(500).json({
        message:
          err || "Some error occurred while signing in"
      });}
    else res.json({message:data});
  });

}

const info = () => (req,res) =>{
  
  const accountModel = new AccountModel(req.body);
  AccountModel.info(accountModel,(err,data) =>{
    if (err){
      res.status(500).json({
        message:
          err || "Some error occurred "
      });}
    else res.json({message:data});
  });
}


module.exports = {create, signIn, info};











