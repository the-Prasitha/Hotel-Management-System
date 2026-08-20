import axios from "axios";

const API_URL = "http://localhost:5000/api/hotels";

export const getHotels = async (params = {}) => {
  const response = await axios.get(API_URL, {
    params,
  });

  return response.data;
};

export const createHotel = async (formData) => {
  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateHotel = async (id, formData) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getHotelById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data;
};

export const deleteHotel = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data;
};