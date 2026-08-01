import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.12),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] text-slate-100">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="inline-flex items-center rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-sm font-medium text-yellow-300 mb-4">
            Simple Process
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            How <span className="text-yellow-400">SabraStay</span> works
          </h1>
          <p className="text-slate-300 text-lg leading-8">
            Our platform connects students with safe and affordable boarding places near universities while helping owners manage their properties efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_50px_rgba(2,6,23,0.35)] backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-white">For Students</h2>
            <ol className="space-y-4 text-slate-300 list-decimal list-inside leading-7">
              <li>Create a student account or login</li>
              <li>Search boarding places near your university</li>
              <li>View details, prices, and facilities</li>
              <li>Book or schedule an appointment</li>
              <li>Add reviews after your stay</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_50px_rgba(2,6,23,0.35)] backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-white">For Boarding Owners</h2>
            <ol className="space-y-4 text-slate-300 list-decimal list-inside leading-7">
              <li>Register as a boarding owner</li>
              <li>List your boarding property</li>
              <li>Upload photos and facilities</li>
              <li>Manage bookings and appointments</li>
              <li>Respond to student reviews</li>
            </ol>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}