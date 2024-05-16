const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    nomusuario:String,
    apellidos:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    role:String,
    active:Boolean,
    avatar:String
});

module.exports=mongoose.model("USer",userSchema);