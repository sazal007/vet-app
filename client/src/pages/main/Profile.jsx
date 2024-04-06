import { useEffect, useState } from "react";
import { getProfile } from "../../apis/petprofile/petsProfile";
import SideBar from "../../components/SideBar";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../apis/auth/userApi";
import PetProfileForm from "../../components/modals/PetProfileForm";
// import { ChatState } from "../../context/chatProvider";

const Profile = () => {
  // const { user } = ChatState();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(user) 
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    getProfile()
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logoutHandler = () => {
    logoutUser();
    navigate("/login");
  };

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();

    if (ageMonths < 0 || (ageMonths === 0 && today.getDate() < birthDate.getDate())) {
      ageYears--;
      ageMonths = 12 + ageMonths;
    }

    if (today.getDate() < birthDate.getDate()) {
      ageMonths--;
    }

    return `${ageYears} years and ${ageMonths} months`;
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
                      {
                        profile.map((p, i) => (
                          <li className="mb-2" key={i}><PetProfileForm headingText="Edit Profile" button1Text="Edit pet profile" button2Text="Edit" refreshProfile={fetchProfile} petId={p._id} initialPetName={p.pet_name} initialAge={p.age} initialSpecies={p.species} initialBreed={p.breed} initialGender={p.gender} initialBirthdate={p.birthdate} initialDescription={p.description} initialImage={p.image} isEditMode={true} /></li>
                        ))
                      }
                      {user.isDoctor === false && <Link to="/profile/register-as-vet"><li className="mb-2 cursor-pointer">Register as vet</li></Link>}
                      <li className="mb-2 cursor-pointer" onClick={logoutHandler}>Logout</li>
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
                        <p>Age: {calculateAge(p.birthdate)}</p>
                        <p>Gender: {p.gender}</p>
                        <p>Description: {p.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  // No Pet Profile Found, display a message and a button to create a profile
                  <div className="bg-base-200 shadow rounded-lg p-6 text-center">
                    <h2 className="text-xl font-bold mb-4">No Pet Profile Found</h2>
                    <p className="mb-4">Your pet&apos;s profile hasn&apos;t been created yet.</p>
                    <PetProfileForm headingText="Create Profile" button1Text="Create Profile" button2Text="Create" refreshProfile={fetchProfile} />
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