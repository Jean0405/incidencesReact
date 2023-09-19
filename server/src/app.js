console.clear();
import "dotenv/config";
import express from "express";

import v1Routes from "./v1/index.js";

//config server
const PORT = process.env.PORT;
const HOST = process.env.HOST;

//inicialización de la aplicación
const APP = express();

//middlewares
APP.use(express.json());

//routes
APP.use("/v1", v1Routes);

//server listening
APP.listen(PORT, () => {
  console.log(`http://${HOST}:${PORT}`);
});
