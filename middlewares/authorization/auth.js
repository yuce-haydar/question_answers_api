const CustomError = require("../../helper/error/CustomError");// hata yakalaycagimiz icin custom erroru dahil ettik
const { isTokenIncluded, getAccessTokenFromHeader } = require('../../helper/authorization/tokenHelpers');
const jwt = require("jsonwebtoken");//jwt kontolu yapacaz diye
const asyncHandler = require('express-async-handler');
const user = require("../../models/user");
const Question = require("../../models/questions");
const User = require("../../models/user");
const Answer = require("../../models/Answer");
const getAccessToRoute = (req, res, next) => {
    const { JWT_SECRET_KEY } = process.env;
    //token kontrolu yapacaz

    if (!isTokenIncluded(req)) {
        return next(new CustomError("you are not authorization", 401))
    }
    // next();
    const access_token = getAccessTokenFromHeader(req);//helpersta yazdigimiz fonksiyonu burda kullandik


    jwt.verify(access_token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new CustomError("you are not authorizatipn to access to route", 401));
        }
        req.user = {
            id: decoded.id,
            name: decoded.name

        }
    })
    next();
}
getAdminAccess= asyncHandler( async (req,res,next)=>{
    const {id}=req.user;

    const user=await User.findById(id);
    if(user.role!=="admin"){
        return next(new CustomError("only admin can access",403))
    }

    next();



});
getQuestionsOwnerAccess= asyncHandler( async (req,res,next)=>{
    const userId=req.user.id;//acces to route kısmından aldıgımız user ıdsı

     const questionId=req.params.id; //gönderilen soru idsi 

        const question=await Question.findById(questionId);
    if(question.user!=userId)
    {
        return next(new CustomError("only owner can handle this operation",403))
    }
    next();
});
getAnswerOwnerAccess= asyncHandler( async (req,res,next)=>{
    const userId=req.user.id;//acces to route kısmından aldıgımız user ıdsı

     const answerId=req.params.answer_id; //gönderilen soru idsi 

        const answer=await Answer.findById(answerId);
    if(answer.user!=userId)
    {
        return next(new CustomError("only owner can handle this operation",403))
    }
    next();
});

module.exports = {
    getAccessToRoute,getAdminAccess,getQuestionsOwnerAccess,getAnswerOwnerAccess
};