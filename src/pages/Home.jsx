import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import { BedDouble, Home as HomeIcon, GraduationCap, MapPinPlus } from "lucide-react";

import Navbar from "../components/common/Navbar";
import WhyUs from "../components/WhyUs";
import StayCard from "../components/StayCard";
import BoardingFacilities from "../components/BoardingFacilities";
import Footer from "../components/common/Footer";

export default function Home() {
  const navigate = useNavigate();
  const [recentBoardings, setRecentBoardings] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  useEffect(() => {
    const fetchRecentBoardings = async () => {
      try {
        setLoadingRecent(true);
        const res = await api.get("/boardings/recent");
        setRecentBoardings(res.data);
      } catch (err) {
        console.error("Failed to load recent boardings:", err);
      } finally {
        setLoadingRecent(false);
      }
    };
    fetchRecentBoardings();
  }, []);

  const [filters, setFilters] = useState({
    q: "",
    boardingType: "",
    minPrice: "",
    maxPrice: "",
    minRooms: "",
    maxRooms: "",
    maxDistance: "",
    freeWifi: false,
    attachedBathroom: false,
    parking: false,
    kitchen: false,
  });

  const handleFilterChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const query = new URLSearchParams();

    if (filters.q.trim()) query.set("q", filters.q.trim());
    if (filters.boardingType) query.set("boardingType", filters.boardingType);
    if (filters.minPrice) query.set("minPrice", filters.minPrice);
    if (filters.maxPrice) query.set("maxPrice", filters.maxPrice);
    if (filters.minRooms) query.set("minRooms", filters.minRooms);
    if (filters.maxRooms) query.set("maxRooms", filters.maxRooms);
    if (filters.maxDistance) query.set("maxDistance", filters.maxDistance);
    if (filters.freeWifi) query.set("freeWifi", "true");
    if (filters.attachedBathroom) query.set("attachedBathroom", "true");
    if (filters.parking) query.set("parking", "true");
    if (filters.kitchen) query.set("kitchen", "true");

    const queryString = query.toString();
    navigate(`/search${queryString ? `?${queryString}` : ""}`);
  };

  const actions = [
    {
      icon: BedDouble,
      label: "Short Term",
      color: "from-indigo-400 to-violet-500",
    },
    {
      icon: HomeIcon,
      label: "Long Term",
      color: "from-emerald-400 to-teal-500",
    },
    {
      icon: GraduationCap,
      label: "For Lecturers",
      color: "from-sky-400 to-blue-500",
    },
    {
      icon: MapPinPlus,
      label: "Add Property",
      color: "from-yellow-400 to-orange-500",
      action: () => navigate("/list-property"),
    },
  ];

  return (
    <div className="font-sans overflow-x-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen overflow-hidden">

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1568605114967-8130f3a36994')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1f3a]/90 to-[#0b1f3a]/70" />

        {/* Hero Content */}
        <div className="relative z-10 text-white">
          <Navbar />

          {/* Categories */}
          <section className="flex justify-center gap-12 mt-14 flex-wrap">
            {[
              {
                icon: BedDouble,
                label: "Short Term",
                color: "from-indigo-400 to-violet-500",
              },
              {
                icon: HomeIcon,
                label: "Long Term",
                color: "from-emerald-400 to-teal-500",
              },
              {
                icon: GraduationCap,
                label: "For Lecturers",
                color: "from-sky-400 to-blue-500",
              },
              {
                icon: MapPinPlus,
                label: "Add Property",
                color: "from-yellow-400 to-orange-500",
                action: () => navigate("/list-property"),
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  onClick={item.action}
                  className="group cursor-pointer text-center"
                >
                  {/* Icon Card */}
                  <div className="relative mx-auto w-18 h-18 rounded-2xl p-[1px] bg-gradient-to-br from-white/40 to-white/10 group-hover:from-white/70 group-hover:to-white/30 transition-all duration-500">
                    <div className="w-18 h-18 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">

                      {/* Glow */}
                      <div
                        className={`absolute inset-2 rounded-xl bg-gradient-to-br ${item.color} blur-xl opacity-30 group-hover:opacity-60 transition duration-500`}
                      />

                      {/* Icon */}
                      <div
                        className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-500`}
                      >
                        <Icon className="w-7 h-7 text-white" strokeWidth={2.2} />
                      </div>
                    </div>
                  </div>

                  {/* Label */}
                  <span className="block mt-4 text-sm font-semibold text-gray-800 opacity-90 group-hover:opacity-100">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </section>

          {/* Hero Main */}
          <section className="max-w-7xl mx-auto px-10 mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl xl:text-6xl font-extrabold leading-tight">
                Find <br />
                the <span className="text-yellow-400">perfect</span> <br />
                place to stay
              </h2>
              <p className="mt-6 text-gray-200 max-w-md">
                Discover safe, affordable and comfortable boarding places near
                your university in seconds.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white/10 border border-white/20 p-8 shadow-2xl backdrop-blur-xl">
              <form onSubmit={handleSearch} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    name="q"
                    value={filters.q}
                    onChange={handleFilterChange}
                    className="input"
                    placeholder="Search by name, address or description"
                  />
                  <select
                    name="boardingType"
                    value={filters.boardingType}
                    onChange={handleFilterChange}
                    className="input"
                  >
                    <option value="">Any type</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      name="minPrice"
                      type="number"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="input"
                      placeholder="Min price"
                    />
                    <input
                      name="maxPrice"
                      type="number"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="input"
                      placeholder="Max price"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      name="minRooms"
                      type="number"
                      value={filters.minRooms}
                      onChange={handleFilterChange}
                      className="input"
                      placeholder="Min rooms"
                    />
                    <input
                      name="maxRooms"
                      type="number"
                      value={filters.maxRooms}
                      onChange={handleFilterChange}
                      className="input"
                      placeholder="Max rooms"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    name="maxDistance"
                    type="number"
                    step="0.1"
                    value={filters.maxDistance}
                    onChange={handleFilterChange}
                    className="input"
                    placeholder="Max distance (km)"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <label className="input flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="freeWifi"
                        checked={filters.freeWifi}
                        onChange={handleFilterChange}
                        className="h-4 w-4"
                      />
                      Free WiFi
                    </label>
                    <label className="input flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="attachedBathroom"
                        checked={filters.attachedBathroom}
                        onChange={handleFilterChange}
                        className="h-4 w-4"
                      />
                      Bathroom
                    </label>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="input flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="parking"
                      checked={filters.parking}
                      onChange={handleFilterChange}
                      className="h-4 w-4"
                    />
                    Parking
                  </label>
                  <label className="input flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="kitchen"
                      checked={filters.kitchen}
                      onChange={handleFilterChange}
                      className="h-4 w-4"
                    />
                    Kitchen
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-yellow-400 text-slate-950 font-semibold py-3 transition hover:bg-yellow-300"
                >
                  🔍 Search Boarding
                </button>
              </form>
            </div>
          </section>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <WhyUs />

      {/* ================= STAYS ================= */}
      <section className="bg-[#173565] py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-white text-2xl font-bold mb-10">
            Stays for you
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {loadingRecent ? (
              [...Array(4)].map((_, i) => <StayCard key={i} />)
            ) : recentBoardings.length === 0 ? (
              <p className="text-gray-300 text-center col-span-2 py-8">
                No recently added boarding places found.
              </p>
            ) : (
              recentBoardings.map((boarding) => (
                <StayCard key={boarding.boardingID} boarding={boarding} />
              ))
            )}
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={() => navigate("/search")}
              className="border border-white text-white px-8 py-2 rounded-lg hover:bg-white hover:text-[#173565] transition"
            >
              View more
            </button>
          </div>
        </div>
      </section>

      <BoardingFacilities />
      <Footer />
    </div>
  );
}