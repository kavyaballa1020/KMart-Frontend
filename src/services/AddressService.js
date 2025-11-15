// src/services/addressService.js
import axios from "axios";

const API_URL = "http://localhost:8085/api/addresses";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export const getAddresses = () => axiosInstance.get("");
export const addAddress = (data) => axiosInstance.post("", data);
export const updateAddress = (id, data) => axiosInstance.put(`/${id}`, data);
export const deleteAddress = (id) => axiosInstance.delete(`/${id}`);
export const setDefaultAddress = (id) => axiosInstance.put(`/default/${id}`);
