import { useRef, useState } from "react";
import { createProfile, updateProfile } from "../../apis/petprofile/petsProfile";


// eslint-disable-next-line react/prop-types
const PetProfileForm = ({ headingText, button1Text, button2Text, isEditMode = false, refreshProfile, petId = null, initialPetName, initialAge, initialSpecies, initialBreed, initialGender, initialBirthdate, initialDescription, }) => {
  const modalRef = useRef(null);
  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    let month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  // Determine button class based on button1Text
  // eslint-disable-next-line react/prop-types
  const buttonClass = button1Text.toLowerCase() === 'edit' ? 'btn btn-accent' : '';

  const [profileData, setProfilData] = useState({
    pet_name: initialPetName,
    species: initialSpecies,
    breed: initialBreed,
    age: initialAge,
    gender: initialGender,
    description: initialDescription,
    birthdate: formatDate(initialBirthdate),
  })
  const [selectedFile, setSelectedFile] = useState(null);
  const file_ref = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfilData(prevState => ({
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
    Object.entries(profileData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    const action = isEditMode ? updateProfile(petId, formData) : createProfile(formData);
    action
      .then(() => {
        closeModal();
        setProfilData({
          pet_name: '',
          species: '',
          breed: '',
          age: '',
          gender: '',
          description: '',
          birthdate: '',
        });
        setSelectedFile(null);
        refreshProfile?.();
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
            {/* Pet Name Input */}
            <div className="form-control w-full mb-1">
              <label htmlFor="pet_name" className="label">
                <span className="label-text text-gray-600">Pet Name</span>
              </label>
              <input type="text" name="pet_name" placeholder="Pet Name" className="input input-bordered w-full max-w-xs" autoComplete="off" required value={profileData.pet_name} onChange={handleChange} />
            </div>

            {/* Species Select */}
            <div className="form-control w-full mb-1">
              <label htmlFor="species" className="label">
                <span className="label-text text-gray-600">Species</span>
              </label>
              <input type="text" name="species" placeholder="Species. eg: dog, cat" className="input input-bordered w-full max-w-xs" autoComplete="off" required value={profileData.species} onChange={handleChange} />
            </div>

            {/* Breed Input */}
            <div className="form-control w-full mb-1">
              <label htmlFor="breed" className="label">
                <span className="label-text text-gray-600">Breed</span>
              </label>
              <input type="text" name="breed" placeholder="Breed" className="input input-bordered w-full max-w-xs" autoComplete="off" required value={profileData.breed} onChange={handleChange} />
            </div>

            {/* Age Input */}
            <div className="form-control w-full mb-1">
              <label htmlFor="age" className="label">
                <span className="label-text text-gray-600">Age</span>
              </label>
              <input type="number" name="age" placeholder="Age" className="input input-bordered w-full max-w-xs" value={profileData.age || 0} onChange={handleChange} />
            </div>

            {/* Gender Select */}
            <div className="form-control w-full mb-1">
              <label htmlFor="gender" className="label">
                <span className="label-text text-gray-600">Gender</span>
              </label>
              <select name="gender" className="select select-bordered w-full max-w-xs" required value={profileData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Description Textarea */}
            <div className="form-control w-full mb-1">
              <label htmlFor="description" className="label">
                <span className="label-text text-gray-600">Description</span>
              </label>
              <textarea name="description" className="textarea textarea-bordered h-24 w-full max-w-xs" placeholder="Description" required value={profileData.description} onChange={handleChange}></textarea>
            </div>

            {/* Image File Input */}
            <label className="form-control w-full mb-1">
              <div className="label">
                <span className="label-text text-gray-600">Upload product picture</span>
              </div>
              <input type="file" className="file-input file-input-bordered w-full max-w-xs" accept="image/*" ref={file_ref} onChange={handleFileChange} />
            </label>

            {/* Birthdate Input */}
            <div className="form-control w-full mb-1">
              <label htmlFor="birthdate" className="label">
                <span className="label-text text-gray-600">Birthdate</span>
              </label>
              <input type="date" name="birthdate" className="input input-bordered w-full max-w-xs" required value={profileData.birthdate || ''} onChange={handleChange} />
            </div>
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

export default PetProfileForm