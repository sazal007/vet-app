import axios from "axios";

export const registerUser = (userData) => {
  return axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/user/register`, userData, {
      headers: {
        "Content-Type": "multipart/form-data", // Important when sending files
      },
    })
    .then((res) => res.data) // Axios automatically handles JSON parsing
    .catch((err) => console.log(err));
};
