import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function Help() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold mb-6 text-yellow-400">
          Help & Support
        </h1>

        <p className="text-slate-300 mb-10 max-w-3xl">
          Need help using the platform? Find answers to common questions below.
        </p>

        <div className="space-y-6 max-w-4xl">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="font-semibold mb-2">
              How do I book a boarding place?
            </h3>
            <p className="text-slate-400">
              Login as a student, search for a boarding, and use the booking or
              appointment option on the boarding page.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="font-semibold mb-2">
              How do I list my property?
            </h3>
            <p className="text-slate-400">
              Login as a boarding owner and click the “List Property” option to
              add your boarding details and photos.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="font-semibold mb-2">
              Who can I contact for support?
            </h3>
            <p className="text-slate-400">
              Please contact our support team via email or phone during working
              hours.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}