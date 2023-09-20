import { Router } from "express";
import * as reportControllers from "../../controllers/reportControllers.js";

const v1Reports = Router();

v1Reports
.post("/", reportControllers.postNewReport)
.put("/:id", reportControllers.putReport)
.get("/:id", reportControllers.getReportById);

export default v1Reports;
