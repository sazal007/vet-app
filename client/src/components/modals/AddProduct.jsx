import { useEffect, useRef, useState } from "react";
import { addProduct, getCategories, updateProduct } from "../../apis/e-commerce/productsApi";

// eslint-disable-next-line react/prop-types
const AddProduct = ({ headingText, button1Text, button2Text, isEditMode = false, initialProductName = '', productId = null, refreshProducts, initialCategoryId, initialPrice, initialDescription }) => {

  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  // Determine button class based on button1Text
  // eslint-disable-next-line react/prop-types
  const buttonClass = button1Text.toLowerCase() === 'edit' ? 'btn btn-accent' : 'btn btn-success';

  const [productData, setProductData] = useState({
    product_name: initialProductName,
    description: initialDescription,
    price: initialPrice,
    category: initialCategoryId || ''
  });
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const category_ref = useRef();
  const file_ref = useRef();

  useEffect(() => {
    getCategories()
      .then(data => {
        setCategories(data);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    const action = isEditMode ? updateProduct(productId, formData) : addProduct(formData);
    action
      .then(() => {
        closeModal();
        setProductData({
          product_name: '',
          description: '',
          price: '',
          category: ''
        });
        setSelectedFile(null);
        refreshProducts?.();
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <button className={buttonClass} onClick={openModal}>{button1Text}</button>
      <dialog id="my_modal_3" className="modal" ref={modalRef}>
        <div className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
          <h1 className="text-xl text-center">{headingText}</h1>
          <form className="ml-16" onSubmit={handleSubmit}>
            {/* <!-- Name Input --> */}
            <div className="form-control w-full mb-1">
              <label htmlFor="name" className="label">
                <span className="label-text text-gray-600">Product Name</span>
              </label>
              <input type="text" name="product_name" placeholder="Product Name" className="input input-bordered w-full max-w-xs" autoComplete="off" required value={productData.product_name} onChange={handleChange} />
            </div>
            {/* <!-- Description Input --> */}
            <div className="form-control w-full mb-1">
              <label htmlFor="name" className="label">
                <span className="label-text text-gray-600">Description</span>
              </label>
              <textarea className="textarea textarea-bordered h-24 max-w-xs" name="description" placeholder="Product Description" required value={productData.description} onChange={handleChange}></textarea>
            </div>
            {/* <!-- Price Input --> */}
            <div className="form-control w-full mb-1">
              <label htmlFor="name" className="label">
                <span className="label-text text-gray-600">Price</span>
              </label>
              <input type="number" id="name" name="price" placeholder="Product Price" className="input input-bordered w-full max-w-xs" autoComplete="off" required value={productData.price} onChange={handleChange} />
            </div>
            {/* <!-- Image Input --> */}
            <label className="form-control w-full mb-1">
              <div className="label">
                <span className="label-text text-gray-600">Upload product picture</span>
              </div>
              <input type="file" className="file-input file-input-bordered w-full max-w-xs" accept="image/*" ref={file_ref} onChange={handleFileChange} />
            </label>
            {/* <!-- Category Input --> */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Select Category</span>
              </div>
              <select className="select select-bordered" name="category" required value={productData.category} ref={category_ref} onChange={handleChange}>
                {
                  categories && categories.map((category) => (
                    <option key={category._id} value={category._id}>{category.category_name}</option>
                  ))
                }
              </select>
            </label>
            {/* <!-- Submit Button --> */}
            <div className='flex justify-end'>
              <button type="submit" className="btn btn-success">{button2Text}</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default AddProduct