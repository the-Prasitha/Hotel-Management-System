import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteHotel } from "../services/hotelApi";
import ConfirmModal from "./ConfirmModal";

function HotelCard({ hotel, onDeleted }) {
  const navigate = useNavigate();

  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const imageUrl = `http://localhost:5000${hotel.image}`;

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleCancelDelete = () => {
    if (!deleting) {
      setShowConfirm(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);

      await deleteHotel(hotel.id);

      setShowConfirm(false);

      if (onDeleted) {
        onDeleted(hotel.title);
      }
    } catch (error) {
      console.error("Failed to delete hotel:", error);

      setShowConfirm(false);

      // Error notification will be connected next.
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
    <>
      <div className="hotel-card">

        <img
          src={imageUrl}
          alt={hotel.title}
          className="hotel-card-image"
          onClick={handleDetails}
        />

        <div className="hotel-card-content">

          <h2
            className="hotel-card-title"
            onClick={handleDetails}
          >
            {hotel.title}
          </h2>

          <p className="hotel-description">
            {hotel.description}
          </p>

          <p className="hotel-price">
            ₹{hotel.price}
          </p>

          <div className="hotel-card-actions">

            <button onClick={handleEdit}>
              Edit
            </button>

            <button
              onClick={handleDeleteClick}
              disabled={deleting}
            >
              Delete
            </button>

          </div>

        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <ConfirmModal
          title="Delete Hotel?"
          message={`Are you sure you want to delete "${hotel.title}"? This action cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          loading={deleting}
        />
      )}
    </>
  );
}

export default HotelCard;