import { Link } from "react-router-dom";
import { useCart } from "../../context/cartProvider";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const ProductCard = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  // Function to check if the product is new (added within the last two weeks)
  const isNew = (createdAt) => {
    const today = new Date();
    const productDate = new Date(createdAt);
    const twoWeeksAgo = new Date(today.setDate(today.getDate() - 14));
    return productDate > twoWeeksAgo;
  };

  // eslint-disable-next-line react/prop-types
  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-center p-4">
        <input
          type="text"
          className="input input-bordered input-primary w-1/2"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <main className="flex justify-center items-center gap-5 flex-wrap">
        {filteredProducts.map((product) => (
          <div className="card w-72 h-[29rem] bg-base-200 shadow-lg" key={product._id}>
            <figure className="h-52"><img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}/${product.image}`} alt={product.product_name} onError={e => e.target.src = "/no_image_found.png"} /></figure>
            <div className="card-body">
              <h2 className="card-title">
                {product.product_name}
                {isNew(product.createdAt) && <div className="badge badge-secondary">NEW</div>}
              </h2>
              <p>Nrs.{product.price}</p>
              {/* <p>{product.description}</p> */}
              <div className="card-actions justify-end">
                <div className="badge badge-outline">{product.category.category_name}</div>
              </div>
              <div className="card-actions justify-end mt-3">
                <Link to={`/shop/${product._id}`}><button className="btn btn-secondary">View</button></Link>
                <button className="btn btn-accent" onClick={() => addToCart(product)}>Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export default ProductCard;
