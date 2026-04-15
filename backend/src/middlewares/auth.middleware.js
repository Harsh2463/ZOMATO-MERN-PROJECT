const foodPartnerModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authFoodPartnerMiddleware(req, res, next) {
  const foodPartnerToken = req.cookies.foodPartnerToken;

  if (!foodPartnerToken) {
    return res.status(401).json({
      message: "Please Login first",
    });
  }

  try {
    const decoded = jwt.verify(foodPartnerToken, process.env.JWT_SECRET);

    const foodPartner = await foodPartnerModel.findById(decoded._id);

    if (!foodPartner) {
      return res.status(403).json({
        message: "Access denied. Not a food partner.",
      });
    }

    // creating new property here inside req
    req.foodPartner = foodPartner;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Invalid foodPartnerToken",
    });
  }
}

async function authUserMiddlware(req, res, next) {
  const userToken = req.cookies.userToken;

  if (!userToken) {
    return res.status(401).json({
      message: "Please Login first",
    });
  }

  try {
    const decoded = jwt.verify(userToken, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(403).json({
        message: "Access denied. Not an authorized user",
      });
    }

    // creating new property here inside req
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Invalid userToken",
    });
  }
}

module.exports = { authFoodPartnerMiddleware, authUserMiddlware };
