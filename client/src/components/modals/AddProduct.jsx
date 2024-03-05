import { useRef } from "react";

// eslint-disable-next-line react/prop-types
const AddProduct = ({ headingText, button1Text, button2Text }) => {
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
  return (
    <>
      <button className={buttonClass} onClick={openModal}>{button1Text}</button>
      <dialog id="my_modal_3" className="modal" ref={modalRef}>
        <div className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
          <h1 className="text-xl text-center">{headingText}</h1>
          <form className="ml-16">
            {/* <!-- Name Input --> */}
            <div className="form-control w-full mb-1">
              <label htmlFor="name" className="label">
                <span className="label-text text-gray-600">Product Name</span>
              </label>
              <input type="text" id="name" name="name" placeholder="Product Name" className="input input-bordered w-full max-w-xs" autoComplete="off" required />
            </div>
            {/* <!-- Description Input --> */}
            <div className="form-control w-full mb-1">
              <label htmlFor="name" className="label">
                <span className="label-text text-gray-600">Description</span>
              </label>
              <textarea className="textarea textarea-bordered h-24 max-w-xs" placeholder="Product Description" required></textarea>
            </div>
            {/* <!-- Price Input --> */}
            <div className="form-control w-full mb-1">
              <label htmlFor="name" className="label">
                <span className="label-text text-gray-600">Price</span>
              </label>
              <input type="number" id="name" name="name" placeholder="Product Price" className="input input-bordered w-full max-w-xs" autoComplete="off" required />
            </div>
            {/* <!-- Image Input --> */}
            <label className="form-control w-full mb-1">
              <div className="label">
                <span className="label-text text-gray-600">Upload product picture</span>
              </div>
              <input type="file" className="file-input file-input-bordered w-full max-w-xs" accept="image/*" />
            </label>
            {/* <!-- Category Input --> */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Select Category</span>
              </div>
              <select className="select select-bordered">
                <option disabled defaultValue={'Categories'}>Categories</option>
                <option>Star Wars</option>
                <option>Harry Potter</option>
                <option>Lord of the Rings</option>
                <option>Planet of the Apes</option>
                <option>Star Trek</option>
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