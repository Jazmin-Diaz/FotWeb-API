// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRoutes = require('./routers/Auth');
const UserRoutes = require('./routers/Usuarios');
const ImageRoutes = require('./routers/Image'); // Import Image routes

const app = express();

// Middlewares para el funcionamiento
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// Uploads
app.use(express.static('uploads'));

// Configurar las rutas
app.use('/api', AuthRoutes);
app.use('/api', UserRoutes);
app.use('/api', ImageRoutes); // Use Image routes

module.exports = app;
