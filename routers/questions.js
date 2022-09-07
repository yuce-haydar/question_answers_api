
const express=require("express");

const {getAccessToRoute,getQuestionsOwnerAccess}=require('../middlewares/authorization/auth')
const {askNewQuestion,getAllQuestions,getSingleQuestions,editQuestion,deleteQuestion,likeQuestions}=require('../controllers/questions');
const {checkQuestionsExists}=require("../middlewares/database/databasehelper");
const answer=require("./answer");
const router=express.Router();

router.post("/ask",getAccessToRoute,askNewQuestion);
router.get("/",getAllQuestions);//sorular anasayfasına geçince tüm soruları listleme
router.get("/:id",checkQuestionsExists,getSingleQuestions);//id'ye göre listeleme
router.put("/:id/edit",[getAccessToRoute,checkQuestionsExists,getQuestionsOwnerAccess],editQuestion);
router.delete("/:id/delete",[getAccessToRoute,checkQuestionsExists,getQuestionsOwnerAccess],deleteQuestion);
router.get("/:id/like",[getAccessToRoute,checkQuestionsExists],likeQuestions);

router.use("/:question_id/answers",checkQuestionsExists,answer);


module.exports=router;

//1 tane midleware yazacan sonra router yazacan 