import Navbar from "../components/common/Navbar";
import WhyUs from "../components/WhyUs";
import StayCard from "../components/StayCard";
import BoardingFacilities from "../components/BoardingFacilities";
import Footer from "../components/common/Footer";

/*import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";*/

export default function Home() {
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
          <section className="flex justify-center gap-12 mt-10">
            {[
              { icon: "🛏️", label: "Short Term" },
              { icon: "🏠", label: "Long Term" },
              { icon: "🎓", label: "For Lecturers" },
              { icon: "📍", label: "List Property" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center group cursor-pointer">
                <div className="w-16 h-16 bg-yellow-400 rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-105 transition">
                  {item.icon}
                </div>
                <span className="mt-3 text-sm font-medium opacity-90">
                  {item.label}
                </span>
              </div>
            ))}
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

            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                <select className="input">Make</select>
                <select className="input">Type</select>
                <select className="input">Gender</select>
                <select className="input">Distance</select>
                <input className="input" placeholder="Min Count" />
                <input className="input" placeholder="Max Count" />
                <input className="input" placeholder="Min Price" />
                <input className="input" placeholder="Max Price" />
              </div>

              <input className="input mt-4 w-full" placeholder="Place / Name" />

              <button className="mt-6 w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded-xl hover:bg-yellow-500 transition text-lg">
                🔍 Search Boarding
              </button>
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
            <StayCard />
            <StayCard />
            <StayCard />
            <StayCard />
          </div>

          <div className="flex justify-center mt-12"> 
            <button className="border border-white text-white px-8 py-2 rounded-lg hover:bg-white hover:text-[#173565] transition">
              View more
            </button>
          </div>
        </div>
      </section>
      <BoardingFacilities />
      {/* FOOTER */}
      <Footer />
    </div>
  );
}

/* ================= STAT CARD ================= */
/*function StatCard({ title, value, suffix }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center shadow-sm hover:shadow-md transition h-full"
    >
      <h3 className="text-4xl font-extrabold text-blue-900">
        {inView && <CountUp end={value} duration={2} separator="," />}
        {suffix}
      </h3>
      <p className="mt-2 text-gray-600 font-medium">{title}</p>
    </motion.div>
  );
}*/