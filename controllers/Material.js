const Material = require("../models/Material.js");

const getAllMaterials = async (req, res) => {
  try {
    const allMaterials = await Material.find();
    return res.status(200).json(allMaterials);
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
};

const createMaterial = async (req, res) => {
  try {
    const { name, price ,picLink} = req.body;
    const newMaterial = await Material.create({ name, price,picLink });
    res.status(200).json(newMaterial);
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
};

module.exports = { getAllMaterials, createMaterial };
