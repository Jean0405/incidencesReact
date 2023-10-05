console.clear();
import "dotenv/config";
import cors from "cors";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";

import v1Routes from "./v1/index.js";

//config server
const PORT = process.env.PORT;
const HOST = process.env.HOST;

//inicialización de la aplicación
const APP = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIRECTORY = path.join(__dirname, "../../client/dist");

//middlewares
APP.use(express.json());
APP.use(cors())

//routes
APP.use("/v1", v1Routes);
APP.use(express.static(DIST_DIRECTORY));

//server listening
APP.listen(PORT, () => {
  console.log(`🚀 http://${HOST}:${PORT}`);
});
