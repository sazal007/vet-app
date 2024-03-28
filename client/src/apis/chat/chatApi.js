import axios from "axios";

export const searchUser = async (searchUser) => {
  try {
    const token = localStorage.getItem("userInfo.token");
    console.log(token);
    const { response } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/user?search=${searchUser}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
