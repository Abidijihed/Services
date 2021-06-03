const models = require('../models/session')
module.exports={
    CreateSession:((req,res,users_id,session)=>{
        models.post(users_id,session)
        .then((result)=>{
            console.log(session)
            res.cookie("servises",session,{
                path: '/',
                expires: new Date(new Date().getTime() + 86400 * 1000),
                httpOnly: false,
                secure: false
            }).send([session,"secsuss",users_id])
        })
        .catch((err)=>{
           res.send(err)
        })
    }),
    VerifySession:(req,res,next)=>{
        if(req.cookies.servises){
            models.Get(req.cookies.servises)
            .then((result)=>{
                if(result.length>0&&(result[0].date>Date.now())){
                    var usersInfo={
                        users_id:result[0].users_id,
                        firstName:result[0].firstName,
                        email:result[0].email
                    }
                    res.status(200).send(usersInfo)
                }else{
                    res.status(200).send('seesion login fail')
                }
            })
            .catch((err)=>{
                res.status(500).send(err)
            })
        }else{
            res.status(200).session('session login fail')
        }
    }
}