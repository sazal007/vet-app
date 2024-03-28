import UserSearch from "./UserSearch"

const Chats = () => {
  return (
    <>
      <main className="h-[100vh] w-[22rem] p-3 bg-base-200 border-r-2 border-r-black/10">
        <UserSearch />
        <section>
          <div className="mx-2 my-4">
            <h2 className="text-lg">Messages</h2>
          </div>
          <div>
            <hr className="border-black/30" />
            <div className="mx-2 my-4">
              <p>sf</p>
            </div>
            <hr className="border-black/30" />
          </div>
        </section>
      </main>
    </>
  )
}

export default Chats