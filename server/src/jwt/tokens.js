import "dotenv/config";
import { SignJWT, jwtVerify } from "jose";


export const generateToken = async (info) => {
  const encoder = new TextEncoder();
  const jwt = await new SignJWT({ info })
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT"
    })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(encoder.encode(process.env.PRIVATE_KEY));

  return jwt;
}

export const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      res.status(401).json({
        status: 401,
        message: "token has not been assigned"
      })
    } else {
      const encoder = new TextEncoder();
      req.auth = await jwtVerify(
        authorization,
        encoder.encode(process.env.PRIVATE_KEY)
      );
      next();
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "error validating token",
      error: error.message
    })
  }
}