export default function Footer() {
  return (
    <footer className="bg-[#0b2a55] text-white py-16">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo */}
        <div>
          <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mb-4">
            Logo
          </div>
          <h3 className="font-bold text-lg">SabraStay</h3>
        </div>

        {/* Site Map */}
        <div>
          <h4 className="font-semibold mb-3">Site Map</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Home</li>
            <li>Services</li>
            <li>Find Stays</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">Contact us</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>📞 +94 71 234 5678</li>
            <li>📍 Colombo, Sri Lanka</li>
            <li>✉️ sabrastay@gmail.com</li>
          </ul>
        </div>

        {/* Email */}
        <div>
          <h4 className="font-semibold mb-3">Email Us</h4>
          <input
            className="w-full mb-3 px-3 py-2 rounded text-black text-sm"
            placeholder="Your email"
          />
          <textarea
            className="w-full mb-3 px-3 py-2 rounded text-black text-sm"
            placeholder="Message"
          />
          <button className="bg-yellow-400 text-black px-4 py-2 rounded text-sm font-semibold">
            Send
          </button>
        </div>

      </div>
    </footer>
  );
}