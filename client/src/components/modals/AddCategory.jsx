import { useRef, useState } from 'react';
import { addCategory, updateCategory } from '../../apis/e-commerce/productsApi';

// eslint-disable-next-line react/prop-types
const AddCategory = ({ headingText, button1Text, button2Text, isEditMode = false, initialCategoryName = '', categoryId = null, refreshCategories }) => {

  const modalRef = useRef(null);
  const [categoryName, setCategoryName] = useState(initialCategoryName);

  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  // Determine button class based on button1Text
  // eslint-disable-next-line react/prop-types
  const buttonClass = button1Text.toLowerCase() === 'edit' ? 'btn btn-accent' : 'btn btn-success';

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = isEditMode ? updateCategory(categoryId, categoryName) : addCategory(categoryName);
    // addCategory(categoryName)
    action
      .then(() => {
        closeModal();
        if (typeof refreshCategories === 'function') {
          refreshCategories(); // Call the passed method to refresh categories
        }
      }).catch(err => console.log(err));
  }

  return (
    <>
      <button className={buttonClass} onClick={openModal}>{button1Text}</button>
      <dialog id="categoryModal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
          <h1 className="text-xl text-center">{headingText}</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full mb-4">
              <label htmlFor="name" className="label">
                <span className="label-text text-gray-600">Category Name</span>
              </label>
              <input type="text" placeholder="Category Name" className="input input-bordered w-full" autoComplete="off" required value={categoryName} onChange={e => setCategoryName(e.target.value)} />
            </div>
            <div className='flex justify-end'>
              <button type="submit" className="btn btn-success">{button2Text}</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddCategory;
