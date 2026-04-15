const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const foodController = require("../controllers/food.controller");
const multer = require("multer");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

/* POST /api/food [protected by authMiddleware]*/
router.post(
  "/upload",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood,
);

router.get("/", authMiddleware.authUserMiddlware, foodController.getFoodItems);

module.exports = router;
