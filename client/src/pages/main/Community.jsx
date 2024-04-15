import SideBar from "../../components/SideBar"
import Posts from "../../components/community/Posts"
import CreatePost from "../../components/modals/CreatePost";

const Community = () => {
  return (
    <>
      <SideBar>
        <section className="bg-base-100 overflow-auto max-h-screen">
          <Posts />
        </section>
        <div className="fixed bottom-10 right-10">
          <div className="tooltip" data-tip="Create Post">
            <CreatePost />
          </div>
        </div>
      </SideBar>
    </>
  )
}

export default Community