import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteHotel } from "../services/hotelApi";

function HotelCard({ hotel, onDeleted }) {
  const navigate = useNavigate();

  const [deleting, setDeleting] = useState(false);

  const imageUrl = `http://localhost:5000${hotel.image}`;

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${hotel.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      await deleteHotel(hotel.id);

      alert("Hotel deleted successfully!");

      if (onDeleted) {
        onDeleted(hotel.id);
      }
    } catch (error) {
      console.error("Failed to delete hotel:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete hotel"
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="hotel-card">
      <img
        src={imageUrl}
        alt={hotel.title}
        className="hotel-card-image"
      />

      <div className="hotel-card-content">
        <h2>{hotel.title}</h2>

        <p className="hotel-description">
          {hotel.description}
        </p>

        <p className="hotel-price">
          ₹{hotel.price}
        </p>

        <div className="hotel-card-actions">
          <button
            onClick={() =>
              navigate(`/hotels/${hotel.id}/edit`)
            }
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;