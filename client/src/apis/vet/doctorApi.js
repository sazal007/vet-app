import axios from "axios";

// export const getDoctor = async () => {};

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
