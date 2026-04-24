import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-gray-100">

      {/* 🔹 HERO SECTION */}
      <div className="relative h-[90vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1568605114967-8130f3a36994')",
        }}
      >
        <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            FIND the best stay
          </h1>
          <p className="mb-6 text-center">
            Discover comfortable boarding places near you
          </p>

          {/* SEARCH BOX */}
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-3xl text-gray-800 grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Location"
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Max Price"
              className="border p-2 rounded"
            />
            <select className="border p-2 rounded">
              <option>Male</option>
              <option>Female</option>
              <option>Any</option>
            </select>
            <button className="bg-yellow-400 font-semibold rounded hover:bg-yellow-500">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 WHY US */}
      <section className="py-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">Why Us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 max-w-6xl mx-auto">
          {[
            "Affordable Prices",
            "Verified Places",
            "Near Universities",
            "24/7 Support",
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg text-center shadow"
            >
              <div className="text-3xl mb-3">🏠</div>
              <p className="font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 STAYS FOR YOU */}
      <section className="py-12 bg-blue-900 text-white">
        <h2 className="text-3xl font-bold text-center mb-8">
          Stays for you
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white text-gray-800 rounded-lg shadow">
              <img
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
                alt="boarding"
                className="h-48 w-full object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">Single Room</h3>
                <p className="text-sm text-gray-600">Near Sabaragamuwa Uni</p>
                <p className="font-semibold mt-2">LKR 15,000 / month</p>
                <button className="mt-3 bg-blue-800 text-white px-4 py-1 rounded hover:bg-blue-700">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 BOARDING FACILITIES */}
      <section className="py-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">
          Boarding facilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto">
          {["Free WiFi", "Water & Electricity", "Secure Area"].map(
            (facility, index) => (
              <div
                key={index}
                className="bg-gray-100 p-6 rounded-lg text-center shadow"
              >
                <div className="text-3xl mb-3">✔</div>
                <p className="font-semibold">{facility}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* 🔹 FOOTER */}
      <footer className="bg-blue-900 text-white py-6">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">SabraStay</h3>
          <p className="text-sm">
            Find reliable boarding places in seconds
          </p>

          <div className="mt-4 space-x-4">
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;