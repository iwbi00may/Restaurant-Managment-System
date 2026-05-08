import Category from "../models/categoryModel.js";

// ================= CREATE CATEGORY =================
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    console.log("FILE:", req.file);

    if (!name || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Name and image are required",
      });
    }

    const exists = await Category.findOne({ name });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const imageUrl = `${
      process.env.BACKEND_URL || "http://localhost:5000"
    }/uploads/${req.file.filename}`;

    const newCategory = await Category.create({
      name,
      image: imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Category added successfully",
      category: newCategory,
    });
  } catch (error) {
    console.log("Add Category Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ================= GET ALL CATEGORIES =================
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ================= UPDATE CATEGORY =================
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // check duplicate name
    if (name) {
      const exists = await Category.findOne({ name });

      if (exists && exists._id.toString() !== id) {
        return res.status(400).json({
          success: false,
          message: "Category name already exists",
        });
      }

      category.name = name;
    }

    // update image if new file uploaded
    if (req.file) {
      category.image = `${
        process.env.BACKEND_URL || "http://localhost:5000"
      }/uploads/${req.file.filename}`;
    }

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log("Update Category Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ================= DELETE CATEGORY =================
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
