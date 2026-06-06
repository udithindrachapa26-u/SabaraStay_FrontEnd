import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import api from "../api/axios";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [boardings, setBoardings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [photoIndices, setPhotoIndices] = useState({});

  useEffect(() => {
    const fetchBoardings = async () => {
      setLoading(true);
      setError("");

      try {
        const params = Object.fromEntries(searchParams.entries());
        const res = await api.get("/boardings", { params });
        const payload = res.data;
        console.debug("/boardings response:", payload);

        let items = [];
        if (Array.isArray(payload)) items = payload;
        else if (Array.isArray(payload.boardings)) items = payload.boardings;
        else if (Array.isArray(payload.data)) items = payload.data;
        else if (Array.isArray(payload.results)) items = payload.results;

        setBoardings(items);
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load search results."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBoardings();
  }, [searchParams]);

  const activeFilters = [];
  if (searchParams.get("q")) activeFilters.push(`Keyword: ${searchParams.get("q")}`);
  if (searchParams.get("boardingType"))
    activeFilters.push(`Type: ${searchParams.get("boardingType")}`);
  if (searchParams.get("minPrice"))
    activeFilters.push(`Min price: ${searchParams.get("minPrice")}`);
  if (searchParams.get("maxPrice"))
    activeFilters.push(`Max price: ${searchParams.get("maxPrice")}`);
  if (searchParams.get("minRooms"))
    activeFilters.push(`Min rooms: ${searchParams.get("minRooms")}`);
  if (searchParams.get("maxRooms"))
    activeFilters.push(`Max rooms: ${searchParams.get("maxRooms")}`);
  if (searchParams.get("maxDistance"))
    activeFilters.push(`Max distance: ${searchParams.get("maxDistance")}`);
  ["freeWifi", "attachedBathroom", "parking", "kitchen"].forEach((key) => {
    if (searchParams.get(key) === "true") {
      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (s) => s.toUpperCase());
      activeFilters.push(label);
    }
  });

  const SERVER_URL = "http://localhost:5000";

  // Helpers to support multiple backend field names
  const resolveImage = (b) => {
    if (!b) return null;
    if (Array.isArray(b.photos) && b.photos.length > 0) {
      const p = b.photos[0];
      if (p.startsWith("http://") || p.startsWith("https://")) return p;
      return `${SERVER_URL}/${p}`;
    }
    if (b.photoPath) {
      const p = b.photoPath;
      if (p.startsWith("http://") || p.startsWith("https://")) return p;
      return `${SERVER_URL}/${p}`;
    }
    if (b.imageUrl) return b.imageUrl;
    if (b.image) return b.image;
    if (b.img) return b.img;
    if (b.image_url) return b.image_url;
    if (b.imagePath) return b.imagePath;
    if (Array.isArray(b.images) && b.images.length) return b.images[0];
    return null;
  };

  const getPhotoGallery = (b) => {
    if (!b) return [];
    if (Array.isArray(b.photos) && b.photos.length > 0) {
      return b.photos.map((photo) => {
        if (photo.startsWith("http://") || photo.startsWith("https://")) return photo;
        return `${SERVER_URL}/${photo}`;
      });
    }
    if (b.photoPath) {
      const p = b.photoPath;
      if (p.startsWith("http://") || p.startsWith("https://")) return [p];
      return [`${SERVER_URL}/${p}`];
    }
    return [];
  };

  const resolveTitle = (b) => {
    if (!b) return "Boarding place";
    return (
      b.title || b.name || b.boardingName || b.boarding_name || b.placeName || b.place_name || b.name_en || "Boarding place"
    );
  };

  const resolveId = (b) => {
    return (
      b.id || b.boardingId || b.boardingID || b.boarding_id || b.placeId || b.placeID || b.place_id || null
    );
  };

  const resolvePrice = (b) => b.price || b.rent || b.cost || b.amount || null;

  const resolveRooms = (b) => b.rooms || b.totalRooms || b.total_rooms || b.room_count || null;

  return (
    <div className="font-sans overflow-x-hidden min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {activeFilters.length > 0 ? "Search Results" : "Recently Added Boardings"}
            </h1>
            <p className="mt-2 text-gray-600 max-w-2xl">
              {activeFilters.length > 0
                ? "Browse boarding places that match your search criteria."
                : "Showing the most recently added boarding places near Sabaragamuwa University."}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Back to home
            </button>
            <button
              type="button"
              onClick={() => navigate("/list-property")}
              className="rounded-full bg-blue-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
            >
              Add boarding
            </button>
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <span
                key={filter}
                className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-800"
              >
                {filter}
              </span>
            ))}
          </div>
        )}

        {loading && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-700 shadow-sm">
            Loading search results...
          </div>
        )}

        {error && (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center text-rose-700 shadow-sm">
            {error}
          </div>
        )}

        {!loading && !error && boardings.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-700 shadow-sm">
            {activeFilters.length > 0
              ? "No boarding places match your search filters. Try broadening your search."
              : "No boarding places have been added yet."}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {boardings.map((boarding) => {
            const gallery = getPhotoGallery(boarding);
            const currentPhotoIdx = photoIndices[resolveId(boarding)] || 0;
            const totalPhotos = gallery.length || 1;
            const img = gallery.length > 0 ? gallery[currentPhotoIdx] : resolveImage(boarding) || "https://images.unsplash.com/photo-1560185127-6d0d2b0e1f61";
            const title = resolveTitle(boarding);
            const id = resolveId(boarding);
            const price = resolvePrice(boarding);
            const rooms = resolveRooms(boarding);

            return (
              <div
                key={id || title}
                className="group overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-lg transition hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden bg-slate-200">
                  <img
                    src={img}
                    alt={`${title} - Photo ${currentPhotoIdx + 1}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  {gallery.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => setPhotoIndices({ ...photoIndices, [id]: (currentPhotoIdx - 1 + totalPhotos) % totalPhotos })}
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75 transition z-10"
                        aria-label="Previous photo"
                      >
                        ❮
                      </button>
                      <button
                        type="button"
                        onClick={() => setPhotoIndices({ ...photoIndices, [id]: (currentPhotoIdx + 1) % totalPhotos })}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75 transition z-10"
                        aria-label="Next photo"
                      >
                        ❯
                      </button>
                      <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white font-semibold">
                        {currentPhotoIdx + 1}/{totalPhotos}
                      </div>
                    </>
                  )}
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
                  <p className="mt-3 text-sm text-slate-600">{boarding.description || boarding.details || "No additional details available."}</p>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                    {(boarding.boardingType || boarding.type) && (
                      <span className="rounded-full bg-slate-100 px-3 py-1">{boarding.boardingType || boarding.type}</span>
                    )}
                    {price && <span className="rounded-full bg-slate-100 px-3 py-1">LKR {price}</span>}
                    {rooms && <span className="rounded-full bg-slate-100 px-3 py-1">{rooms} rooms</span>}
                  </div>

                  <div className="mt-4 grid gap-2 text-sm text-slate-700">
                    {boarding.freeWifi && <span>✔ Free Wifi</span>}
                    {boarding.attachedBathroom && <span>✔ Attached Bathroom</span>}
                    {boarding.parking && <span>✔ Parking</span>}
                    {boarding.kitchen && <span>✔ Kitchen</span>}
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="text-lg font-bold text-slate-900">LKR {price || "N/A"}</span>
                    <Link
                      to={`/boarding/${id || ""}`}
                      className="rounded-full bg-blue-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
