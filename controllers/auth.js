const user = require("../models/user");
const User = require("../models/user");

const asyncHandler = require("express-async-handler");
const { sendjwtToClient } = require("../helper/authorization/tokenHelpers");
const CustomError = require("../helper/error/CustomError");
const {
  validateUserInput,
  comparePassword,
} = require("../helper/input/inputhelpers");
const sendEmail = require("../helper/libraries/sendMail");
const register = asyncHandler(async (req, res, next) => {
  const profileImageUpload = require("../middlewares/libraries/profileImageUploads");
  // post data
  const { name, email, password, role } = req.body;

  // const name="mustafa murat coskunn ";
  // const email="kifeklyom@gmail.com";
  // const password="123456";
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendjwtToClient(user, res);
});
/// login islemi
const login = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  if (!validateUserInput(email, password)) {
    return next(new CustomError("please check your inputs", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!comparePassword(password, user.password)) {
    return next(new CustomError("check your passwoard", 400));
  }

  sendjwtToClient(user, res);
});
//logout islemi
const logout = asyncHandler(async (req, res, next) => {
  const { NODE_ENV } = process.env; //

  return res
    .status(200)
    .cookie(
      //cookie icinde yapacaz logout islemini ve expire suresini sifirlayarak
      {
        httpOnly: true,
        expires: new Date(Date.now()), //sureyi sifirladik
        secure: NODE_ENV === "development" ? false : true, //eger development ise false dondur degilse true dondur
      }
    )
    .json({
      succes: true,
      message: "log out succesfully",
    });
});
//profil fotografi

const imageUpload = asyncHandler(async (req, res, next) => {
  //save image from db
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      //bu da hazir fonksiyon id ye gore bul ve guncelle
      profile_image: req.savedProfileImage,
    },
    {
      new: true, //guncenlenmis kullanici gelsin istiyorsaniz
      runValidators: true,
    }
  );

  //image upload succes

  res.status(200).json({
    succes: true,
    message: "image upluad succes",
    data: user,
  });
  console.log(user);
});

const getUser = (req, res, next) => {
  res.json({
    data: {
      id: req.user.id,
      name: req.user.name,
    },
  });
};
//fotgot password

const forgotpassword = asyncHandler(async (req, res, next) => {
  const resetEmail = req.body.email; //postman kulllandigimiz icin email degerimiz req.body.emailden gelmekte
  const user = await User.findOne({ email: resetEmail }); //bu kullandimda emaili reset email olan yani db de kaydi bulunan emailse true (yani user) donecek
  if (!user) {
    return next(new CustomError("there is no user wirh that email", 400));
  }

  const resetPasswordToken = user.getResetTokenFromUser();
  await user.save();

  const resetPasswordUrl = `http://localhost:5000/api/auth//resetPassword?resetPasswordToken=${resetPasswordToken}`; //burda url olusturduk
  const emailTamplate = `
    <h3> selam yuce haydar bu senin password sifirlama linkin <\h3>
    <p><a href=" ${resetPasswordUrl}  " > buraya tikla amk artik<\a><\p>
    `;
  try {
    await sendEmail({
      //senEmail fonksiyonunu kullandik optionslari verdik iste=>nerden nereye falan
      from: process.env.SMTP_USER,
      to: resetEmail,
      supject: "reset yoru email",
      html: emailTamplate,
    });

    res.json({
      succes: true,
      message: "token gitti",
    });
  } catch {
    //eger hata yakalarsak token ve expire surelerini sifirladik
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(new CustomError("email not ", 500));
  }
});
const resetpassword = asyncHandler(async (req, res, next) => {
  const { resetPasswordToken } = req.query; //postmandan alacagimiz queri sorgusu

  const { password } = req.body; //bodyden alcagimiz yeni password

  if (!resetPasswordToken) {
    return next(new CustomError("please provide a valid token", 400));
  }
  let user = await User.findOne({
    resetPasswordToken: resetPasswordToken, //user modelimizdeki resettoken ile queryden gelecek token ayniysa
    resetPasswordExpire: { $gt: Date.now() }, //resetpassword token expire suresinden buyukse yani suresi gecmemisse
  });
  if (!user) {
    return next(new CustomError("ya token hatali ya da suresi gevmis", 404));
  }
  //////////////******eger bu yukaridaki kisim dogru ise expire ve tokenleri sifirladik***/ */
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save(); //userimizi kaydettik

  return res.status(200).json({
    succes: true,
    message: "basarili",
  });
});

//bilgileri guncelleme
const editDetailes = asyncHandler(async (req, res, next) => {
  const editInformation = req.body;

  const user = await User.findByIdAndUpdate(req.user.id, editInformation, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    succes: true,
    data: user,
  });
});

module.exports = {
  register,
  getUser,
  logout,
  imageUpload,
  resetpassword,
  login,
  forgotpassword,
  editDetailes,
};
