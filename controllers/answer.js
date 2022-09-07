const Question = require("../models/questions");
const Answer = require("../models/Answer");

const asyncHandler = require("express-async-handler");

const CustomError = require("../helper/error/CustomError");
const { count } = require("../models/questions");

//soruya yeni bir cevap ekleme 
const addNewAnswerToQoestion = asyncHandler(async (req, res, next) => {
  const { question_id } = req.params;

  const user_id = req.user.id;

  const information = req.body;

  const answer = await Answer.create({
    ...information,//
    question: question_id,
    user: user_id,
  });

  return res.status(200).json({
    succes: true,
    data: answer,
  });
});

const getAllAnswersByQuestion = asyncHandler(async (req, res, next) => {
  const { question_id } = req.params;

  const question = await Question.findById(question_id).populate("answers");//populate daha fazla bilgi göstermek içinn
  const answers = question.answers;

  res.status(200).json({
    succes: true,
    count: answers.length,
    data: answers,
  });
});
const getSingleAnswer = asyncHandler(async (req, res, next) => {
  const { answer_id } = req.params;

  const answer = await Answer.findById(answer_id)
    .populate({
      path: "question",
      select: "title",
    })
    .populate({
      path: "user",
      select: "name profile_image",
    });
  return res.status(200).json({
    succes: true,
    data: answer,
  });
});
const editAnswer = asyncHandler(async (req, res, next) => {
  const { answer_id } = req.params;
  const { content } = req.body;

  let answer = await Answer.findById(answer_id);
  answer.content = content;

  await answer.save();

  return res.status(200).json({
    succes: true,
    data: answer,
  });
});
const deleteAnswer = asyncHandler(async (req, res, next) => {
  const { answer_id } = req.params;

  const { question_id } = req.params;

  await Answer.findByIdAndRemove(answer_id);

  const question = await Question.findById(question_id);

  question.answers.splice(question.answers.indexOf(answer_id), 1);

  question.answersCount = question.answers.length;
  return res.status(200).json({
    succes: true,
    message: "succesfully",
  });
});

module.exports = {
  addNewAnswerToQoestion,
  getAllAnswersByQuestion,
  getSingleAnswer,
  editAnswer,
  deleteAnswer,
};
