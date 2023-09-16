console.clear();
import "dotenv/config";
import express from "express";

//config server
const PORT = process.env.PORT;
const HOST = process.env.HOST;

//inicialización de la aplicación
const APP = express();

//middlewares
APP.use(express.json());

//server listening
APP.listen(PORT, () => {
  console.log(`http://${HOST}:${PORT}`);
});
