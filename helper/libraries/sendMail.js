const nodemailer=require("nodemailer");

const   sendEmail=async(mailOptions)=>{
// const {SMTP_HOST,SMTP_PASS,SMTP_PORT,SMTP_USER}=process.env
    let transporter=nodemailer.createTransport({//bir tane transport olusturduk icinde smtp host port ve kullanici bilgileri bulunan nodemailer sayfasinda var
        host:process.env.SMTP_HOST,//bunleri config dosyasindan aldik
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }



    });
    let info=await transporter.sendMail(mailOptions);//info diye olusturduk dogru olusra bilgi donecek 

    console.log(`messsage send :${info.messageId}`);


}

module.exports=sendEmail;

