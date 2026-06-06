import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold mb-6 text-yellow-400">
          How It Works
        </h1>

        <p className="text-slate-300 max-w-3xl mb-12">
          Our platform connects students with safe and affordable boarding
          places near universities, while allowing boarding owners to manage
          their properties easily.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Students */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">For Students</h2>
            <ol className="space-y-3 text-slate-300 list-decimal list-inside">
              <li>Create a student account or login</li>
              <li>Search boarding places near your university</li>
              <li>View details, prices, and facilities</li>
              <li>Book or schedule an appointment</li>
              <li>Add reviews after your stay</li>
            </ol>
          </div>

          {/* Owners */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">For Boarding Owners</h2>
            <ol className="space-y-3 text-slate-300 list-decimal list-inside">
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