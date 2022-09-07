const User=require("../models/user");//user modelimizi aldik

const asyncHandler = require('express-async-handler');
const CustomError=require("../helper/error/CustomError");

const getSinleuser= asyncHandler(async (req,res,next)=>{

    const {id}=req.params;
    const user= await User.findById(id);

    return res.status(200).json(
        {
            success:true,
            data:user
        }
    )

});
const getAllUsers= asyncHandler(async (req,res,next)=>{

    
    const users= await User.find();

    return res.status(200).json(
        {
            success:true,
            data:users
        }
    )

});

module.exports={
    getSinleuser,
    getAllUsers
}