const express=require("express");
const UserCtr=require("../controllers/Usuarios");
const md_auth=require("../middlewares/Autentication");
const multiparty=require("connect-multiparty");
 
const md_upload=multiparty({uploadDir:"./uploads/avatar"});
const api=express.Router();

api.get("/userme", [md_auth.asureAuth], UserCtr.obtenerUserLogued);
api.post("/user",[md_auth.asureAuth, md_upload],UserCtr.createUser);
api.get("/users",[md_auth.asureAuth], UserCtr.getUsers );
api.patch("/user/:id", [md_auth.asureAuth, md_upload], UserCtr.updateUser);
api.delete("/user/:id", [md_auth.asureAuth], UserCtr.delUser);

module.exports=api;