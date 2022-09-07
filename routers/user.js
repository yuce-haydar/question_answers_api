const express=require("express");
const{getSinleuser,getAllUsers}=require("../controllers/user.js");
const {checkUserExist}=require("../middlewares/database/databasehelper");
const router=express.Router();


router.get("/:id",checkUserExist,getSinleuser);
router.get("/",getAllUsers);




module.exports=router;