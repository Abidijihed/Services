const router= require("express").Router();
const models=require('../models/users.js');
const controler=require('../controllers/users');
const middleware = require('../middleware/auth');

router.get('/api/register',models.getAll)
router.post('/api/register',models.createusers);
router.post('/api/login',models.Verifyusers);
router.get('/api/logout',models.logout);


router.patch('/api/getall/:id',controler.Updateuser)
router.get('/api/user/:id',models.getoneusers)
router.get('/api/session',middleware.VerifySession)
module.exports={userRouter:router}