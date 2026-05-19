import { motion } from "framer-motion";

export default function BoardingFacilities() {
  return (
    <section className="bg-slate-100 py-20">
      <div className="max-w-7xl mx-auto px-8">

        {/* ===== TITLE ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Boarding Facilities
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm">
            From premium rooms to full-service amenities, we ensure a
            comfortable and memorable stay.
          </p>
        </motion.div>

        {/* ===== GRID ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:row-span-2"
          >
            <img
              src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
              alt="boarding"
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />
          </motion.div>

          {/* RIGHT SIDE */}
          <div className="grid grid-cols-2 gap-6 lg:col-span-2">

            <StatCard title="Total Rooms" value="120+" />
            <StatCard title="Reviews" value="3,500+" />
            <StatCard title="Boardings" value="280+" />

            {/* IMAGE BOX */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1586105251261-72a756497a11"
                alt="room"
                className="w-full h-full object-cover"
              />
            </motion.div>

          </div>
        </div>

        {/* ===== CTA ===== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-2xl md:text-4xl font-extrabold text-blue-900 leading-tight">
            Stop walking. Start searching. <br />
            Find available boarding places in seconds.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

/* ===== STAT CARD (built with AI support) ===== */
function StatCard({ title, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl p-6
                 flex flex-col items-center justify-center
                 shadow-md hover:shadow-xl transition"
    >
      <motion.h3
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-3xl md:text-4xl font-extrabold text-blue-900"
      >
        {value}
      </motion.h3>
      <p className="mt-2 text-gray-600 font-medium">{title}</p>
    </motion.div>
  );
}