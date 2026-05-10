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

  // duplicate items for seamless loop
  const sliderItems = [...items, ...items];

  return (
    <section className="bg-linear-to-b from-white to-gray-100 py-24 overflow-hidden">
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

        {/* Slider Wrapper */}
        <div className="relative overflow-hidden">
          <div className="flex gap-8 slider-track hover:[animation-play-state:paused]">
            {sliderItems.map((item, index) => (
              <div
                key={index}
                className="min-w-[280px] group backdrop-blur-xl bg-white/70 border border-white/30 rounded-2xl p-8 text-center shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 mx-auto flex items-center justify-center rounded-xl bg-linear-to-br ${item.color} text-2xl shadow-md transition duration-500 group-hover:scale-110 group-hover:shadow-xl`}
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

      </div>

      {/* Animation Styles */}
      <style jsx>{`
        .slider-track {
          width: max-content;
          animation: slide 25s linear infinite;
        }

        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}