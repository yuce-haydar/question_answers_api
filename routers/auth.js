
const express=require("express");
const {register,getUser,login,logout,imageUpload,forgotpassword,resetpassword,editDetailes}=require('../controllers/auth')
const {getAccessToRoute}=require('../middlewares/authorization/auth')
const profileImageUpload=require("../middlewares/libraries/profileImageUploads")
const router=express.Router();

router.post("/register",register)
// router.get("/tokentest",getAccessToRoute,tokentest);//tokentest diye bir router gelince calisacak fonksiyon bunu da controllerstaki autha attik
router.get("/profile",getAccessToRoute,getUser);
router.post("/login",login)
router.post("/forgotpassword",forgotpassword);
router.put("/resetpassword",resetpassword)
router.get("/logout",getAccessToRoute,logout)//logout islemini yapacagimiz toute 
router.put("/edit",getAccessToRoute,editDetailes);
router.post("/upload",[getAccessToRoute,profileImageUpload.single("profile_image")],imageUpload);
module.exports=router;