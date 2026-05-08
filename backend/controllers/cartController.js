import Cart from "../models/cartModel.js";
import Menu from "../models/menuModel.js";

// ================= ADD TO CART =================
export const addToCart = async (req, res) => {
  try {
    const { menuId, quantity } = req.body;
    const { id } = req.user;

    const qty = Number(quantity) || 1;

    const menuItem = await Menu.findById(menuId);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    let cart = await Cart.findOne({ user: id });

    if (!cart) {
      cart = new Cart({
        user: id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.menuItem.toString() === menuId,
    );

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.items.push({
        menuItem: menuId,
        quantity: qty,
      });
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    console.log("AddToCart Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ================= GET CART =================
export const getCart = async (req, res) => {
  try {
    const { id } = req.user;

    const cart = await Cart.findOne({ user: id }).populate("items.menuItem");

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: { items: [] },
      });
    }

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.log("GetCart Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ================= REMOVE FROM CART =================
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { menuId } = req.params;

    const cart = await Cart.findOne({ user: id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.menuItem.toString() !== menuId,
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    console.log("RemoveFromCart Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
