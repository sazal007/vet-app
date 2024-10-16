import { useRef, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { createPost } from "../../apis/posts/postApis";

// eslint-disable-next-line react/prop-types
const CreatePost = () => {
  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const file_ref = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData(prevState => ({
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
    Object.entries(postData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (selectedFile) {
      formData.append("images", selectedFile);
    }

    const action = createPost(formData);
    action
      .then(() => {
        closeModal();
        setPostData({
          title: '',
          content: ''
        });
        setSelectedFile(null);
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <button className="w-[4rem] h-[4rem] btn btn-secondary btn-circle rounded-full cursor-pointer" onClick={openModal}><IoAddCircleOutline className="text-3xl" /></button>
      <dialog id="categoryModal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
          <h1 className="text-xl text-center">Create Post</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full mb-3">
              <label htmlFor="name" className="label">
                <span className="label-text text-gray-600">Title</span>
              </label>
              <input type="text" placeholder="Post Title" className="input input-bordered w-full" autoComplete="off" required value={postData.title} name="title" onChange={handleChange} />
            </div>
            <div className="form-control w-full mb-3">
              <label htmlFor="content" className="label">
                <span className="label-text text-gray-600">Content</span>
              </label>
              <textarea type="text" placeholder="Post Content" className="textarea textarea-bordered w-full" autoComplete="off" required value={postData.content} name="content" onChange={handleChange} />
            </div>
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text">Upload Image</span>
              </div>
              <input type="file" multiple className="file-input file-input-bordered w-full mb-4" ref={file_ref} onChange={handleFileChange} />
            </div>
            <div className='flex justify-end'>
              <button type="submit" className="btn btn-success">Post</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default CreatePost