// routers/Images.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Configuración de multer para almacenar las imágenes en el servidor
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './uploads/images';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

router.post('/images', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ msg: 'No file uploaded' });
  }
  res.status(200).send({ path: `/uploads/images/${req.file.filename}` });
});

router.get('/images', (req, res) => {
  const dir = './uploads/images';
  fs.readdir(dir, (err, files) => {
    if (err) {
      return res.status(500).send({ msg: 'Error reading files' });
    }
    const filePaths = files.map(file => `/uploads/images/${file}`);
    res.status(200).send(filePaths);
  });
});

module.exports = router;
