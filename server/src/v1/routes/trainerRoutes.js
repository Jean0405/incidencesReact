import { Router } from "express";
import * as trainerControllers from "../../controllers/trainerControllers.js";

const v1Trainers = Router();

v1Trainers
  .put("/report/id=:id", trainerControllers.putReportByTrainer);

export default v1Trainers;