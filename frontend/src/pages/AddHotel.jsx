import { useNavigate } from "react-router-dom";
import HotelForm from "../components/HotelForm";
import { createHotel } from "../services/hotelApi";

function AddHotel() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const data = new FormData();

      data.append("image", formData.image);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("latitude", formData.latitude);
      data.append("longitude", formData.longitude);
      data.append("price", formData.price);

      await createHotel(data);

      alert("Hotel added successfully!");

      navigate("/");
    } catch (error) {
      console.error("Failed to add hotel:", error);

      alert(
        error.response?.data?.message ||
          "Failed to add hotel"
      );
    }
  };

  return <HotelForm onSubmit={handleSubmit} />;
}

export default AddHotel;