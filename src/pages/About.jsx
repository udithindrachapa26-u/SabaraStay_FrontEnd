import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold mb-6 text-yellow-400">
          About Us
        </h1>

        <div className="space-y-6 max-w-4xl text-slate-300">
          <p>
            Finding a safe and affordable boarding place near a university is a
            major challenge for many students. At the same time, boarding
            owners struggle to reach the right audience.
          </p>

          <p>
            Our platform bridges this gap by providing a centralized system
            where students can discover, compare, and book boarding places,
            while owners can manage their properties efficiently.
          </p>

          <p>
            This system is designed to improve transparency, safety, and
            convenience for both students and boarding owners.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
              <p>
                To simplify student accommodation searching through technology.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="font-semibold text-lg mb-2">Our Vision</h3>
              <p>
                To become the most trusted student housing platform in Sri Lanka.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}