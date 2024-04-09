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

export const handleDocStatus = async (record, status) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/doctor//change-status`,
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
