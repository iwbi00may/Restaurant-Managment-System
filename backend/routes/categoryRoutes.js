import express from "express";
import { adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../config/multer.js";

import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// ✅ Add category (admin + image upload)
router.post("/add", adminOnly, upload.single("image"), addCategory);

// ✅ Update category (admin + optional image upload)
router.put("/update/:id", adminOnly, upload.single("image"), updateCategory);

// ✅ Delete category (admin only)
router.delete("/delete/:id", adminOnly, deleteCategory);

// ✅ Get all categories (public)
router.get("/all", getAllCategories);

export default router;
