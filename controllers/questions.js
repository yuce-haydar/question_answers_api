const Question = require("../models/questions");
const asyncHandler = require("express-async-handler");
const CustomError = require("../helper/error/CustomError");
const { query } = require("express");
//yeni soru sorma
const askNewQuestion = asyncHandler(async (req, res, next) => {
  const information = req.body;
  const question = await Question.create({
    ...information,
    user: req.user.id,
  });
  res.status(200).json({ succes: true, data: question });
});
//tüm soruları ALMA FONKSİYONU
const getAllQuestions = asyncHandler(async (req, res, next) => {
  let query = Question.find();
const populate=true;
const populateValueO={
    path:"user",
    select:" name, profile_image "
    
}
  if (req.query.search) {
    const searchObject = {};
    //title
    const regex = new RegExp(req.query.search, "i");

    searchObject["title"] = regex;

    query = query.where(searchObject);
  }
  if(populate){
    query=query.populate(populateValueO);
  
}
//
const page=parseInt(req.query.page)||1;
const limit=parseInt(req.query.limit)||5;

const startindex=(page-1)*limit;
const endindex=page*limit;

const pagination={};
const total =await Question.countDocuments();
if(startindex>0){
    pagination.previous={
        page:page-1,
        limit:limit
    }

}
if(endindex<total){
    pagination.next={
        page:page+1,
        limit:limit
    }
}
query=query.skip(startindex).limit(limit)
//pagimnation
  // console.log(req.query.search);
  const questions = await query;

  return res.status(200).json({
    succes: true,
    count:questions.length,
    pagination:pagination,
    data: questions,
  });
  //soruları sırlama queryden gelen bilgiye göre sıralama bilgi gelmemişse tarihe göre sıralama 
const sortkey=req.query.sortBy;
if(sortkey==="most-answered"){
query=query.sort("-answerCount -createdAt");
}
if(sortkey==="most-liked"){
  query=query.sort("-likeCount -createdAt");

}
else{
query=query.sort("-createdAt");
}
});



//ideye göre soru alma
const getSingleQuestions = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const questions = await Question.findById(id);

  return res.status(200).json({
    succes: true,
    
    data: questions,
  });
});

//edit question
const editQuestion = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  let question = await Question.findById(id);
  question.title = title;
  question.content = content;
  question = await question.save();

  return res.status(200).json({
    succes: true,
    data: question,
  });
});
//delete questions
const deleteQuestion = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await Question.findByIdAndDelete(id);

  return res.status(200).json({
    succes: true,
    message: "your question deleted succesfully",
  });
});
const likeQuestions = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const question = await Question.findById(id);

  if (question.likes.includes(req.user.id)) {
    question.likes.remove(req.user.id);
    question.likeCount=question.likes.length;
    await question.save();
  } else {
    question.likes.push(req.user.id);
    question.likeCount=question.likes.length; 
    await question.save();
  }

  return res.status(200).json({
    succes: true,
    message: "likes is succesfully",
    data: question,
  });
});

module.exports = {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestions,
  editQuestion,
  deleteQuestion,
  likeQuestions,
};
