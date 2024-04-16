import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const ProductSideBar = ({ children, categories, onCategorySelect, onPriceChange, priceFilter }) => {
  const handlePriceChange = (key, value) => {
    onPriceChange({ ...priceFilter, [key]: value });
  };
  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="sidebar bg-base-200 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out border-r-2 border-r-black/10 border-t-2 border-t-black/10 border-b-2 border-b-black/10">
          {/* Sidebar content */}
          <div>
            <Link className="px-4 text-xl font-semibold font-mono uppercase">Shop</Link>
          </div>
          <hr className="border-black/35" />
          {/* Category filter */}
          <div>
            <p className="text-md font-semibold uppercase cursor-pointer" onClick={() => onCategorySelect('all')}>Categories</p>
            <ul className="menu">
              {categories.map(category => (
                <li key={category._id} onClick={() => onCategorySelect(category._id)} className="hover:bg-base-300 text-md">
                  <a>{category.category_name}</a>
                </li>
              ))}
            </ul>
          </div>
          {/* Price filter */}
          <div className="mt-4">
            <h4 className="text-md font-semibold uppercase">Filter by Price</h4>
            <div className="my-2 mx-5">
              <input
                type="number"
                placeholder="Min Price"
                value={priceFilter.min || ""}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="input input-bordered w-40 h-10"
              />
            </div>
            <div className="mb-4 mx-5">
              <input
                type="number"
                placeholder="Max Price"
                value={priceFilter.max || ""}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="input input-bordered w-40 h-10"
              />
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="main flex-1">
          <div className="py-4 px-4">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductSideBar