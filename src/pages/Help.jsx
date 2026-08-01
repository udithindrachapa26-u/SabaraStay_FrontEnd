import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function Help() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.12),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] text-slate-100">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="inline-flex items-center rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-sm font-medium text-yellow-300 mb-4">
            Support Center
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Help & <span className="text-yellow-400">Support</span>
          </h1>
          <p className="text-slate-300 text-lg leading-8">
            Need help using the platform? Find clear answers to the most common
            questions below and get back to booking with confidence.
          </p>
        </div>

        <div className="grid gap-6 max-w-5xl">
          {[
            {
              title: "How do I book a boarding place?",
              text:
                "Login as a student, search for a boarding, and use the booking or appointment option on the boarding page.",
            },
            {
              title: "How do I list my property?",
              text:
                "Login as a boarding owner and click the “List Property” option to add your boarding details and photos.",
            },
            {
              title: "Who can I contact for support?",
              text:
                "Please contact our support team via email or phone during working hours for quick assistance.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_50px_rgba(2,6,23,0.35)] backdrop-blur-sm transition hover:-translate-y-1 hover:border-yellow-400/40"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-slate-400 leading-7">{item.text}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}