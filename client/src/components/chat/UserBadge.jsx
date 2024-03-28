// eslint-disable-next-line react/prop-types
const UserBadge = ({ user, handleFunction }) => {
  return (
    <>
      <div className="ml-2 h-[25px] badge badge-outline gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current" onClick={handleFunction}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        {user.name}
      </div>
    </>
  )
}

export default UserBadge