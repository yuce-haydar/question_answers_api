const mongoose=require("mongoose");
const bcrypt = require('bcryptjs');//şiffreleri hashlamak için
const jwt =require("jsonwebtoken");//web tokenımız
const crypto=require("crypto");
const Question=require("./questions");
const Schema=mongoose.Schema;

// bizim user schemamiz icinde ad  email sifre falan bilgileri var obje biciminde kaydettik


const userSchema=new Schema({
name:{
    type:String,
    required:[true,"lutfen adinizi giriniz"]
},
email:{
    type:String,
    required:true,//requiredler message alir 
    unique:[true],//uniqe mesaj almaz
    match:[
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Emailinizi dogru giriniz"
    ]
},
role:{
    type:String,
    default:"user",
    enum:["user","admin"]
},
password:{
    type:String,
    minlength:[6,"parola 6 karekterden kisa olamaz"],
    required:[true,"please prowide a password"],
    select:true
},
createAt:{
    type:Date,
    default:Date.now

},
title:{
    type:String
},
about:{type:String},
place:{type:String},
website:{type:String},
profile_image:{
    type:String,
    default:"default.jpg"
},
blocked:{
    type:Boolean,
    default:false
},
resetPasswordToken:{
    type:String,

},
resetPasswordExpire:{
    type:Date
}

});
// userSchema methods//userimize method ekledik 

userSchema.methods.generateJwtFromUser =function(){
 const{JWT_SECRET_KEY,JWT_EXPIRE}=process.env;//env dosyasindaki bilgilere eristik ve tanimladik burda 
    
    const payload={
        id:this.id,
        name:this.name
    };
    const token=jwt.sign(payload,JWT_SECRET_KEY,{
        expiresIn:JWT_EXPIRE});

        return token

}
userSchema.methods.getResetTokenFromUser=function(){
    const {EXPIRE_FORGOT_TOKEN}=process.env;
    const randomHexString=crypto.randomBytes(15).toString("hex");//rastgele bir sey turetmek icin token icin hexe cevirdik
    


    const resetPasswordToken=crypto.createHash("SHA256").update(randomHexString).digest("hex");

    this.resetPasswordToken=resetPasswordToken;
    this.resetPasswordExpire=Date.now()+parseInt(EXPIRE_FORGOT_TOKEN);
    return resetPasswordToken;
}

//kaydetmeden once password hashlaeme => pre hooks

userSchema.pre('save',function(next){
    if(!this.isModified("password")){
        next();
    }
    bcrypt.genSalt(10, (err, salt)=> {
        if(err) next(err);
        bcrypt.hash(this.password, salt, (err, hash)=> {
        if(err) next(err);
        this.password=hash;
        next();
        });
    });

})
// <=
// bunu mongose kaydettik

userSchema.post("remove",async function(){//admin kullanıcıyı sildikten sonra soruları da silme işlemii
    await Question.deleteMany({//deletemany bir sürü şey sil ve obje biçiminde gönderdik
        user:this._id
    });

});
module.exports=mongoose.model("user",userSchema);