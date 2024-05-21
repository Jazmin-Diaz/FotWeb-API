const express = require('express');
const ImageController = require('../controllers/Images');
const md_auth = require('../middlewares/Autentication');
const multiparty = require('connect-multiparty');

const md_upload = multiparty({ uploadDir: './uploads/images' });
const api = express.Router();

api.post("/images/upload", [md_auth.asureAuth, md_upload], ImageController.uploadImage);
api.get("/images", [md_auth.asureAuth], ImageController.getImages);

module.exports = api;
