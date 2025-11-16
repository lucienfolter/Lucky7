// middleware/auth.js
module.exports = (req, res, next) => {
  // placeholder — if you have JWT/session, replace logic
  // For development, allow unauthenticated by setting req.user
  // In production you must verify token and set req.user.id
  try {
    // Example: set a fake user id if not present (remove for production)
    req.user = { id: process.env.DEV_TEST_USER_ID || null };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
