import { Router } from "express";
import v1Reports from "./routes/reportRoutes.js";
import v1Trainers from "./routes/trainerRoutes.js";
import v1Supports from "./routes/supportRoutes.js";
import v1Auth from "./routes/authRoutes.js";

const v1Routes = Router();

v1Routes.use("/reports", v1Reports)
v1Routes.use("/trainers", v1Trainers)
v1Routes.use("/supports", v1Supports)
v1Routes.use("/auth", v1Auth);

export default v1Routes;
