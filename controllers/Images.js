const path = require('path');
const fs = require('fs');
const image = require('../utils/image');
const Image = require('../models/images'); // Assuming you have an Image model

async function uploadImage(req, res) {
    const { usuario_id } = req.usuario;

    if (!req.files.image) {
        return res.status(400).send({ msg: "No se encontró la imagen" });
    }

    const imagePath = image.getFilePath(req.files.image);

    const newImage = new Image({
        usuario_id,
        imageUrl: imagePath
    });

    try {
        await newImage.save();
        res.status(200).send(newImage);
    } catch (error) {
        res.status(500).send({ msg: "Error al guardar la imagen" });
    }
}

async function getImages(req, res) {
    const { usuario_id } = req.usuario;

    try {
        const images = await Image.find({ usuario_id });
        res.status(200).send(images);
    } catch (error) {
        res.status(500).send({ msg: "Error al recuperar las imágenes" });
    }
}

module.exports = {
    uploadImage,
    getImages
};
