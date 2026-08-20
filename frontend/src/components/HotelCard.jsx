import { useNavigate } from "react-router-dom";

function HotelCard({ hotel }) {
  const navigate = useNavigate();

  const imageUrl = `http://localhost:5000${hotel.image}`;

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

          <button>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;