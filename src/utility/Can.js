// ** Utils
import { extractToken } from "./Utils";

// ** Jwt
import { decode } from "jsonwebtoken";

export const getUserIdFromToken = () => {
  return extractToken()?.id;
};

export const isJwtExpir = () => {
  const token = extractToken();

  if (!token) return false;
  return new Date().valueOf() / 1000 > token.exp;
};
