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

  useEffect(() => {
    const fetchHotel = async () => {
      try {
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

  if (loading) {
    return (
      <div className="hotel-details-page">
        <h2>Loading hotel...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hotel-details-page">
        <h2>{error}</h2>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="hotel-details-page">
        <h2>Hotel not found</h2>
      </div>
    );
  }

  const imageUrl = `http://localhost:5000${hotel.image}`;

  return (
    <div className="hotel-details-page">
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back to Hotels
      </button>

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