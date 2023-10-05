import { Router } from "express";
import * as supportControllers from "../../controllers/supportControllers.js";

const v1Supports = Router();

v1Supports
  .get("/", supportControllers.getAllSupports)
  .put("/report/id=:id", supportControllers.putReportBySupport)

export default v1Supports;
