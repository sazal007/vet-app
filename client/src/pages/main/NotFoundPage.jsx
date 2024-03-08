import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="container flex flex-col items-center justify-center px-5 text-gray-700 md:flex-row">
          <div className="max-w-md">
            <div className="text-5xl font-dark font-bold">404</div>
            <p
              className="text-2xl md:text-3xl font-light leading-normal"
            >Sorry we couldn&apos;t find this page. </p>
            <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>

            <Link to="/">
              <button className="btn btn-secondary px-4 inline py-2 text-sm font-medium leading-5 shadow transition-colors duration-150 border border-transparent rounded-lg">
                back to homepage
              </button>
            </Link>
          </div>
          <div className="max-w-lg">
            <img src="/lost.png" alt="Page Not Found" className="w-80 shadow-xl rounded-lg contrast-100 brightness-95" />
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage