import { Router } from "express";
import v1Reports from "./routes/reportRoutes.js";
import v1Trainers from "./routes/trainerRoutes.js";
import v1Supports from "./routes/supportRoutes.js";

const v1Routes = Router();

v1Routes.use("/reports", v1Reports)
v1Routes.use("/trainers", v1Trainers)
v1Routes.use("/supports", v1Supports)

export default v1Routes;
