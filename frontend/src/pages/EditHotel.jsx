import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import HotelForm from "../components/HotelForm";
import {
  getHotelById,
  updateHotel,
} from "../services/hotelApi";

function EditHotel() {
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

  const handleSubmit = async (formData) => {
    try {
      const data = new FormData();

      // Only append image if user selected a new one
      if (formData.image) {
        data.append("image", formData.image);
      }

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("latitude", formData.latitude);
      data.append("longitude", formData.longitude);
      data.append("price", formData.price);

      await updateHotel(id, data);

      alert("Hotel updated successfully!");

      navigate("/");
    } catch (error) {
      console.error("Failed to update hotel:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update hotel"
      );
    }
  };

  if (loading) {
    return <h2>Loading hotel...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <HotelForm
      hotel={hotel}
      onSubmit={handleSubmit}
    />
  );
}

export default EditHotel;