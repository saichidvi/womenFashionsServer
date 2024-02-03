const Cart = require("../models/Cart.js");
const Material = require("../models/Material.js");
const { ObjectId } = require("mongodb");

const cartDetails = async (req, res) => {
  try {
    const cartDetails = await Cart.findById("65bdc0c72b9e5996eb54703f");
    const totalPrice = cartDetails.totalPrice;
    let items = [];
    for (const itemId of cartDetails.items) {
      const item = await Material.findById(itemId);
      items = [...items, item];
    }
    const data = {
      cartId: cartDetails._id,
      totalPrice,
      items,
    };
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { cartId, operation, materialId, itemPrice } = req.body;
    if (operation === "add") {
      const cart = await Cart.findById(cartId);
      for (const item of cart.items) {
        if (item.toString() === materialId) {
          return res.status(200).json({
            success: false,
            status: 200,
            message: "Item already exists in cart",
          });
        }
      }
      const updatedCart = await Cart.updateOne(
        { _id: cartId },
        { $push: { items: materialId }, $inc: { totalPrice: itemPrice } }
      );
      res.status(200).json({
        status: 200,
        success: true,
        message: "Item added to the cart!",
      });
    } else {
      const updatedCart = await Cart.updateOne(
        { _id: cartId },
        { $pull: { items: materialId }, $inc: { totalPrice: -itemPrice } }
      );
      res.status(200).json({
        status: 200,
        success: true,
        message: "Item removed from the cart!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
};

const createCart = async (req, res) => {
  try {
    const newCart = await Cart.create({
      items: ["65bd1998e16b9274d1ba49d6"],
      totalPrice: 699,
    });
    res.status(200).json(newCart);
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
};

module.exports = { cartDetails, updateCart, createCart };
