const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, "please provide a title"], //zorunluluk
    minlength: [10, "lutfen 10 karekterden fazla baslik gir"],
    unique: true, //essiz olma dogru
  },
  content: {
    type: String,
    required: [true, "please provide a content"], //zorunluluk s
    minlength: [20, "lutfen 10 karekterden fazla konu  gir"],
  },
  slug: String, //tek satirda syntax ve slug sorularimizin link kisminda velirtecegimiz sey
  createdAt: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true, //zorunluluk
    ref: "user", //userimizi referans olarak kullandik
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  ],
  answersCount: {
    type: Number,
    default: 0,
  },
  answers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Answer",
    },
  ],
});
//sorumuzu eklemden önce link alanından slug ekliyouz/yapıyoruz 
questionSchema.pre("save", function (next) {
  //sorumuz eklenmdeden once yapılcak ıslemı pre(save) ile yapıyoruz
  if (!this.isModified("title")) {
    next();
  }
  this.slug = this.makeSlug(); //modelimizdeki slug alanına aşağda yazdığımız makeslug'ı atıyoruz
  next();
});

questionSchema.methods.makeSlug = function () {
  //şemamıza method ekliyoruz
  return slugify(this.title, {
    //title kısmına göre parçalıcaz
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: /[*+~.()'"!:@]/, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
  });
};

module.exports = mongoose.model("Question", questionSchema); //monggose kaydettik scemamizi
