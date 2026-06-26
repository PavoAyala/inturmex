import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { onRequest, onCall, HttpsError } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Initialize Firebase Admin SDK
initializeApp();

/**
 * Callable Function: automatically handles Authentication headers and token verification via Firebase SDKs.
 * Best used when calling the function from a Firebase Web/Mobile Client SDK.
 */
export const checkAuthCall = onCall((request) => {
  if (!request.auth) {
    logger.warn("Unauthenticated access attempt.");
    throw new HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  const { uid, token } = request.auth;
  logger.info(`User ${uid} checked auth status (Callable).`);

  return {
    authenticated: true,
    uid,
    email: token.email,
  };
});

/**
 * HTTPS Request Function: useful if calling via regular REST client (e.g. fetch, axios)
 * expects: Authorization: Bearer <ID_TOKEN>
 */
export const checkAuthRequest = onRequest(async (req, res) => {
  // Simple CORS setup
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    logger.warn("Unauthorized request: missing or invalid authorization header");
    res.status(401).json({ authenticated: false, error: "Unauthorized: Missing Bearer token" });
    return;
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    logger.info(`User ${decodedToken.uid} checked auth status (HTTPS Request).`);
    res.status(200).json({
      authenticated: true,
      uid: decodedToken.uid,
      email: decodedToken.email,
    });
  } catch (error: any) {
    logger.error("Token verification failed:", error);
    res.status(401).json({ authenticated: false, error: "Unauthorized: Invalid token" });
  }
});
