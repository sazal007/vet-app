import AdminLayout from "../../components/adminLayout"
import AddCategory from "../../components/modals/AddCategory"
import AddProduct from "../../components/modals/AddProduct"

const Products = () => {
  return (
    <>
      <AdminLayout>
        <h1 className="mb-5 p-5 text-xl">Products</h1>
        <div role="tablist" className="tabs tabs-lifted">
          <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Catetories" checked />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div className="flex justify-end"><AddCategory headingText="Add Category" button1Text="Add Category" button2Text="Add" /></div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr className="hover">
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td><AddCategory headingText="Update Category" button1Text="Edit" button2Text="Update" /> <button className="btn btn-error">Delete</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Products" />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div className="flex justify-end"><AddProduct headingText="Add Product" button1Text="Add Product" button2Text="Add" /></div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr className="hover">
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                    <td>Blue</td>
                    <td>Blue</td>
                    <td><AddProduct headingText="Update Product" button1Text="Edit" button2Text="Update" /> <button className="btn btn-error">Delete</button></td>
                  </tr>
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