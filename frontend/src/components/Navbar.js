import React, { useState } from "react";
import Logo from "/Users/lkbalyan/Desktop/Ayush/UNDS Website/frontend/src/assets/UNDS-removebg-preview.png"
import "./Navbar.css";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="nike-navbar-wrapper">
            <nav className="nike-nav glass-morphism">
                <a href="/">
                    <img src={Logo} alt="Nike logo" className="nike-logo" />
                </a>
                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <a href="/" className="nav-link">HOME</a>
                    <a href="/view-all-watches" className="nav-link">WATCHES</a>
                    <a href="/view-all-sneakers" className="nav-link">SHOES</a>
                    <a href="#" className="nav-link">ABOUT US</a>

                </div>
                <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;