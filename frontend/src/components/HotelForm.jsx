import { useEffect, useState } from "react";

function HotelForm({ hotel, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    price: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (hotel) {
      setFormData({
        title: hotel.title || "",
        description: hotel.description || "",
        latitude: hotel.latitude || "",
        longitude: hotel.longitude || "",
        price: hotel.price || "",
        image: null,
      });

      if (hotel.image) {
        setPreview(`http://localhost:5000${hotel.image}`);
      }
    }
  }, [hotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form className="hotel-form" onSubmit={handleSubmit}>
      <h1>{hotel ? "Edit Hotel" : "Add Hotel"}</h1>

      <div className="form-group">
        <label>Image</label>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
        />

        {preview && (
          <img
            src={preview}
            alt="Hotel preview"
            className="image-preview"
          />
        )}
      </div>

      <div className="form-group">
        <label>Hotel Title</label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter hotel name"
        />
      </div>

      <div className="form-group">
        <label>Description</label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter hotel description"
          rows="5"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Latitude</label>

          <input
            type="number"
            step="any"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            placeholder="Latitude"
          />
        </div>

        <div className="form-group">
          <label>Longitude</label>

          <input
            type="number"
            step="any"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            placeholder="Longitude"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Price</label>

        <input
          type="number"
          min="0"
          step="0.01"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
        />
      </div>

      <button type="submit">
        {hotel ? "Update Hotel" : "Add Hotel"}
      </button>
    </form>
  );
}

export default HotelForm;