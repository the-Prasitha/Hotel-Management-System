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

  const handleEdit = () => {
    navigate(`/hotels/${hotel.id}/edit`);
  };

  const handleDetails = () => {
    navigate(`/hotels/${hotel.id}`);
  };

  return (
    <div className="hotel-card">
      {/* Hotel Image */}
      <img
        src={imageUrl}
        alt={hotel.title}
        className="hotel-card-image"
        onClick={handleDetails}
      />

      <div className="hotel-card-content">
        {/* Hotel Title */}
        <h2
          className="hotel-card-title"
          onClick={handleDetails}
        >
          {hotel.title}
        </h2>

        {/* Description */}
        <p className="hotel-description">
          {hotel.description}
        </p>

        {/* Price */}
        <p className="hotel-price">
          ₹{hotel.price}
        </p>

        {/* Actions */}
        <div className="hotel-card-actions">
          <button onClick={handleEdit}>
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