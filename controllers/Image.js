// controllers/Image.js
const Image = require('../models/image');
const fs = require('fs');
const path = require('path');

async function saveImage(req, res) {
  try {
    const { image } = req.body;
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const fileName = `uploads/${Date.now()}.png`;

    fs.writeFile(fileName, base64Data, 'base64', async (err) => {
      if (err) {
        return res.status(500).send({ msg: 'Error saving image' });
      }

      const newImage = new Image({ path: fileName });
      await newImage.save();
      res.status(200).send({ msg: 'Image saved successfully' });
    });
  } catch (error) {
    res.status(500).send({ msg: 'Server error' });
  }
}

async function getImages(req, res) {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.status(200).send(images);
  } catch (error) {
    res.status(500).send({ msg: 'Server error' });
  }
}

module.exports = {
  saveImage,
  getImages
}
