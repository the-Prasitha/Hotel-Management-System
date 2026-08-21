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
  const [errors, setErrors] = useState({});

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

    // Remove error when user starts correcting the field
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Only JPG, PNG and WEBP images are allowed",
      }));

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "Image size must be less than 5MB",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));

    setErrors((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Hotel title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Hotel description is required";
    }

    if (formData.latitude === "") {
      newErrors.latitude = "Latitude is required";
    } else {
      const latitude = Number(formData.latitude);

      if (
        !Number.isFinite(latitude) ||
        latitude < -90 ||
        latitude > 90
      ) {
        newErrors.latitude =
          "Latitude must be between -90 and 90";
      }
    }

    if (formData.longitude === "") {
      newErrors.longitude = "Longitude is required";
    } else {
      const longitude = Number(formData.longitude);

      if (
        !Number.isFinite(longitude) ||
        longitude < -180 ||
        longitude > 180
      ) {
        newErrors.longitude =
          "Longitude must be between -180 and 180";
      }
    }

    if (formData.price === "") {
      newErrors.price = "Price is required";
    } else {
      const price = Number(formData.price);

      if (!Number.isFinite(price) || price < 0) {
        newErrors.price =
          "Price must be a valid non-negative number";
      }
    }

    // Image is required only when creating a hotel
    if (!hotel && !formData.image) {
      newErrors.image = "Hotel image is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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

        {errors.image && (
          <span className="form-error">
            {errors.image}
          </span>
        )}

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

        {errors.title && (
          <span className="form-error">
            {errors.title}
          </span>
        )}
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

        {errors.description && (
          <span className="form-error">
            {errors.description}
          </span>
        )}
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

          {errors.latitude && (
            <span className="form-error">
              {errors.latitude}
            </span>
          )}
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

          {errors.longitude && (
            <span className="form-error">
              {errors.longitude}
            </span>
          )}
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

        {errors.price && (
          <span className="form-error">
            {errors.price}
          </span>
        )}
      </div>

      <button type="submit">
        {hotel ? "Update Hotel" : "Add Hotel"}
      </button>
    </form>
  );
}

export default HotelForm;