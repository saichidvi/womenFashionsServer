const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  picLink: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
