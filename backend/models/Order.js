const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, enum: ["image_edit", "video_edit", "custom_edit"], required: true },
    files: [
      {
        fileUrl: String,
        fileType: { type: String, enum: ["image", "video"] }
      }
    ],
    editedFiles: [
  {
    fileUrl: String,
    uploadedAt: { type: Date, default: Date.now }
  }
],
    status: { type: String, enum: ["pending", "in_progress", "completed", "rejected"], default: "pending"},
    adminNote: String,
    userNote: String
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
