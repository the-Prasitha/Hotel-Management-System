const express = require("express");

const router = express.Router();

const {
  createHotel,
  getHotels,
  updateHotel,
} = require("../controllers/hotelController");

const upload = require("../middleware/uploadMiddleware");

// CREATE
router.post("/", upload.single("image"), createHotel);

// GET
router.get("/", getHotels);

// UPDATE
router.put("/:id", upload.single("image"), updateHotel);

module.exports = router;