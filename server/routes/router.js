const express= require('express')
const route=express.Router()

// app.get('/update_user',(req, res)=>{
//     res.render('update_user');
// })
const services= require('../services/render');
const controlle=require('../controller/controller');
/**
 * @description Root Route
 * @method GET/
 */

route.get('/',services.homeRoutes);

/**
 * @description add users
 * @method GET/add_user
 */

route.get('/add-user',services.add_user)

/**
 * @description updateuser
 * @method GET/update_user
 */

route.get('/update_user',services.update_user);

//API
route.post('/api/users',controlle.create);
route.get('/api/users',controlle.find);
route.put('/api/users/:id',controlle.update);
route.delete('/api/users/:id',controlle.delete);


module.exports=route