import { useEffect, useState } from "react";
import AdminLayout from "../../components/adminLayout"
import AddCategory from "../../components/modals/AddCategory"
import AddProduct from "../../components/modals/AddProduct"
import { getCategories, getProducts } from "../../apis/e-commerce/productsApi";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getCategories()
      .then(data => setCategories(data))
      .catch(err => console.log(err));

    getProducts()
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <AdminLayout>
        <h1 className="mb-5 p-5 text-xl">Products</h1>
        <div role="tablist" className="tabs tabs-lifted">
          <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Catetories" defaultChecked />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div className="flex justify-end"><AddCategory headingText="Add Category" button1Text="Add Category" button2Text="Add" /></div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                {/* Table head */}
                <thead>
                  <tr>
                    <th>Sn</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody>
                  {categories && categories.map((category, index) => (
                    <tr className="hover" key={category._id}>
                      <th>{index + 1}</th>
                      <td>{category.category_name}</td>
                      <td className="flex gap-1">
                        <AddCategory headingText="Update Category" button1Text="Edit" button2Text="Update" />
                        <button className="btn btn-error">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Products" />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div className="flex justify-end"><AddProduct headingText="Add Product" button1Text="Add Product" button2Text="Add" /></div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* Table head */}
                <thead>
                  <tr>
                    <th>Sn</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody>
                  {
                    products && products.map((product, index) => (
                      <tr className="hover" key={product._id}>
                        <th>{index + 1}</th>
                        <td>{product.product_name}</td>
                        <td>{product.price}</td>
                        <td><img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}/${product.image}`} width={130} alt={product.product_name} onError={e => e.target.src = "/no_image_found.png"} /></td>
                        <td>{product.category}</td>
                        <td>{product.description}</td>
                        <td className="flex gap-1">
                          <AddProduct headingText="Update Product" button1Text="Edit" button2Text="Update" />
                          <button className="btn btn-error">Delete</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  )
}

export default Products