import {
  BadgeCheck,
  Clock,
  Home,
  Star,
} from "lucide-react";

export default function WhyUs() {
  const items = [
    {
      icon: BadgeCheck,
      title: "100% Free",
      desc: "No hidden charges. Completely free service.",
      color: "from-yellow-400 via-orange-400 to-red-500",
    },
    {
      icon: Clock,
      title: "24/7 Service",
      desc: "Support available anytime you need.",
      color: "from-blue-400 via-indigo-400 to-violet-500",
    },
    {
      icon: Home,
      title: "100+ Stays",
      desc: "Verified & trusted boarding places.",
      color: "from-green-400 via-emerald-400 to-teal-500",
    },
    {
      icon: Star,
      title: "3k+ Reviews",
      desc: "Highly rated by real students.",
      color: "from-pink-400 via-rose-400 to-fuchsia-500",
    },
  ];

  const sliderItems = [...items, ...items];

  return (
    <section className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100 py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Why choose{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              SabraStay
            </span>
            ?
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            We make finding boarding places easier, safer and faster for
            students and lecturers.
          </p>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div className="flex gap-10 slider-track hover:[animation-play-state:paused]">
            {sliderItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="min-w-[300px] group relative rounded-3xl p-[1px] bg-gradient-to-br from-white/40 to-white/10 hover:from-white/70 hover:to-white/30 transition-all duration-500"
                >
                  {/* Card */}
                  <div className="rounded-3xl p-8 text-center bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">

                    {/* Icon */}
                    <div className="relative mx-auto w-20 h-20">
                      {/* Icon Container */}
                      <div
                        className={`relative w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                      >
                        <Icon className="w-9 h-9 text-white" strokeWidth={2.2} />
                      </div>
                    </div>

                    {/* Text */}
                    <h3 className="mt-7 font-semibold text-xl text-gray-800">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        .slider-track {
          width: max-content;
          animation: slide 28s linear infinite;
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