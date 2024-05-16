const User=require("../models/users");
const bcrypt= require('bcryptjs');

const jwt=require("../utils/jwt");


async function Registrar(req,res){
    const {nomusuario, apellidos, email,password}=req.body;

    try {

        if(!email) res.status(400).send({msg: "El email es obligatorio"});
        if(!password) res.status(400).send({msg:"El password es obligatorio"});

        const usuario=new User({
            nomusuario,
            apellidos,
            email: email.toLowerCase(),
            role:"usuario",
            active:"true"
        });

        const salt=bcrypt.genSaltSync(10);
        const hashPassword=bcrypt.hashSync(password,salt);

        usuario.password=hashPassword;

        await usuario.save().then(()=>{
            res.status(200).send({
                msg:"Datos guardados correctamente"
            })
        })
        
    } catch (error) {
        res.status(500).send({
            msg:"No se guardo la iformacion"
        })

        console.log(error);
    }
}

async function Login(req,res){
    const {email,password}=req.body;

    try {
        if(!email) res.status(400).send({msg: "El email es obligatorio"});
        if(!password) res.status(400).send({msg: "El password es obligatorio"});

        const emailLowerCase=email.toLowerCase();

        const response=await User.findOne({email: emailLowerCase});
        
        bcrypt.compare(password, response.password, (bcryptError, check)=>{
            if(bcryptError){
                res.status(500).send({msg: "Error del usuario"})
            }else if(!check){
                res.status(400).send({msg:"Password incorrecto"})
            }else if(!response.active){
                res.status(400).send({msg: "Usuario inactivo"})
            }else{
                res.status(200).send({
                    access: jwt.createAccessToken(response),
                    refresh: jwt.createRefreshToken(response)
                })
            }
        })
        
    } catch (error) {
        res.status(500).send({msg: "Error al autenticar"});
    }

}

async function refreshAccessToken(req,res){
    const {token}=req.body;

    if(!token) res.status(400).send({msg: "Token requerido"});

    const {usuario_id}=jwt.decoded(token);

    try {
        const response=await User.findOne({_id:usuario_id});
        res.status(200).send({
            accessToken: jwt.createAccessToken(response)
        })
    } catch (error) {
        res.status(500).send({msg: "Error del servidor"});
    }
}

module.exports={
    Registrar,
    Login,
    refreshAccessToken
}