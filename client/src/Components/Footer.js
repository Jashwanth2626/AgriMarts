import React from "react";
import Logo from "../Assets/Bhoomii.png";
import { SiGithub } from "react-icons/si";
import { FaEnvelope,FaInstagram,FaFacebookF,FaTwitter,FaYoutube } from "react-icons/fa";


const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          {/* <a href="#home"> <img className="footlogo" src={Logo} alt="" /></a> */}
          <a href="#home" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img className="footlogo" src={Logo} alt="" />
            </a>
        </div>
        <div className="footer-icons">
          <a href="https://www.facebook.com/profile.php?id=61556619515489" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com/bhoomi_2024/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://twitter.com/Bhoomi2024" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://www.youtube.com/@Bhoomi2024" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <a href="#home" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ textDecoration: 'none' }}>
            <span>
              Home
              </span>
              </a>
                
              <span>Help</span>    

              <a href="#about" onClick={(e) => { e.preventDefault(); document.querySelector("#about").scrollIntoView({ behavior: "smooth" }); }} style={{ textDecoration: 'none' }}>
  <span>About us</span>
</a>

              <span>Share</span>    


            <a href="#service" onClick={(e) => { e.preventDefault(); document.querySelector("#service").scrollIntoView({ behavior: "smooth" }); }} style={{ textDecoration: 'none' }}>
            <span>Services</span>
            </a>
            
            <span>Connect</span>    

          <a href="#motive" onClick={(e) => { e.preventDefault(); document.querySelector("#motive").scrollIntoView({ behavior: "smooth" }); }} style={{ textDecoration: 'none' }}>
          <span>Motive</span>
          </a>


        </div>
        <div className="footer-section-columns">
          <span>More Queries</span>
          <span>jashwanthgowda23@gmail.com</span>
        </div>
        <div className="footer-section-columns1">
          <span> </span>
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
