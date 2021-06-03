const { connection } = require('../index.js');
const crypto = require('crypto');
const middleware = require('../middleware/auth');
const utils=require('../middleware/utils')
const  data=[]
module.exports = {
    getAll:((req,res)=>{
        const query=`SELECT * FROM users`
        connection.query(query,(err,result)=>{
            console.log(result)
    })
      }),
   createusers:((req,res)=>{
       var passwordHashed=crypto.createHash('sha256').update(req.body.password, 'utf8').digest('hex')
       var email=req.body.email.slice(0,req.body.email.indexOf('@'))
       const query1=`SELECT * FROM users`
       connection.query(query1,(err,result)=>{
           var array=[]
           for (var i =0;i<result.length;i++)
               array.push(result[i].email.slice(0,result[i].email.indexOf('@')))
               if(array.indexOf(email)>-1){
              res.status(400).send('email exist')   
               }else{
       const query=`INSERT INTO users(googleId,firstName,lastName,email,password,numberPhone,adress,image,country,State,Zip,gender) VALUES("${req.body.googleId}","${req.body.firstName}","${req.body.lastName}","${req.body.email}","${passwordHashed}","${req.body.numberPhone}","${req.body.adress}","${req.body.image}","${req.body.country}","${req.body.State}","${req.body.Zip}","${req.body.gender}")`
          connection.query(query,(err,results)=>{
         if(err){
           res.status(500).send(err)       
         } else{   
       res.status(200).send(results)
         }
        
       }) 
    } 
      })
   }),
   getoneusers :((req,res)=>{
         const query=`SELECT * from users where id=${req.params.id}`
    connection.query(query,(err,results)=>{
   err ? res.status(200).send(err) : res.status(200).send(results[0])
    
      })
  }),

  Updateusers : (user , id) => {
    var passwordHashed = crypto.createHash('sha256').update(users.password, 'utf8').digest('hex')
       return new Promise((resolve,reject) => {
         connection.query(`UPDATE users SET firstName=?, lastName=?, email=?, adress=?, numberPhone=?,  password=?,repeatepassword="${passwordHashed}", image=?, country=?, Zip=? WHERE id=?`,
       [user.firstName,user.lastName, user.email,user.adress,user.numberPhone,passwordHashed,user.image,user.country,user.State,user.Zip,id],(err,results)=>{
           err ? reject(err) : resolve(results)
         })
       })
  },
  Verifyusers :(req,res)=>{
    var passwordHashed = crypto.createHash('sha256').update(req.body.password, 'utf8').digest('hex')
    const query=`SELECT * from users where email="${req.body.email}"`
    connection.query(query,(err,results)=>{
      if(err){
        console.log(err)
      }else if(results.length>0 && results[0].password===passwordHashed ){
       var session=utils.RandomString(32)
        middleware.CreateSession(req,res,results[0].id,session)
      }else if(results.length===0 || results[0].password!==passwordHashed ){
res.send("faill")
      }
    })
  },
  logout:(req,res)=>{
   session.delete(req.cookies.carrefour)
   .then((result)=>{
       res.redirect('/')
  })
   .catch((err)=>{
     res.status(500).send('server err')
   })
 
  }
}