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

    let parameterIndex = 1;

    // Title search
    if (title) {
      conditions.push(`title ILIKE $${parameterIndex}`);
      values.push(`%${title}%`);
      parameterIndex++;
    }

    // Minimum price
    if (minPrice !== undefined) {
      const min = Number(minPrice);

      if (!Number.isFinite(min) || min < 0) {
        return res.status(400).json({
          message: "Invalid minimum price",
        });
      }

      conditions.push(`price >= $${parameterIndex}`);
      values.push(min);
      parameterIndex++;
    }

    // Maximum price
    if (maxPrice !== undefined) {
      const max = Number(maxPrice);

      if (!Number.isFinite(max) || max < 0) {
        return res.status(400).json({
          message: "Invalid maximum price",
        });
      }

      conditions.push(`price <= $${parameterIndex}`);
      values.push(max);
      parameterIndex++;
    }

    const parsedOffset = Number(offset);
    const parsedLimit = Number(limit);

    if (!Number.isInteger(parsedOffset) || parsedOffset < 0) {
      return res.status(400).json({
        message: "Invalid offset",
      });
    }

    if (!Number.isInteger(parsedLimit) || parsedLimit <= 0) {
      return res.status(400).json({
        message: "Invalid limit",
      });
    }

    // Build WHERE clause
    const whereClause =
      conditions.length > 0
        ? `WHERE ${conditions.join(" AND ")}`
        : "";

    // Get hotels
    const hotelsQuery = `
      SELECT *
      FROM hotels
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${parameterIndex}
      OFFSET $${parameterIndex + 1}
    `;

    const hotelValues = [
      ...values,
      parsedLimit,
      parsedOffset,
    ];

    const hotelsResult = await pool.query(
      hotelsQuery,
      hotelValues
    );

    // Get total matching hotels
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM hotels
      ${whereClause}
    `;

    const countResult = await pool.query(
      countQuery,
      values
    );

    const total = Number(countResult.rows[0].total);

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

module.exports = {
  createHotel,
  getHotels,
};