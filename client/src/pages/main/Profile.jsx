import { useEffect, useState } from "react";
import { getProfile } from "../../apis/petprofile/petsProfile";
import SideBar from "../../components/SideBar";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../apis/auth/userApi";
// import { ChatState } from "../../context/chatProvider";

const Profile = () => {
  // const { user } = ChatState();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(user) 
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile()
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logoutHandler = () => {
    logoutUser();
    navigate("/login");
  };

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <>
      <SideBar>
        <main>
          <div className="container mx-auto py-8">
            <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
              <div className="col-span-4 sm:col-span-3">
                <div className="bg-base-200 shadow rounded-lg p-6">
                  <div className="flex flex-col items-center">
                    <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}/${user.pic}`} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" onError={e => e.target.src = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}>
                    </img>
                    <h1 className="text-xl font-bold">{`${user.isDoctor ? "Dr. " : ""}${user.name}`}</h1>
                    <p className="text-gray-700">{user.email}</p>
                  </div>
                  <hr className="my-6 border-t border-gray-300" />
                  <div className="flex flex-col">
                    <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Settings</span>
                    <ul>
                      <li className="mb-2">Edit pet profile</li>
                      <li className="mb-2" onClick={logoutHandler}>Logout</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-span-4 sm:col-span-9">
                {Array.isArray(profile) && profile.length > 0 ? (
                  profile.map((p, i) => (
                    <div key={i} className="bg-base-200 shadow rounded-lg p-6 mb-4">
                      <h2 className="text-xl font-bold mb-4">About Pet</h2>
                      <div className="flex flex-row-reverse justify-around">
                        <img src={`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/${p.image}`} className="w-40 h-40 bg-gray-300 rounded-full mb-4 shrink-0" alt="Pet" />
                        <div>
                          <p>Pet name: {p.pet_name}</p>
                          <p>DOB: {new Date(p.birthdate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div>
                        <p>Species: {p.species}</p>
                        <p>Breed: {p.breed}</p>
                        <p>Age: {calculateAge(p.birthdate)} years</p>
                        <p>Gender: {p.gender}</p>
                        <p>Description: {p.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  // No Pet Profile Found, display a message and a button to create a profile
                  <div className="bg-base-200 shadow rounded-lg p-6 text-center">
                    <h2 className="text-xl font-bold mb-4">No Pet Profile Found</h2>
                    <p>Your pet&apos;s profile hasn&apos;t been created yet.</p>
                    {/* Adjust the Link to use the correct path to your pet profile creation page */}
                    <Link to="/create-pet-profile" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Create Pet Profile
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </SideBar>
    </>
  )
}

export default Profile