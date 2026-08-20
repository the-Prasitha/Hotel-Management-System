const pool = require("../db/db");

const createHotel = async (req, res) => {
  try {
    const {
      title,
      description,
      latitude,
      longitude,
      price,
    } = req.body;

    // Validation
    if (
      !title ||
      !description ||
      latitude === undefined ||
      longitude === undefined ||
      price === undefined
    ) {
      return res.status(400).json({
        message: "All hotel fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Hotel image is required",
      });
    }

    const lat = Number(latitude);
    const lng = Number(longitude);
    const hotelPrice = Number(price);

    if (!Number.isFinite(lat) || lat < -90 || lat > 90) {
      return res.status(400).json({
        message: "Latitude must be between -90 and 90",
      });
    }

    if (!Number.isFinite(lng) || lng < -180 || lng > 180) {
      return res.status(400).json({
        message: "Longitude must be between -180 and 180",
      });
    }

    if (!Number.isFinite(hotelPrice) || hotelPrice < 0) {
      return res.status(400).json({
        message: "Price must be a valid non-negative number",
      });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const query = `
      INSERT INTO hotels
      (image, title, description, latitude, longitude, price)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [
      imagePath,
      title.trim(),
      description.trim(),
      lat,
      lng,
      hotelPrice,
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Hotel created successfully",
      hotel: result.rows[0],
    });
  } catch (error) {
    console.error("Create hotel error:", error);

    res.status(500).json({
      message: "Failed to create hotel",
    });
  }
};

module.exports = {
  createHotel,
};