import { Router } from "express";
//controller imports
import v1Reports from "./routes/reportRoutes.js";
import v1Campers from "./routes/camperRoutes.js";
import v1Trainers from "./routes/trainerRoutes.js";
import v1Supports from "./routes/supportRoutes.js";
import v1Auth from "./routes/authRoutes.js";
//jwt imports
import { validateToken } from "../jwt/tokens.js";

const v1Routes = Router();

v1Routes.use("/reports", validateToken, v1Reports)
v1Routes.use("/campers", validateToken, v1Campers)
v1Routes.use("/trainers", validateToken, v1Trainers)
v1Routes.use("/supports", validateToken, v1Supports)
v1Routes.use("/auth", v1Auth);

export default v1Routes;
