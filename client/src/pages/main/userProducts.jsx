import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import ProductCard from "../../components/products/ProductCard"
import ProductSideBar from "../../components/products/ProductSideBar"

const UserProducts = () => {
  return (
    <>
      <Navbar />
      <ProductSideBar>
        <ProductCard />
      </ProductSideBar>
      <Footer />
    </>
  )
}

export default UserProducts