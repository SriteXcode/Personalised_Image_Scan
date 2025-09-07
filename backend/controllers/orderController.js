// const Order = require("../models/Order");
// const io = global.io;      // This avoids circular import

// exports.createOrder = async (req, res) => {
//   try {
//     const { category, userNote } = req.body;

//     const files = req.files.map(file => ({
//       fileUrl: file.path,  // <-- Cloudinary URL instead of "/uploads/..."
//       fileType: file.mimetype.startsWith("image") ? "image" : "video"
//     }));

//     const order = await Order.create({
//       user: req.user.id,
//       category,
//       userNote,
//       files
//     });
//     if (global.io) global.io.emit("newOrder", order);

//     res.status(201).json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // For admin upload edited files
// exports.uploadEditedFiles = async (req, res) => {
//   try {
//     const editedFiles = req.files.map(file => ({
//       fileUrl: file.path
//     }));

//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { $push: { editedFiles: { $each: editedFiles } } },
//       { new: true }
//     );

//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate("user", "name email");
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { status, adminNote } = req.body;
//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status, adminNote },
//       { new: true }
//     );

//     // Emit event to all connected sockets
//     io.emit("orderStatusUpdated", { 
//       orderId: order._id,
//       status: order.status
//     });
//     if (global.io) global.io.emit("newOrder", order);

//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.uploadEditedFiles = async (req, res) => {
//   try {
//     const editedFiles = req.files.map(file => ({
//       fileUrl: `/uploads/${file.filename}`,
//     }));

//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { $push: { editedFiles: { $each: editedFiles } } },
//       { new: true }
//     );
//     io.emit("filesUploaded", {
//     orderId: order._id,
//     editedFiles: order.editedFiles
//   });

//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// exports.deleteOrder = async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.json({ message: "Order deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };













// const Order = require("../models/Order");
// const io = global.io; // Global io handle (better: move to socket.js and import)

// // ✅ Create new order
// exports.createOrder = async (req, res) => {
//   try {
//     const { category, userNote } = req.body;

//     const files = req.files.map(file => ({
//       fileUrl: file.path, // Cloudinary URL
//       fileType: file.mimetype.startsWith("image") ? "image" : "video"
//     }));

//     const order = await Order.create({
//       user: req.user.id,
//       category,
//       userNote,
//       files
//     });

//     // Emit new order event
//     io.emit("newOrder", order);

//     res.status(201).json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Upload edited files (admin)
// exports.uploadEditedFiles = async (req, res) => {
//   try {
//     const editedFiles = req.files.map(file => ({
//       fileUrl: file.path // Cloudinary URL
//     }));

//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { $push: { editedFiles: { $each: editedFiles } } },
//       { new: true }
//     );

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // Notify clients
//     io.emit("filesUploaded", {
//       orderId: order._id,
//       editedFiles: order.editedFiles
//     });

//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Get my orders (user)
// exports.getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Get all orders (admin)
// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate("user", "name email");
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Update order status (admin)
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { status, adminNote } = req.body;

//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status, adminNote },
//       { new: true }
//     );

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // Emit event for updated status
//     io.emit("orderStatusUpdated", {
//       orderId: order._id,
//       status: order.status,
//       adminNote: order.adminNote
//     });

//      if (global.io) {
//       global.io.emit("filesUploaded", {
//         orderId: order._id,
//         editedFiles: order.editedFiles,
//       });
//     }

//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Delete order
// exports.deleteOrder = async (req, res) => {
//   try {
//     const order = await Order.findByIdAndDelete(req.params.id);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     io.emit("orderDeleted", { orderId: req.params.id });

//     res.json({ message: "Order deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



const Order = require("../models/Order");
const { getIO } = require("../socket"); // 👈 import socket instance

// ✅ Create new order
exports.createOrder = async (req, res) => {
  try {
    const { category, userNote } = req.body;

    const files = req.files.map(file => ({
      fileUrl: file.path,
      fileType: file.mimetype.startsWith("image") ? "image" : "video",
    }));

    const order = await Order.create({
      user: req.user.id,
      category,
      userNote,
      files,
    });

    // Emit event
    getIO().emit("newOrder", order);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Upload edited files (admin)
exports.uploadEditedFiles = async (req, res) => {
  try {
    const editedFiles = req.files.map(file => ({ fileUrl: file.path }));

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $push: { editedFiles: { $each: editedFiles } } },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    getIO().emit("filesUploaded", {
      orderId: order._id,
      editedFiles: order.editedFiles,
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get my orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, adminNote } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, adminNote },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    getIO().emit("orderStatusUpdated", {
      orderId: order._id,
      status: order.status,
      adminNote: order.adminNote,
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    getIO().emit("orderDeleted", { orderId: req.params.id });

    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
