const express = require('express');
const ImagesController = require('../controllers/Images');

const api = express.Router();

api.post('/upload', ImagesController.uploadImage);
api.get('/images', ImagesController.getImages);
api.delete('/images/:id', ImagesController.deleteImage);

module.exports = api;
