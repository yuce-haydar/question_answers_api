//seerver bilgilerimiz yer alacak burda

const express=require("express");
const dotenv=require("dotenv");

const customErrorHandler=require('./middlewares/errors/customErrorHandler');

const connectDatabase=require('./helper/connectDatabase')

// routers diye biir sey tanimladik nereye bakacak index.jse bakacak
const routers=require("./routers/index");
const { json } = require("express/lib/response");

const path=require("path");//express paketi path yollarini duzenlemek icin kullanilir 


const app=express();


dotenv.config({
    path:"./config//env/config.env"
});


// mongo fb database

connectDatabase();

// express bodt middle ware 

app.use(express.json());

//hangi portta calisacagi 
const PORT=process.env.PORT;
const durum=process.env.NODE_ENV;

// api gelince routers degiskeninine bakacak o da index js e bakacak 
app.use("/api",routers);

// custom error handlers
app.use(customErrorHandler);

//static files 
app.use(express.static(path.join(__dirname,"public")))

// apimizi baslatma calistirma listen la oluyor 
app.listen(PORT,()=>{
    console.log("server calisti"+PORT+" "+durum);
});

process.on('warning', e => {
    console.warn(e.stack);
});