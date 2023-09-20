import { Router } from "express";
import v1Reports from "./routes/reportRoutes.js";

const v1Routes = Router();

v1Routes.use("/reports", v1Reports);

export default v1Routes;
