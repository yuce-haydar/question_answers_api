const bcyrpt=require("bcryptjs");
const validateUserInput=(email,password)=>{
    return email&&password;

};
const comparePassword=(password,hasshedPassword)=>{
 
console.log(bcyrpt.compareSync(password,hasshedPassword));
console.log(password);
console.log(hasshedPassword);
return bcyrpt.compareSync(password,hasshedPassword);//bu asagada yazdigimiz kod hashlanmis parolalarimizi cozecek ayniysa true farkliysa false degeri donecek;
}

module.exports={validateUserInput,comparePassword}