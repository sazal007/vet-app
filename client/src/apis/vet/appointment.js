import axios from "axios";

export const appointmentBooking = async (appointmentData) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const token = user?.token;
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/book-appointment`,
      appointmentData,
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

export const checkAvailability = async (data) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const token = user?.token;
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/check-availability`,
      data,
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
