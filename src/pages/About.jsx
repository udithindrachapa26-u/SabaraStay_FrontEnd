import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.12),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] text-slate-100">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="inline-flex items-center rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-sm font-medium text-yellow-300 mb-4">
            About SabraStay
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Connecting students and owners with <span className="text-yellow-400">confidence</span>
          </h1>
          <p className="text-slate-300 text-lg leading-8">
            Finding a safe and affordable boarding place near a university can be challenging. Our platform makes that journey simpler, faster, and more transparent.
          </p>
        </div>

        <div className="grid gap-6 max-w-5xl">
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_50px_rgba(2,6,23,0.35)] backdrop-blur-sm">
            <p className="text-slate-300 leading-8">
              We bridge the gap between students seeking comfortable accommodation and boarding owners who want to reach the right audience. By bringing everything into one trusted platform, we create a smoother experience for both sides.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-[0_20px_50px_rgba(2,6,23,0.25)] backdrop-blur-sm">
              <h3 className="font-semibold text-xl mb-3 text-white">Our Mission</h3>
              <p className="text-slate-400 leading-7">
                To simplify student accommodation searching through technology and make quality housing more accessible.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-[0_20px_50px_rgba(2,6,23,0.25)] backdrop-blur-sm">
              <h3 className="font-semibold text-xl mb-3 text-white">Our Vision</h3>
              <p className="text-slate-400 leading-7">
                To become the most trusted student housing platform in Sri Lanka by promoting transparency, safety, and convenience.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}