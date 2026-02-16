import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="p-4 footer z-50">
      <div className="container-fluid">
        <div className="row">
          {/* Description */}
          <div className="col-6" id="f_descp">
            <h2>Manora</h2>
            <p>
              Manora connects everyday safety with personal storytelling. Users can document lost items, upload visual details, and store travel memories in organized galleries. Designed with secure access and dependable backend services, the platform ensures that both critical reports and cherished experiences are preserved with care.
            </p>
          </div>

          {/* About / Contact */}
          <div className="col-6 px-4" id="f_about_contact">
            <div className="row">
              <div className="col-4">
                <h4>About</h4>
                <div><a href="#">Contact Us</a></div>
                <div><a href="#">About Us</a></div>
                <div><a href="#">Tourist Stories</a></div>
              </div>

              <div className="col-4">
                <h4>Customer Policy</h4>
                <div><a href="#">Terms Of Use</a></div>
                <div><a href="#">Privacy</a></div>
                <div><a href="#">Security</a></div>
              </div>

              <div className="col-4">
                <h4>Registered Office</h4>
                <p>
                  Manora, Neerukonda, Mangalagiri Mandal
                  Guntur District, Mangalagiri,
                  Andhra Pradesh 522240
                </p>
                <p>
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
