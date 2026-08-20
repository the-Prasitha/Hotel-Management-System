const express = require("express");

const router = express.Router();

const {
  createHotel,
  getHotels,
} = require("../controllers/hotelController");

const upload = require("../middleware/uploadMiddleware");

router.post("/", upload.single("image"), createHotel);

router.get("/", getHotels);

module.exports = router;