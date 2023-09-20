import { Router } from "express";
import * as reportControllers from "../../controllers/reportControllers.js";

const v1Reports = Router();

v1Reports
  .post("/", reportControllers.postNewReport)
  .get("/id=:id", reportControllers.getReportById)
  .get("/status=:status", reportControllers.getReportByStatus)
  .get("/severity=:severity", reportControllers.getReportBySeverity)
  .get("/user=:username", reportControllers.getReportByUsername)
  .put("/id=:id", reportControllers.putReport);

export default v1Reports;
