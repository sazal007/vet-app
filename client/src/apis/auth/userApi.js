import axios from "axios";

// Function to register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/register`,
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Important when sending files
        },
      }
    );
    return response.data; // Return the response data for further processing
  } catch (err) {
    console.log(err);
    return { error: "Registration failed. Please try again later." };
  }
};

// Function to login user
export const loginUser = async (email, password) => {
  try {
    // Sending a POST request to the server endpoint for authentication
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/login`,
      {
        email,
        password,
      }
    );

    // If the request is successful, the server should respond with the user data and a token
    if (response.data) {
      // For example, you could store the received token in localStorage or cookies as per your application's requirements
      localStorage.setItem("userInfo", JSON.stringify(response.data));

      return response.data;
    }
  } catch (error) {
    // Handle errors, e.g., wrong credentials or server issues
    console.error("Login error:", error.response.data.message);
    throw new Error(error.response.data.message); // Rethrowing to handle it in the UI component
  }
};

export const isLoggedIn = () => {
  if (localStorage.getItem("userInfo")) {
    return JSON.parse(localStorage.getItem("userInfo"));
  } else {
    return false;
  }
};

// Function to logout user
export const logoutUser = () => {
  localStorage.removeItem("userInfo");
};

// Function to get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/user/get-all-user`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
