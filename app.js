// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = require('./constantes');

const AuthRoutes = require("./routers/Auth");
const UserRoutes = require("./routers/Usuarios");
const ImageRoutes = require("./routers/Image"); // Asegúrate de que la ruta sea correcta

const app = express();

// Middleware para analizar cuerpos de solicitud en JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware para permitir solicitudes de dominios diferentes al del servidor
app.use(cors());

// Conexión a la base de datos
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a la base de datos"))
  .catch(err => console.error("Error de conexión a la base de datos:", err));

// Rutas de la API
app.use("/api", AuthRoutes);
app.use("/api", UserRoutes);
app.use("/api", ImageRoutes); // Asegúrate de que se está utilizando la ruta correcta

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
  const error = new Error('Ruta no encontrada');
  error.status = 404;
  next(error);
});

// Manejador de errores para otros errores
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = app;
