import React, { useState, useEffect } from 'react';
import styles from "./Navbar.module.css";
import { getImageUrl } from "../utils";

export const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [navBar, setNavBar] = useState(false);
    const [isFixed, setIsFixed] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 650) {
            setNavBar(true);
            setIsFixed(true);
        } else {
            setNavBar(false);
            setIsFixed(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeBackground);
        return () => {
            window.removeEventListener('scroll', changeBackground);
        }
    }, []);

    return (
        <>
            {isFixed && <div className={styles.placeholder}></div>}
            <nav className={`${styles.navbar} ${navBar ? styles.active : ''} ${isFixed ? styles.fixed : ''}`}>
                <a className={styles.title} href="/">
                    Aman Prakash
                </a>
                <div className={styles.menu}>
                    <img
                        className={styles.menuBtn}
                        src={menuOpen ? getImageUrl("closeIcon.png") : getImageUrl("menuIcon.png")}
                        alt="menu-button"
                        onClick={() => setMenuOpen(!menuOpen)}
                    />
                    <ul
                        className={`${styles.menuItems} ${menuOpen ? styles.menuOpen : ''}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        {/* <li>
                            <a href="#about">About</a>
                        </li> */}
                        <li>
                            <a href="#experience">Experience</a>
                        </li>
                        <li>
                            <a href="#projects">Projects</a>
                        </li>
                    </ul>
                    <div className={styles.icons}>
                        <a href="https://www.linkedin.com/in/aman-prakash-aa48b421b/" target="_blank" rel="noopener noreferrer">
                            <img src={getImageUrl("LinkedIn.png")} alt="LinkedIn" />
                        </a>
                        <a href="https://github.com/AmanPrakash09" target="_blank" rel="noopener noreferrer">
                            <img src={getImageUrl("GitHub.png")} alt="GitHub" />
                        </a>
                        <a href="mailto:apraka01@student.ubc.ca">
                            <img src={getImageUrl("Mail.png")} alt="Mail" />
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
};
