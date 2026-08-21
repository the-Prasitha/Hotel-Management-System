import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getHotelById } from "../services/hotelApi";
import HotelMap from "../components/HotelMap";

function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hotel details
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getHotelById(id);

        setHotel(data);
      } catch (error) {
        console.error("Failed to fetch hotel:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load hotel"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  // Update browser tab title
  useEffect(() => {
    if (loading) {
      document.title =
        "Loading Hotel | Hotel Management System";
    } else if (hotel) {
      document.title =
        `${hotel.title} | Hotel Management System`;
    } else if (error) {
      document.title =
        "Error | Hotel Management System";
    } else {
      document.title =
        "Hotel Not Found | Hotel Management System";
    }

    // Restore default title when leaving the page
    return () => {
      document.title = "Hotel Management System";
    };
  }, [loading, hotel, error]);

  // Loading state
  if (loading) {
    return (
      <div className="hotel-details-page">
        <h2>Loading hotel...</h2>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="hotel-details-page">
        <h2>{error}</h2>

        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Back to Hotels
        </button>
      </div>
    );
  }

  // Hotel not found
  if (!hotel) {
    return (
      <div className="hotel-details-page">
        <h2>Hotel not found</h2>

        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Back to Hotels
        </button>
      </div>
    );
  }

  const imageUrl = `http://localhost:5000${hotel.image}`;

  return (
    <div className="hotel-details-page">

      {/* Back Button */}
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back to Hotels
      </button>

      {/* Hotel Details Card */}
      <div className="hotel-details-card">

        <img
          src={imageUrl}
          alt={hotel.title}
          className="hotel-details-image"
        />

        <div className="hotel-details-content">

          <h1>{hotel.title}</h1>

          <p className="hotel-details-description">
            {hotel.description}
          </p>

          <h2>₹{hotel.price}</h2>

          <div className="hotel-coordinates">

            <p>
              <strong>Latitude:</strong>{" "}
              {hotel.latitude}
            </p>

            <p>
              <strong>Longitude:</strong>{" "}
              {hotel.longitude}
            </p>

          </div>

        </div>
      </div>

      {/* Hotel Map */}
      <div className="hotel-map-section">

        <h2>Hotel Location</h2>

        <HotelMap
          latitude={hotel.latitude}
          longitude={hotel.longitude}
          title={hotel.title}
        />

      </div>

    </div>
  );
}

export default HotelDetails;