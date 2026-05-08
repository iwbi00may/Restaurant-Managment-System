import express from "express";

import { adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../config/multer.js";

import {
  addMenuItem,
  deleteMenuItem,
  getAllMenuItems,
  updateMenuItem,
} from "../controllers/menuController.js";

const router = express.Router();

// 🔥 Add menu item (with image upload)
router.post("/add", adminOnly, upload.single("image"), addMenuItem);

// 🔥 Update menu item (optional image update)
router.put("/update/:id", adminOnly, upload.single("image"), updateMenuItem);

// 🔥 Delete menu item
router.delete("/delete/:id", adminOnly, deleteMenuItem);

// 🔥 Get all menu items (public or admin depending on your design)
router.get("/all", getAllMenuItems);

export default router;
