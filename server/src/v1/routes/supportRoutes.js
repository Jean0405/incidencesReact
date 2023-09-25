import { Router } from "express";
import * as supportControllers from "../../controllers/supportControllers.js";

const v1Supports = Router();

v1Supports
  .put("/report/id=:id", supportControllers.putReportBySupport);

export default v1Supports;