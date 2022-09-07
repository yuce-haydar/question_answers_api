/*
 content:{
        type:String,
        required:[true,"please  provide a content"],
        minlength:[true,"please provide a content at least 10 charecter"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    likes:[
        {
            type:mongoose.Schema.objectID,
            ref:"User"
        }
    ],
    user:{
        type:mongoose.Schema.objectID,
        ref:"User"
    },
    question:{
        type:mongoose.Schema.objectID,
        ref:"Question",
        required:true
    }



*/

/*
AnswerSchema.pre("save",async function(next){
    if(this.isModified("user")) return next();
    
     try{
        const question=await Question.findById(this.question);
        question.answers.push(this._id);
        await question.save();
        next();
     }
     catch(err){
        return next(err)
     }
})


*/