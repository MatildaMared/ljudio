const { Router } = require("express");
const authController = require("../controllers/authController");
const router = new Router();

// localhost:8000/api/auth/signup
// Create new user
router.post("/signup", authController.signup);

// Log in user
router.post("/login", authController.login);

// Log out user kanske???

module.exports = router;
