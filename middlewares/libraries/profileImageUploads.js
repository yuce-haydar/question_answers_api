const multer =require("multer");//paketimizi dahil ettik 
const path=require("path");
const CustomError=require("../../helper/error/CustomError");

//storage ve filefilter


const storage=multer.diskStorage({
    destination:function(req,file,cb){//multer bir midleware oldugu icin req file ve cb aliyor
    const rootDir=path.dirname(require.main.filename);//bize server.js in nerde olfugunu gosteriyor ve onu rootDir e aktariyor
    cb(null,path.join(rootDir,"/public/uploads"));//eger hata firlatacaksak cb ilk argumani hata olurdu biz burda yollari birlestirdik


    },
    filename:function(req,file,cb){
        //file MimeType-image/png 

        const extension =file.mimetype.split("/")[1];
        req.savedProfileImage="image_" + req.user.id+"."+ extension //gelecek olan fotografi istedigimiz ad formatinda yazmamiz icin kullandik image_userID.png sekline
        
        cb(null,req.savedProfileImage);
   
    } 
});

const fileFilter=(req,file,cb)=>{//gelecek olan fotogramizin turunu secmek icin 

    let allowedMimeTypes=["image/jpg","image/png","image/jpeg","image/gif"];
    if(!allowedMimeTypes.includes(file.mimetype)){//eger kullanici .pdf uzantili bir sey girerse true donecek ve hata blogu icine girecek
        return cb(new CustomError("please prowide a valid image types ",400),false);
        
    }
    return cb(  null,true);
    
}    
const profileImageUpload=multer({fileFilter,storage}); //multerdan profileImageUpload seklinde bir middleware olusturduk

module.exports=profileImageUpload;