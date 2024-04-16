import { useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <section className="hero h-96 bg-primary">
        <div className="hero-overlay"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to Pawsitive Nepal</h1>
            <p className="mb-5">One stop solution for all your pet needs, from health care to supplies.</p>
            <button className="btn btn-primary" onClick={() => navigate('/appointments')}>Book Appointment</button>
            <button className="btn btn-secondary ml-2" onClick={() => navigate('/shop')}>Visit Store</button>
          </div>
        </div>
      </section>
      {/* E-commerce, Community, Appointment Scheduling */}
      <section className="py-12 h-72">
        <div className="container mx-auto my-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* E-commerce Feature */}
            <div className="feature-card">
              <h3 className="text-xl font-semibold mb-2">Pet Supplies Store</h3>
              <p>Explore our extensive range of pet products, including food, toys, and health supplies, all available online.</p>
            </div>
            {/* Community Feature */}
            <div className="feature-card">
              <h3 className="text-xl font-semibold mb-2">Pet Owner Community</h3>
              <p>Join our community to share, learn, and get support from other pet owners like you.</p>
            </div>
            {/* Appointment Scheduling Feature */}
            <div className="feature-card">
              <h3 className="text-xl font-semibold mb-2">Easy Appointment Booking</h3>
              <p>Book appointments with top veterinarians with just a few clicks. Ensure your pet always gets the care it needs.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="py-12 bg-base-200 h-96">
        <div className="container mx-auto my-20 text-center px-4">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="px-16 text-lg">We are dedicated to providing comprehensive care through our integrated platform that simplifies pet management by connecting you directly with veterinary services, a supportive community, and all the supplies your pet could ever need.</p>
        </div>
      </section>
      {/* Pet Care Tips */}
      <section className="py-12 bg-base-100 h-[27rem]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6">Pet Care Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {/* Pet Care Tip 1 */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title flex justify-center underline underline-offset-2">Healthy Diets</h3>
                <p>Ensure your pet is getting a balanced diet that meets all their nutritional needs. Consult with vets for the best advice.</p>
                <div className="card-actions justify-center">
                  <button className="btn btn-primary">Learn More</button>
                </div>
              </div>
            </div>

            {/* Pet Care Tip 2 */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title flex justify-center underline underline-offset-2">Regular Exercise</h3>
                <p>Regular walks and playtime are essential for your pet&apos;s physical health and emotional well-being.</p>
                <div className="card-actions justify-center">
                  <button className="btn btn-primary">Learn More</button>
                </div>
              </div>
            </div>

            {/* Pet Care Tip 3 */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title flex justify-center underline underline-offset-2">Routine Check-ups</h3>
                <p>Maintaining a schedule for regular veterinary check-ups can help prevent many diseases and detect others early.</p>
                <div className="card-actions justify-center">
                  <button className="btn btn-primary">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Home