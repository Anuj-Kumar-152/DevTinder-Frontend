import { Link } from "react-router-dom";
import { FaWhatsapp, FaEnvelope, FaGithub } from "react-icons/fa"; 
import "./Footer.css";
 

const Footer = () => { 


    return (
        <footer className="footer">
            <nav className="footer-nav-links">
                <Link to="/aboutUs" className="link">About us</Link>
                <Link to="/contactUs" className="link">Contact</Link> 
                 
            </nav>
            <nav className="footer-social-icons">
                <a href="https://wa.me/7707069554" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp size={32} color="#0be059ff" />
                </a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kumaranuj7794@gmail.com&su=Hello&body=I%20want%20to%20connect%20with%20you" target="_blank" rel="noopener noreferrer">
                    <FaEnvelope size={32} color="#D44638" />
                </a>
                <a href="https://github.com/Anuj-Kumar-152" target="_blank" rel="noopener noreferrer">
                    <FaGithub size={32} color="#000000" />
                </a>
            </nav> 

            <aside className="footer-copyright">
                <p>Copyright © {new Date().getFullYear()} - All right reserved by DevTinder Pvt Ltd.</p>
            </aside>
        </footer>
    );
};

export default Footer;
