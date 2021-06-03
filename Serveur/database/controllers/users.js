const models = require('../models/users.js');

module.exports={
    Updateuser:((req,res)=>{
          models.Updateusers(req.body,req.params.id)
          .then((results)=>{
              res.status(201).send("updated")
          })
          .catch((err)=>{
              res.status(500).send(err)
          })
    })
   
}