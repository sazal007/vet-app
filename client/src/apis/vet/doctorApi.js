import axios from "axios";

export const getDoctors = async () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/doctor/all-doctors`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const registerAsVet = async (userData) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/doctor/register-doctor`,
      { ...userData },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getDoctorDetails = async () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/doctor/get-doctor`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSingleDoctor = async (id) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/doctor/get-single-doctor/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateDocDetails = async (id, formData) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/doctor/update-doctor`,
      { userId: id, ...formData },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const handleDocStatus = async (record, status) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/doctor/change-status`,
      { doctorId: record._id, userId: record.userId, status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getApprovedDoctors = async () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/doctor/approved-doctors`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
