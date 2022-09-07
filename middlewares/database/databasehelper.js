const User=require("../../models/user");

const asyncHandler = require('express-async-handler');
const Question=require("../../models/questions");
const Answer=require("../../models/Answer");

const CustomError=require("../../helper/error/CustomError");

const checkUserExist=asyncHandler(async (req,res,next)=>{

    const {id}=req.params;

    const user= await User.findById(id);
    if(!user){
        return next(new CustomError("there is no such with user",400)
        )
    }
    next();

});
//soru var mı yok mu kontrol etme 
const checkQuestionsExists=asyncHandler(async (req,res,next)=>{
       
    const question_id=req.params.id||req.params.question_id;
    const question= await Question.findById(question_id);
    if(!question){
        return next(new CustomError("there is no such with question",400)
        )
    }
    next();
   

});
//////////////////////////
const checkQuestionsAndAnswersExists=asyncHandler(async (req,res,next)=>{
       
const question_id=req.params.question_id;
const answer_id=req.params.answer_id;


const question= await Question.findById(question_id);
const answer= await Answer.findOne({
    _id:answer_id,
    question:question_id//sorular ve cevaplar idisi uyuşuyorwsa

});
if(!answer){
    next()
    return next(new CustomError("there is no answer  with answer question",400)
   
    )
}
next();



   

});


module.exports={
    checkUserExist,
    checkQuestionsExists,
    checkQuestionsAndAnswersExists
}