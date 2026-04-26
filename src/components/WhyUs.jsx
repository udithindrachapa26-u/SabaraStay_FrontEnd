export default function WhyUs() {
  const items = [
    {
      icon: "💯",
      title: "100% Free",
      desc: "No hidden charges. Completely free service.",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: "⏰",
      title: "24/7 Service",
      desc: "Support available anytime you need.",
      color: "from-blue-400 to-indigo-500",
    },
    {
      icon: "🏠",
      title: "100+ Stays",
      desc: "Verified & trusted boarding places.",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: "⭐",
      title: "3k+ Reviews",
      desc: "Highly rated by real students.",
      color: "from-pink-400 to-rose-500",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-8">

        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Why choose <span className="text-yellow-500">SabraStay</span>?
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            We make finding boarding places easier, safer and faster for
            students and lecturers.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="group backdrop-blur-xl bg-white/70 border border-white/30 rounded-2xl p-8 text-center shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 mx-auto flex items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-2xl shadow-md group-hover:scale-110 transition`}
              >
                {item.icon}
              </div>

              {/* Text */}
              <h3 className="mt-6 font-semibold text-lg text-gray-800">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}