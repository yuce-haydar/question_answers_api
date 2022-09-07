const CustomError=require("../../helper/error/CustomError")
const customErrorHandler=(err,req,res,nexr)=>{
    let customError=err;
    console.log(err);
    if(err.code===11000){
         customError=new CustomError("duplicate key found:Check your input ",400);

    }
    if(err.name==="CastError"){
        customError=new CustomError("please provide a valid id",400);
    }
    if (err.name==="SyntaxError"){
        customError=new CustomError("uncapted Syntax",400);
    }
    if(err.name==="ValidationError"){
        customError=new CustomError(err.message,400);
    }
    //  console.log(customError.name,customError.message,customError.status);
    res.status(customError.status||500)
    .json({
        succses:false,
        message:customError.message,
       

    });

};

module.exports=customErrorHandler;