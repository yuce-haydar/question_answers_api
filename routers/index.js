// expressi dahil ettik
const express=require("express");
const questions=require("./questions");
const auth=require("./auth");
const user=require("./user");
const admin=require("./admin");
// api
const router = express.Router();
 
router.use("/questions",questions);
router.use("/auth",auth);
router.use("/users",user);
router.use("/admin",admin)//arama satırına adminle ilgi req geldiği zaman admin.js in çalışmasını söylüyor






module.exports=router;



