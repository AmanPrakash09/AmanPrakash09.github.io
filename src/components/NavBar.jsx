import React, { useState, useEffect } from 'react';
import styles from "./Navbar.module.css";
import { getImageUrl } from "../utils";

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 1);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.active : ''}`}
      aria-label="Primary"
    >
      <a className={styles.title} href="#top">
        Aman Prakash
      </a>

      <div className={styles.menu}>
        <button
          className={styles.menuBtn}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="primary-menu"
          onClick={() => setMenuOpen(o => !o)}
          type="button"
        >
          <img
            src={menuOpen ? getImageUrl("closeIcon.png") : getImageUrl("menuIcon.png")}
            alt=""
            aria-hidden="true"
          />
        </button>

        <ul
          id="primary-menu"
          className={`${styles.menuItems} ${menuOpen ? styles.menuOpen : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
        </ul>

        <div className={styles.icons}>
          <a
            href="https://www.linkedin.com/in/aman-prakash-aa48b421b/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <img src={getImageUrl("LinkedIn.png")} alt="" loading="lazy" decoding="async" />
          </a>
          <a
            href="https://github.com/AmanPrakash09"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <img src={getImageUrl("GitHub.png")} alt="" loading="lazy" decoding="async" />
          </a>
          <a href="mailto:apraka01@student.ubc.ca" aria-label="Email Aman">
            <img src={getImageUrl("Mail.png")} alt="" loading="lazy" decoding="async" />
          </a>
        </div>
      </div>
    </nav>
  );
};
