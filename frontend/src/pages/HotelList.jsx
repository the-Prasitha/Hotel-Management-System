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

  // Fetch hotels
  useEffect(() => {
    dispatch(
      fetchHotels({
        ...filters,
        offset: pagination.offset,
        limit: pagination.limit,
      })
    );
  }, [
    dispatch,
    filters,
    pagination.offset,
    pagination.limit,
  ]);

  // Search
  const handleSearch = () => {
    setFilters({
      title,
      minPrice,
      maxPrice,
    });
  };

  // Clear filters
  const handleClear = () => {
    setTitle("");
    setMinPrice("");
    setMaxPrice("");

    setFilters({
      title: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  // Pagination
  const handlePageChange = (newOffset) => {
    dispatch(
      fetchHotels({
        ...filters,
        offset: newOffset,
        limit: pagination.limit,
      })
    );
  };

  // After delete
  const handleDeleted = () => {
    dispatch(
      fetchHotels({
        ...filters,
        offset: pagination.offset,
        limit: pagination.limit,
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

      {/* Search & Filters */}
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

      {/* Hotel List */}
      {!loading && !error && (
        <>
          <div className="hotel-list">
            {hotels.length === 0 ? (
              <p className="status-message">
                No hotels found.
              </p>
            ) : (
              hotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onDeleted={handleDeleted}
                />
              ))
            )}
          </div>

          {/* Pagination */}
          <Pagination
            offset={pagination.offset}
            limit={pagination.limit}
            total={pagination.total}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default HotelList;