const express = require("express");

const router = express.Router();

const {
  createHotel,
} = require("../controllers/hotelController");

const upload = require("../middleware/uploadMiddleware");

router.post("/", upload.single("image"), createHotel);

module.exports = router;