const mongoose=require('mongoose');     

const connectDatabase=()=>{
    // monggose.connect diyerek databaseye baglandik tabi bu promise dondurecegi icin then ve catch kullandik yolu da config.envden aldik
    mongoose.connect(process.env.MONGO_URI).then(
        ()=>{
            console.log("mongo basariyla baglandi");
        }
    ).catch(err=>{
        console.error(err);
    });
}

module.exports=connectDatabase;