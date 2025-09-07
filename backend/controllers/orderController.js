const Order = require("../models/Order");
const io = global.io;      // This avoids circular import

exports.createOrder = async (req, res) => {
  try {
    const { category, userNote } = req.body;

    const files = req.files.map(file => ({
      fileUrl: file.path,  // <-- Cloudinary URL instead of "/uploads/..."
      fileType: file.mimetype.startsWith("image") ? "image" : "video"
    }));

    const order = await Order.create({
      user: req.user.id,
      category,
      userNote,
      files
    });
    if (global.io) global.io.emit("newOrder", order);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// For admin upload edited files
exports.uploadEditedFiles = async (req, res) => {
  try {
    const editedFiles = req.files.map(file => ({
      fileUrl: file.path
    }));

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $push: { editedFiles: { $each: editedFiles } } },
      { new: true }
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, adminNote },
      { new: true }
    );

    // Emit event to all connected sockets
    io.emit("orderStatusUpdated", { 
      orderId: order._id,
      status: order.status
    });
    if (global.io) global.io.emit("newOrder", order);

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadEditedFiles = async (req, res) => {
  try {
    const editedFiles = req.files.map(file => ({
      fileUrl: `/uploads/${file.filename}`,
    }));

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $push: { editedFiles: { $each: editedFiles } } },
      { new: true }
    );
    io.emit("filesUploaded", {
    orderId: order._id,
    editedFiles: order.editedFiles
  });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


