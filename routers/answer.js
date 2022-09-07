const express=require("express");
const {getAccessToRoute,getAnswerOwnerAccess}=require("../middlewares/authorization/auth");

const {addNewAnswerToQoestion,getAllAnswersByQuestion,getSingleAnswer,editAnswer,deleteAnswer}=require("../controllers/answer");
const { getSingleQuestions } = require("../controllers/questions");
const {checkQuestionsAndAnswersExists}=require("../middlewares/database/databasehelper");
const router=express.Router({mergeParams:true});

router.post("/",getAccessToRoute,addNewAnswerToQoestion);
router.get("/",getAllAnswersByQuestion);
router.get("/:answer_id",checkQuestionsAndAnswersExists,getSingleAnswer);
router.put("/:answer_id/edit",[checkQuestionsAndAnswersExists,getAccessToRoute,getAnswerOwnerAccess],editAnswer);
router.delete("/:answer_id/delete",[checkQuestionsAndAnswersExists,getAccessToRoute,getAnswerOwnerAccess],deleteAnswer);

module.exports=router;
 