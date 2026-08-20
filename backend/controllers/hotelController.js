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


// GET ALL HOTELS
const getHotels = async (req, res) => {
  try {
    const {
      title,
      minPrice,
      maxPrice,
      offset = 0,
      limit = 10,
    } = req.query;

    const conditions = [];
    const values = [];

    // Search by title
    if (title && title.trim() !== "") {
      values.push(`%${title.trim()}%`);
      conditions.push(`title ILIKE $${values.length}`);
    }

    // Minimum price
    if (minPrice !== undefined && minPrice !== "") {
      values.push(Number(minPrice));
      conditions.push(`price >= $${values.length}`);
    }

    // Maximum price
    if (maxPrice !== undefined && maxPrice !== "") {
      values.push(Number(maxPrice));
      conditions.push(`price <= $${values.length}`);
    }

    const whereClause =
      conditions.length > 0
        ? `WHERE ${conditions.join(" AND ")}`
        : "";

    // Get total count
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM hotels ${whereClause}`,
      values
    );

    const total = Number(countResult.rows[0].count);

    // Pagination values
    const parsedOffset = Math.max(Number(offset) || 0, 0);
    const parsedLimit = Math.min(
      Math.max(Number(limit) || 10, 1),
      100
    );

    // Get hotels
    const hotelsResult = await pool.query(
      `
      SELECT *
      FROM hotels
      ${whereClause}
      ORDER BY id DESC
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
      `,
      [...values, parsedLimit, parsedOffset]
    );

    res.json({
      hotels: hotelsResult.rows,
      pagination: {
        offset: parsedOffset,
        limit: parsedLimit,
        total,
        count: hotelsResult.rows.length,
      },
    });

  } catch (error) {
    console.error("Get hotels error:", error);

    res.status(500).json({
      message: "Failed to fetch hotels",
    });
  }
};

//Update Hotel

const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      latitude,
      longitude,
      price,
    } = req.body;

    // Check if hotel exists
    const existingHotel = await pool.query(
      "SELECT * FROM hotels WHERE id = $1",
      [id]
    );

    if (existingHotel.rows.length === 0) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }

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

    const oldHotel = existingHotel.rows[0];

    let imagePath = oldHotel.image;

    // If a new image was uploaded
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const query = `
      UPDATE hotels
      SET
        image = $1,
        title = $2,
        description = $3,
        latitude = $4,
        longitude = $5,
        price = $6
      WHERE id = $7
      RETURNING *
    `;

    const values = [
      imagePath,
      title.trim(),
      description.trim(),
      lat,
      lng,
      hotelPrice,
      id,
    ];

    const result = await pool.query(query, values);

    // Delete old image if a new image replaced it
    if (req.file && oldHotel.image) {
      const fs = require("fs");
      const path = require("path");

      const oldImagePath = path.join(
        __dirname,
        "..",
        oldHotel.image.replace("/uploads/", "uploads/")
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    res.json({
      message: "Hotel updated successfully",
      hotel: result.rows[0],
    });

  } catch (error) {
    console.error("Update hotel error:", error);

    res.status(500).json({
      message: "Failed to update hotel",
    });
  }
};

//delete hotel

const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the hotel first
    const existingHotel = await pool.query(
      "SELECT * FROM hotels WHERE id = $1",
      [id]
    );

    if (existingHotel.rows.length === 0) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }

    const hotel = existingHotel.rows[0];

    // Delete hotel from database
    await pool.query(
      "DELETE FROM hotels WHERE id = $1",
      [id]
    );

    // Delete associated image
    if (hotel.image) {
      const fs = require("fs");
      const path = require("path");

      const imagePath = path.join(
        __dirname,
        "..",
        hotel.image.replace("/uploads/", "uploads/")
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({
      message: "Hotel deleted successfully",
    });

  } catch (error) {
    console.error("Delete hotel error:", error);

    res.status(500).json({
      message: "Failed to delete hotel",
    });
  }
};
const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM hotels WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error("Get hotel error:", error);

    res.status(500).json({
      message: "Failed to fetch hotel",
    });
  }
};

module.exports = {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
};