const express = require("express");
const router = express.Router();
const {
  updateCart,
  cartDetails,
  createCart,
} = require("../controllers/Cart.js");

router.get("/cartDetails", cartDetails);
router.put("/updateCart", updateCart);
router.post("/newCart", createCart);

module.exports = router;
