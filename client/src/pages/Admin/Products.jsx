import { useEffect, useState } from "react";
import AdminLayout from "../../components/adminLayout"
import AddCategory from "../../components/modals/AddCategory"
import AddProduct from "../../components/modals/AddProduct"
import { deleteCategory, deleteProduct, getCategories, getProducts } from "../../apis/e-commerce/productsApi";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = () => {
    getCategories()
      .then(data => setCategories(data))
      .catch(err => console.log(err));
  };

  const fetchProducts = () => {
    getProducts()
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  };

  const handleDeleteCategory = (id) => {
    deleteCategory(id)
      .then(() => {
        fetchCategories(); // Refresh categories after deletion
      })
      .catch(err => console.log(err));
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id)
      .then(() => {
        fetchProducts(); // Refresh products after deletion
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <AdminLayout>
        <h1 className="mb-5 p-5 text-xl">Products</h1>
        <div role="tablist" className="tabs tabs-lifted">
          {/* Tab 1 for categories */}
          <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Catetories" defaultChecked />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div className="flex justify-end"><AddCategory headingText="Add Category" button1Text="Add Category" button2Text="Add" refreshCategories={fetchCategories} /></div>
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
                        <AddCategory headingText="Update Category" button1Text="Edit" button2Text="Update" isEditMode={true}
                          initialCategoryName={category.category_name}
                          categoryId={category._id} refreshCategories={fetchCategories} />
                        <button className="btn btn-error" onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Tab 2 for products */}
          <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Products" />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div className="flex justify-end"><AddProduct headingText="Add Product" button1Text="Add Product" button2Text="Add" refreshProducts={fetchProducts} /></div>
            <div className="overflow-x-auto">
              <table className="table table-pin-cols table-pin-rows">
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
                        <td>{index + 1}</td>
                        <td>{product.product_name}</td>
                        <td>{product.price}</td>
                        <td><img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}/${product.image}`} width={130} alt={product.product_name} onError={e => e.target.src = "/no_image_found.png"} /></td>
                        <td>{product.category.category_name}</td>
                        <td>{product.description}</td>
                        <td className="flex gap-1 mt-10">
                          <AddProduct headingText="Update Product" button1Text="Edit" button2Text="Update" isEditMode={true} initialProductName={product.product_name} initialDescription={product.description} initialPrice={product.price} initialImage={product.image} productId={product._id} initialCategoryId={product.category._id} refreshProducts={fetchProducts} />
                          <button className="btn btn-error" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
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