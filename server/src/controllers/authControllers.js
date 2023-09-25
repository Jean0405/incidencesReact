import { generateToken } from "../jwt/tokens.js";
import * as authServices from "../services/authServices.js";


export const singIn = async (req, res) => {
  try {
    let user = await authServices.signIn(req.body);

    if (!user.length) {
      res.status(404).json({
        status: 404,
        message: "you're no registered",
        user: req.body.username
      })
    } else {
      let jwt = await generateToken(user);
      res.status(200).json({
        status: 200,
        message: "successful login",
        user: user,
        token: jwt
      })
    }

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "error logging in",
      error: error.message
    })
  }
}

export const singUp = async (req, res) => {
  try {
    let user = await authServices.singUp(req.body);
    if (user) {
      let jwt = await generateToken(user);
      res.status(200).json({
        status: 200,
        message: "User succesfully registered",
        user: user,
        token: jwt
      })
    } else {
      res.status(409).json({
        status: 409,
        message: "User already exist",
        user: req.body.username,
      })
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "error registering",
      error: error.message
    })
  }
}
