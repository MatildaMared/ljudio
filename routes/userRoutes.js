const { Router } = require("express");
const userController = require("../controllers/userController");
const router = new Router();

// Get user data, request must be made with JWT in Authorization header
router.get("/", userController.getUser);

module.exports = router;
