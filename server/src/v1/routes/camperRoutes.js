import { Router } from "express";
import * as camperControllers from "../../controllers/camperControllers.js";

const v1Campers = Router();

v1Campers.post("/newReport", camperControllers.postNewReport);

export default v1Campers;
