const fs = require('fs');
const path = require('path');
const Image = require('../models/image'); // Crear un modelo de imagen

async function uploadImage(req, res) {
  const { image } = req.body;
  const base64Data = image.replace(/^data:image\/png;base64,/, "");

  const filePath = `uploads/${Date.now()}.png`;
  fs.writeFile(filePath, base64Data, 'base64', async (err) => {
    if (err) return res.status(500).send({ msg: "Error al guardar la imagen" });

    const newImage = new Image({ url: `http://localhost:4000/${filePath}` });
    await newImage.save();

    res.status(200).send(newImage);
  });
}

async function getImages(req, res) {
  try {
    const images = await Image.find();
    res.status(200).send(images);
  } catch (error) {
    res.status(500).send({ msg: "Error al obtener las imágenes" });
  }
}

async function deleteImage(req, res) {
  const { id } = req.params;
  try {
    const image = await Image.findByIdAndDelete(id);
    if (image) {
      const filePath = image.url.replace('http://localhost:4000/', '');
      fs.unlinkSync(filePath);
    }
    res.status(200).send({ msg: "Imagen eliminada correctamente" });
  } catch (error) {
    res.status(500).send({ msg: "Error al eliminar la imagen" });
  }
}

module.exports = {
  uploadImage,
  getImages,
  deleteImage,
};
