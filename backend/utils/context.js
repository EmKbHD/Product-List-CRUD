import { verifyToken } from "./verifyToken.js";
import User from "../models/userModel.js";
import cookie from "cookie";

export const context = async ({ req, res }) => {
  const cookies = cookie.parse(req.headers.cookie || ""); // Ensure req.headers.cookie is used
  // Add res parameter here
  // const contextData = { req, res, user: null, error: null }; // Include res in contextData
  const token = cookies["auth-token"];

  if (!token) {
    return {};
  }

  try {
    // verification of the token
    const decoded = verifyToken(token);

    // fetch the user form the database
    const user = await User.findById(decoded?.id);

    if (!user) {
      throw new Error("User not found");
    }

    // if the user is found, user object is returned
    return { user, req, res };
  } catch (err) {
    return {};
  }
};
