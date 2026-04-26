import { Link } from "react-router-dom";

export default function StayCard() {
  return (
    <div
      className="group bg-white rounded-2xl shadow-md overflow-hidden
                 transform transition-all duration-300
                 hover:-translate-y-3 hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1586105251261-72a756497a11"
          alt="boarding"
          className="w-full h-48 object-cover
                     transition-transform duration-500
                     group-hover:scale-110"
        />

        <span
          className="absolute top-3 right-3 bg-white/90
                     rounded-full px-2 py-1 text-sm shadow
                     transition group-hover:scale-110"
        >
          ❤️
        </span>
      </div>

      {/* Content */}
      <div className="p-5 text-gray-800 text-sm">
        <h3 className="font-semibold text-base">
          Jayami girl's boarding house
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-yellow-500">★★★★★</span>
          <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">
            8.2
          </span>
        </div>

        {/* Features */}
        <ul className="mt-3 space-y-1 text-xs">
          <li className="text-green-600">✔ No need key money</li>
          <li className="text-green-600">✔ Attached bathroom</li>
        </ul>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-base">LKR 45,000</p>
            <p className="text-gray-500 text-xs">3 bed rooms</p>
          </div>

          <Link
            to="/boarding/1"
            className="bg-blue-700 text-white px-4 py-2 rounded-lg text-xs
                      hover:bg-blue-800 transition"
          >
            Check availability
          </Link>
        </div>
      </div>
    </div>
  );
}