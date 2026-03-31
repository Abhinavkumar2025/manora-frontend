import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="p-4 sm:p-8 footer z-50">
      <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4">
          {/* Description */}
          <div className="w-full md:w-1/2" id="f_descp">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Manora</h2>
            <p className="text-sm sm:text-base leading-relaxed text-left">
              Manora connects everyday safety with personal storytelling. Users can document lost items, upload visual details, and store travel memories in organized galleries. Designed with secure access and dependable backend services, the platform ensures that both critical reports and cherished experiences are preserved with care.
            </p>
          </div>

          {/* About / Contact */}
          <div className="w-full md:w-1/2" id="f_about_contact">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4">
              <div>
                <h4 className="font-bold mb-2 sm:mb-4 text-sm sm:text-base">About</h4>
                <div className="text-sm sm:text-base mb-1"><a href="#">Contact Us</a></div>
                <div className="text-sm sm:text-base mb-1"><a href="#">About Us</a></div>
                <div className="text-sm sm:text-base mb-1"><a href="#">Tourist Stories</a></div>
              </div>

              <div>
                <h4 className="font-bold mb-2 sm:mb-4 text-sm sm:text-base">Customer Policy</h4>
                <div className="text-sm sm:text-base mb-1"><a href="#">Terms Of Use</a></div>
                <div className="text-sm sm:text-base mb-1"><a href="#">Privacy</a></div>
                <div className="text-sm sm:text-base mb-1"><a href="#">Security</a></div>
              </div>

              <div>
                <h4 className="font-bold mb-2 sm:mb-4 text-sm sm:text-base">Registered Office</h4>
                <p className="text-sm sm:text-base mb-2">
                  Manora, Neerukonda, Mangalagiri Mandal
                  Guntur District, Mangalagiri,
                  Andhra Pradesh 522240
                </p>
                <p className="text-sm sm:text-base">
                  <b>Phone:</b> +91-863-16500 / 480-4988-6999
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
