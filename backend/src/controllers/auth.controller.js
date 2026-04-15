const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const foodPartnerModel = require("../models/foodpartner.model");

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    email,
  });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("userToken", userToken);

  res.status(201).json({
    message: "User registerd successfully",
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const userToken = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("userToken", userToken);

  res.status(200).json({
    message: "User logged in succesfully",
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie("userToken");
  res.status(200).json({
    message: "User logged out successfully",
  });
}

async function registerFoodPartner(req, res) {
  const { name, email, password, contactName, phone, address } = req.body;

  const isAccountAlreadyExists = await foodPartnerModel.findOne({
    email,
  });

  if (isAccountAlreadyExists) {
    return res.status(400).json({
      message: "Food partner account already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartnerUser = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
    contactName,
    phone,
    address,
  });

  const foodPartnerToken = jwt.sign(
    { _id: foodPartnerUser._id },
    process.env.JWT_SECRET,
  );

  res.cookie("foodPartnerToken", foodPartnerToken);

  res.status(201).json({
    message: "Food partner account created successfully",
    foodPartnerUser: {
      _id: foodPartnerUser._id,
      name: foodPartnerUser.name,
      email: foodPartnerUser.email,
      contactName: foodPartnerUser.contactName,
      phone: foodPartnerUser.phone,
      address: foodPartnerUser.address,
    },
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;

  const foodPartner = await foodPartnerModel.findOne({
    email,
  });

  if (!foodPartner) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const foodPartnerToken = jwt.sign(
    {
      _id: foodPartner._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("foodPartnerToken", foodPartnerToken);

  res.status(200).json({
    message: "Food partner logged in successfully",
    foodPartner: {
      _id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
      contactName: foodPartner.contactName,
      phone: foodPartner.phone,
      address: foodPartner.address,
    },
  });
}
function logoutFoodPartner(req, res) {
  res.clearCookie("foodPartnerToken");
  res.status(200).json({
    message: "Food partner logged out successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
