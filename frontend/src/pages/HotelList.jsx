import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchHotels } from "../redux/hotelSlice";
import HotelCard from "../components/HotelCard";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";

function HotelList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    hotels,
    pagination,
    loading,
    error,
  } = useSelector((state) => state.hotels);

  const [title, setTitle] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [filters, setFilters] = useState({
    title: "",
    minPrice: "",
    maxPrice: "",
  });

  // Current page offset
  const [offset, setOffset] = useState(0);

  // 4 hotels per page
  const limit = 4;

  // --------------------------------
  // FETCH HOTELS
  // --------------------------------

  useEffect(() => {
    dispatch(
      fetchHotels({
        ...filters,
        offset,
        limit,
      })
    );
  }, [dispatch, filters, offset]);

  // --------------------------------
  // SEARCH
  // --------------------------------

  const handleSearch = () => {
    const newFilters = {
      title: title.trim(),
      minPrice,
      maxPrice,
    };

    // IMPORTANT:
    // Search always starts from page 1
    setOffset(0);

    setFilters(newFilters);
  };

  // --------------------------------
  // CLEAR
  // --------------------------------

  const handleClear = () => {
    setTitle("");
    setMinPrice("");
    setMaxPrice("");

    setOffset(0);

    setFilters({
      title: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  // --------------------------------
  // PAGINATION
  // --------------------------------

  const handlePageChange = (newOffset) => {
    setOffset(newOffset);
  };

  // --------------------------------
  // DELETE
  // --------------------------------

  const handleDeleted = () => {
    dispatch(
      fetchHotels({
        ...filters,
        offset,
        limit,
      })
    );
  };

  return (
    <div className="hotel-page">

      {/* Header */}
      <header className="hotel-header">
        <h1>Hotel Management System</h1>

        <button
          className="add-hotel-button"
          onClick={() => navigate("/hotels/add")}
        >
          + Add Hotel
        </button>
      </header>

      {/* Search / Filter */}
      <SearchFilter
        title={title}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onTitleChange={setTitle}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onSearch={handleSearch}
        onClear={handleClear}
      />

      {/* Loading */}
      {loading && (
        <p className="status-message">
          Loading hotels...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="status-message error">
          {error}
        </p>
      )}

      {/* Hotels */}
      {!loading && !error && (
        <>
          {hotels.length === 0 ? (
            <p className="status-message">
              No hotels found.
            </p>
          ) : (
            <div className="hotel-list">
              {hotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onDeleted={handleDeleted}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            offset={offset}
            limit={limit}
            total={pagination.total}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default HotelList;