const express = require("express");

const router = express.Router();

const {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController");

const upload = require("../middleware/uploadMiddleware");

// CREATE
router.post("/", upload.single("image"), createHotel);

// GET
router.get("/", getHotels);
router.get("/:id", getHotelById);

// UPDATE
router.put("/:id", upload.single("image"), updateHotel);

//DELETEe
router.delete("/:id", deleteHotel);

module.exports = router;