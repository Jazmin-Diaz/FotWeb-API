const User=require("../models/users");
const bcrypt=require('bcryptjs');
const image=require('../utils/image');


async function obtenerUserLogued(req,res){
    const {usuario_id}= req.usuario;

    const response= await User.findById(usuario_id);

    if(!response){
        res.status(400).send({
            msg:"No existe el usuario"
        })
    }else{
        res.status(200).send(response);
    }
    
}

async function createUser(req, res){
    const {password}=req.body;

    const user=new User({...req.body, active:true});

    const salt=bcrypt.genSaltSync(10);
    const hashPassword=bcrypt.hashSync(password,salt);

    user.password=hashPassword;


        if(req.files.avatar){
        const imagePath=image.getFilePath(req.files.avatar);
       user.avatar=imagePath;
      //  console.log(imagePath);
    }
//console.log(req.files.avatar);
  const guardarUser=await user.save();
  res.status(200).send(guardarUser);
}

async function getUsers(req,res){
    const {active}=req.query;

    let response=null;

    try {
        if(active===undefined){
            response=await User.find();
        }else{
            response=await User.find({active});
        }

        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({msg: "Error al buscar"})
    }
}

async function updateUser(req,res){
    const {id} = req.params;
    const userData=req.body;

    if(userData.password){
        const salt=bcrypt.genSaltSync(10);
        const hashPassword=bcrypt.hashSync(userData.password,salt);
        userData.password=hashPassword;
    }else{
        delete userData.password;
    }

    if(req.files.avatar){
        const imagePath=image.getFilePath(req.files.avatar);
       
        userData.avatar=imagePath;
    }

    try {
        const update=await User.findByIdAndUpdate({_id:id},userData);
        res.status(200).send(update);
    } catch (error) {
        res.status(400).send({
            msg:"Error al actualizar"
        })
    }

}

async function delUser(req,res){
const {id}=req.params;

try {
    await User.findByIdAndDelete(id);
    res.status(200).send({msg: "Usuario eliminado correctamente"})
} catch (error) {
    res.status(400).send({
        msg:"Error al eliminar el usuario"
    })
}
}

module.exports={
    obtenerUserLogued,
    createUser,
    getUsers,
    updateUser,
    delUser
}