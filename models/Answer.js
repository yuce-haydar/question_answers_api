const mongoose = require("mongoose");
const Question = require("./questions");

const Schema1 = mongoose.Schema;

const AnswerSchema1 = new Schema1({
  content: {
    type: String,
    required: [true, "zorunlu"],
    minlength: [10, "10krktr"],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user", //model ismi bu
    required: true,
  },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: "Questions", //model ismi bu klasor ismi questions
    required: true,
  },
});
//cevap şemamızı kaydetmedden önce bir takım olaylar yapıyoruz sorumuza cevabımızın id sini ekliyoruz
AnswerSchema1.pre("save", async function (next) {
  if (!this.isModified("user")) return next();

  try {
    const question = await Question.findById(this.question);

    question.answers.push(this._id);
    question.answersCount = question.answers.length;

    await question.save();
    next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model("Answer", AnswerSchema1);
