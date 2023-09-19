import { Router } from "express";
import v1Campers from "./routes/camperRoutes.js";

const v1Routes = Router();

v1Routes.use("/campers", v1Campers);

export default v1Routes;
