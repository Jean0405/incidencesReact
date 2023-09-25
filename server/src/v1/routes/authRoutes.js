import { Router } from "express";
import * as authControllers from "../../controllers/authControllers.js";

const v1Auth = Router();

v1Auth
  .post("/signIn", authControllers.singIn)
  .post("/signUp", authControllers.singUp);


export default v1Auth;