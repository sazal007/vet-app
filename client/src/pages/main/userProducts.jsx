import { useEffect, useState } from "react"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import ProductCard from "../../components/products/ProductCard"
import ProductSideBar from "../../components/products/ProductSideBar"
import { getCategories, getProducts } from "../../apis/e-commerce/productsApi"

const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceFilter, setPriceFilter] = useState({ min: null, max: null });

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
  };

  const fetchCategories = async () => {
    const fetchedCategories = await getCategories();
    setCategories(fetchedCategories);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId === "all" ? null : categoryId);
  };

  const handlePriceChange = (filters) => {
    setPriceFilter(filters);
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory ? product.category._id === selectedCategory : true;
    const minPriceMatch = priceFilter.min ? product.price >= parseFloat(priceFilter.min) : true;
    const maxPriceMatch = priceFilter.max ? product.price <= parseFloat(priceFilter.max) : true;
    return categoryMatch && minPriceMatch && maxPriceMatch;
  });

  return (
    <>
      <Navbar />
      <ProductSideBar categories={categories} onCategorySelect={handleCategorySelect} onPriceChange={handlePriceChange} priceFilter={priceFilter}>
        <ProductCard products={filteredProducts} />
      </ProductSideBar>
      <Footer />
    </>
  )
}

export default UserProducts