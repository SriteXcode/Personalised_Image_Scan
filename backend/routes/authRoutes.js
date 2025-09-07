const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController.js');
const { protect, adminOnly } = require( '../middleware/authMiddleware.js');

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Example admin route
router.get("/admin", protect, adminOnly, (req, res) => {
    res.json({ message: "Welcome Admin" });
});

module.exports = router;
