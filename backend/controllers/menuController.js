import Menu from "../models/menuModel.js";

// ================= ADD MENU ITEM =================
export const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category || !req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const imageUrl = `${
      process.env.BACKEND_URL || "http://localhost:5000"
    }/uploads/${req.file.filename}`;

    const newMenuItem = await Menu.create({
      name,
      description,
      price,
      category,
      image: imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Menu item added",
      menuItem: newMenuItem,
    });
  } catch (error) {
    console.log("Add Menu Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ================= GET ALL MENU ITEMS =================
export const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      menuItems,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ================= UPDATE MENU ITEM =================
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, isAvailable } = req.body;

    const menuItem = await Menu.findById(id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    if (req.file) {
      menuItem.image = `${
        process.env.BACKEND_URL || "http://localhost:5000"
      }/uploads/${req.file.filename}`;
    }

    if (name) menuItem.name = name;
    if (description) menuItem.description = description;
    if (price) menuItem.price = price;
    if (category) menuItem.category = category;
    if (isAvailable !== undefined) menuItem.isAvailable = isAvailable;

    await menuItem.save();

    return res.status(200).json({
      success: true,
      message: "Menu item updated",
      menuItem,
    });
  } catch (error) {
    console.log("Update Menu Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ================= DELETE MENU ITEM =================
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await Menu.findByIdAndDelete(id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Menu item deleted",
    });
  } catch (error) {
    console.log("Delete Menu Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
