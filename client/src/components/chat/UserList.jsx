// eslint-disable-next-line react/prop-types
const UserList = ({ user, handleFunction }) => {
  return (
    <>
      <div className="mb-0 my-4 p-3 flex items-center gap-3 rounded shadow-sm bg-base-100 cursor-pointer" onClick={handleFunction}>
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}/${user.pic}`} alt={user.name} onError={e => e.target.src = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} />
          </div>
        </div>
        <div>
          <div className="font-bold">{user.name}</div>
          <div className="text-sm opacity-50">{user.email}</div>
        </div>
      </div>
    </>
  )
}

export default UserList