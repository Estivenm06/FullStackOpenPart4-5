import jwt from "jsonwebtoken";
import User from "../models/user.js";

const requestLogger = (request, response, next) => {
  console.log("Method", request.method);
  console.log("Path ", request.path);
  console.log("Body ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response, next) => {
  if (
    request.path === "/" ||
    request.path.startsWith("/client") ||
    request.path.startsWith("/node_modules") ||
    request.path.startsWith("/@vite/client") ||
    request.path.startsWith("/@react-refresh")
  ) {
    next();
  } else {
    return response.status(404).send({ error: "Unknown endpoint" }) || next();
  }
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "MongoServerError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  }
  next(error);
};

const userExtractor = async (request, response, next) => {
  let user = null;
  try {
    if (request.token) {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      console.log(decodedToken);

      user = await User.findById(decodedToken.id);
      console.log(user);
      request.user = user;
    }
  } catch (err) {
    console.error("Error verifying token", err);
  }
  next();
};

const tokenExtractor = (request, response, next) => {
  const decodedToken = request.get("authorization");
  if (decodedToken && decodedToken.startsWith("Bearer ")) {
    request.token = decodedToken.substring(7);
  } else {
    request.token = null;
  }
  next();
};

export {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
