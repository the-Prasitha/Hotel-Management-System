import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchHotels } from "../redux/hotelSlice";
import HotelCard from "../components/HotelCard";

function HotelList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    hotels,
    loading,
    error,
  } = useSelector((state) => state.hotels);

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading hotels...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="hotel-page">
      <header className="hotel-header">
        <h1>Hotel Management System</h1>

        <button
  className="add-hotel-button"
  onClick={() => navigate("/hotels/add")}
>
  + Add Hotel
</button>
      </header>

      <div className="hotel-list">
        {hotels.length === 0 ? (
          <p>No hotels found.</p>
        ) : (
          hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default HotelList;