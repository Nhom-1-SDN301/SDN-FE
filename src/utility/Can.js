import { extractToken } from "./Utils";

export const getUserIdFromToken = () => {
  return extractToken()?.id;
};
