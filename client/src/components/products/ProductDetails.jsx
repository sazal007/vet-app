import { useEffect, useState } from "react"
import Footer from "../Footer"
import Navbar from "../Navbar"
import { useNavigate, useParams } from "react-router-dom"
import { getProductDetail } from "../../apis/e-commerce/productsApi"
import { useToast } from "../../context/toastProvider"
import { useCart } from "../../context/cartProvider"

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  let { id } = useParams();
  const { showToast } = useToast();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetail(id)
      .then(data => {
        if (!data) {
          showToast("Product not found", "error");
          navigate("/shop");
        }
        setProduct(data);
      })
      .catch(err => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


  return (
    <>
      <Navbar />
      <main>
        <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
          <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
            <img className="w-full" alt={product.name} src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}/${product.image}`} onError={e => e.target.src = "/no_image_found.png"} />
          </div>
          <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-8">
            <div className="border-b border-gray-200 pb-6 mt-6">
              {/* <p className="text-sm leading-none text-gray-600">{product.category?.category_name}</p> */}
              <h1
                className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
              >
                {product.product_name}
              </h1>
            </div>
            <div className="py-4 border-b border-gray-200 flex items-center justify-between">
              <p className="text-base leading-4 text-gray-800">Category</p>
              <div className="flex items-center justify-center">
                {product.category?.category_name}
              </div>
            </div>
            <div>
              <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7">{product.description}</p>
              <p className="text-base leading-4 mt-7 text-gray-600">Product Code: {product._id}</p>
              <p className="text-base leading-4 mt-4 text-gray-600">Price: NRs. {product.price}</p>
            </div>
            <button className="btn btn-primary mt-6" onClick={() => addToCart(product)}>add to cart</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ProductDetails