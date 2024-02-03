const express = require("express");
const router = express.Router();
const {
  getAllMaterials,
  createMaterial,
} = require("../controllers/Material.js");

router.get("/allMaterials", getAllMaterials);
router.post("/createMaterial", createMaterial);

module.exports = router;
