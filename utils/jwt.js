const jwt=require("jsonwebtoken");
const {JWT_SECRET_KEY}=require('../constantes');


function createAccessToken(usuario){
    const expToken=new Date();

    expToken.setHours(expToken.getHours()+3);

    const payload={
        token_type:"access",
        usuario_id:usuario._id,
        iat:Date.now(),
        exp:expToken.getTime()
    }

    return jwt.sign(payload,JWT_SECRET_KEY);

}

function createRefreshToken(usuario){
    const expToken=new Date();

    expToken.setMonth(expToken.getMonth()+1);

    const payload={
        token_type:"refresh",
        usuario_id: usuario._id,
        iat:Date.now(),
        exp:expToken.getTime()
    }

    return jwt.sign(payload, JWT_SECRET_KEY);
}

function decoded(token){
    return jwt.decode(token, JWT_SECRET_KEY, true);
}

module.exports={
    createAccessToken,
    createRefreshToken,
    decoded
}