const User=require("../models/user");
const asyncHandler = require('express-async-handler');
const CustomError=require("../helper/error/CustomError");


//user bloklama 
const blockUser= asyncHandler( async(req,res,next)=>{


    const {id}=req.params;//id yi req.paramstan alıyoruz bir çeşit parametre gibi

    const user= await   User.findById(id);
    
    user.blocked = !user.blocked;//eger blokluysa boz bloklu degılse blokla anlamına gelen kod parçacığı
    await user.save();

    return res.status(200).json({
        succes:true,
        message:"blocked-unblocked succesfully"
    });



});

//kullanıcı silme admin tarafından
const deleteUser= asyncHandler( async(req,res,next)=>{
    const {id}=req.params;
    const user= await   User.findById(id);//id'ye göre bul ve sil
    await user.remove();
    return res.status(200).json({
        succes:true,
        message:"silme başarılı"
    })
});

module.exports={blockUser,deleteUser};