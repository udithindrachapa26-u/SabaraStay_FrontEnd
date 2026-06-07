import { color } from "framer-motion";

function PhoneIcon() {
  return (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 2.11h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}


export default function Footer() {
  return (
    <footer className="bg-[#111d35] text-white py-16">
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
            <li className="flex items-center">
              <PhoneIcon />
              <span className="ml-2">+94 71 234 5678</span>
            </li>
            <li className="flex items-center">
              <MapPinIcon />
              <span className="ml-2">Colombo, Sri Lanka</span>
            </li>
            <li className="flex items-center">
              <MailIcon />
              <span className="ml-2">sabrastay@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Email */}
        <div>
          <h4 className="font-semibold mb-3">Email Us</h4>
          <input
            className="w-full mb-3 px-3 py-2 rounded text-white text-sm"
            placeholder="Your email" style={{ backgroundColor: "rgba(255, 255, 255, .1)", forcedbordercolor: "rgba(255, 255, 255, .4)" }}
          />
          <textarea
            className="w-full mb-3 px-3 py-2 rounded text-white text-sm"
            placeholder="Message" style={{ backgroundColor: "rgba(255, 255, 255, .1)", forcedbordercolor: "rgba(255, 255, 255, .4)" }}
          />
          <button className="bg-yellow-400 text-black px-4 py-2 rounded text-sm font-semibold">
            Send
          </button>
        </div>

      </div>
    </footer>
  );
}
