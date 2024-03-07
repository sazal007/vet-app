import axios from "axios";

// Function to get categories
export const getCategories = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/category/get-category`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Function to add category
export const addCategory = async (category_name) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/category/add-category`,
      { category_name },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateCategory = async (id, category_name) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/category/update-category/${id}`,
      { category_name },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Function to delete category
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/category/delete-category/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Function to get products
export const getProducts = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/product/get-products`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
