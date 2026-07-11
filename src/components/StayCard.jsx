import { Link } from "react-router-dom";

export default function StayCard({ boarding }) {
  const SERVER_URL = "http://localhost:5000";

  // If no boarding data is provided yet, render a beautiful pulse skeleton card
  if (!boarding) {
    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse min-h-[380px]">
        <div className="bg-gray-200 h-48 w-full" />
        <div className="p-5 space-y-4">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="space-y-2 pt-2">
            <div className="h-3 bg-gray-200 rounded w-5/6" />
            <div className="h-3 bg-gray-200 rounded w-4/6" />
          </div>
          <div className="pt-4 flex justify-between items-center">
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="h-8 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  // Resolve photo URL
  const imgUrl = boarding.photoPath
    ? (boarding.photoPath.startsWith("http://") || boarding.photoPath.startsWith("https://")
        ? boarding.photoPath
        : `${SERVER_URL}/${boarding.photoPath}`)
    : "https://images.unsplash.com/photo-1560185127-6d0d2b0e1f61?auto=format&fit=crop&w=600&q=80";

  // Build bullet amenities
  const amenities = [];
  if (boarding.freeWifi) amenities.push("Free Wi-Fi");
  if (boarding.attachedBathroom) amenities.push("Attached bathroom");
  if (boarding.parking) amenities.push("Parking space");
  if (boarding.kitchen) amenities.push("Kitchen access");

  return (
    <div
      className="group bg-white rounded-2xl shadow-md overflow-hidden flex flex-col justify-between
                 transform transition-all duration-300
                 hover:-translate-y-3 hover:shadow-2xl border border-gray-100"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-gray-100">
        <img
          src={imgUrl}
          alt={boarding.boardingName}
          className="w-full h-full object-cover
                     transition-transform duration-500
                     group-hover:scale-105"
        />

        <span
          className="absolute top-3 right-3 bg-white/95
                     rounded-full px-2.5 py-1 text-xs font-semibold shadow-md
                     text-slate-700 flex items-center gap-1"
        >
          📍 {boarding.distance ? `${boarding.distance} km` : "Near Campus"}
        </span>

        <span
          className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold shadow-md uppercase tracking-wider text-white ${
            boarding.availableSpace > 0 ? "bg-emerald-600/90" : "bg-rose-600/90"
          }`}
        >
          {boarding.availableSpace > 0 ? "Available" : "Fully Booked"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between text-gray-800 text-sm">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1">
              <span className="text-[10px] font-bold tracking-widest text-blue-700 uppercase bg-blue-50 px-2 py-0.5 rounded">
                {boarding.boardingType} stay
              </span>
              {!!boarding.shortTerm && (
                <span className="text-[10px] font-bold tracking-widest text-indigo-700 uppercase bg-indigo-50 px-2 py-0.5 rounded">
                  Short Term
                </span>
              )}
              {!!boarding.longTerm && (
                <span className="text-[10px] font-bold tracking-widest text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded">
                  Long Term
                </span>
              )}
              {!!boarding.forLecturers && (
                <span className="text-[10px] font-bold tracking-widest text-sky-700 uppercase bg-sky-50 px-2 py-0.5 rounded">
                  For Lecturers
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">
              {boarding.availableSpace} of {boarding.totalRooms} rooms left
            </span>
          </div>

          <h3 className="font-semibold text-base mt-2 line-clamp-1 group-hover:text-blue-900 transition-colors">
            {boarding.boardingName}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 mt-1 min-h-[32px]">
            {boarding.address}
          </p>

          {/* Features */}
          <ul className="mt-3 space-y-1 text-xs border-t border-gray-50 pt-2.5 min-h-[44px]">
            {amenities.slice(0, 2).map((amenity, index) => (
              <li key={index} className="text-emerald-700 font-medium flex items-center gap-1">
                ✔ {amenity}
              </li>
            ))}
            {amenities.length === 0 && (
              <li className="text-gray-400 italic">No amenities listed</li>
            )}
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <div>
            <p className="font-bold text-base text-blue-900">
              LKR {Number(boarding.price).toLocaleString()}
            </p>
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">
              per month
            </p>
          </div>

          <Link
            to={`/boarding/${boarding.boardingID}`}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
              boarding.availableSpace <= 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-700 text-white hover:bg-blue-800"
            }`}
          >
            {boarding.availableSpace <= 0 ? "Booked" : "Check availability"}
          </Link>
        </div>
      </div>
    </div>
  );
}