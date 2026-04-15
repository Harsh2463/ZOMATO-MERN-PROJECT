const foodModel = require("../models/food.model");
const { uploadFile } = require("../services/storage.service");

async function createFood(req, res) {
  const file = req.file;

  const fileUploadResult = await uploadFile(file.buffer.toString("base64"));

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  res.status(201).json({
    message: "Food created successfully",
    foodItem,
  });
}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find();

  res.status(200).json({
    message: "Food items fetched successfully",
    foodItems,
  });
}

module.exports = { createFood, getFoodItems };
