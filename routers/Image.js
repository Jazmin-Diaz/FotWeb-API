// routers/Image.js
const express = require('express');
const ImageController = require('../controllers/Image');

const api = express.Router();

api.post('/images', ImageController.saveImage);
api.get('/images', ImageController.getImages);

module.exports = api;
