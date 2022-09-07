const express=require("express");

const { getAccessToRoute,getAdminAccess}=require("../middlewares/authorization/auth");//adaminimiz önce giriş yapmış olaccak 

const {blockUser,deleteUser}=require("../controllers/admin");
const {checkUserExist}=require("../middlewares/database/databasehelper");

const router=express.Router();
//block user and delete user
router.use([getAccessToRoute,getAdminAccess])//böyle yazdığımızdda bu midlewareler hepsinde çalışacak

router.get("/block/:id",checkUserExist,blockUser);
router.delete("/user/:id",deleteUser);







module.exports=router;