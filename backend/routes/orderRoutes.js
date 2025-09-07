const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  uploadEditedFiles,   // ✅ add this here
  deleteOrder
} = require("../controllers/orderController");

// User: Create new order
router.post("/", protect, upload.array("files", 5), createOrder);

// User: Get own orders
router.get("/my", protect, getMyOrders);

// Admin: Get all orders
router.get("/", protect, adminOnly, getAllOrders);

// Admin: Update order status
router.patch("/:id/status", protect, adminOnly, updateOrderStatus);

// router.put("/:id", protect, adminOnly, updateOrderStatus);

// routes/orderRoutes.js
router.put("/:id/upload-edited", protect, adminOnly, upload.array("editedFiles", 5), uploadEditedFiles);


router.delete("/:id", protect, adminOnly, deleteOrder);

module.exports = router;
