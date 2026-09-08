import { useState } from 'react';
import styles from './NavBar.module.css';
import { getImageUrl } from '../utils';

/* Navigation configuration is owned by App and kept internal to the portfolio. */
/* eslint-disable react/prop-types */
export const NavBar = ({ activeSection, sections, onSectionChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const selectSection = (section) => {
    onSectionChange(section);
    setMenuOpen(false);
  };

  return (
    <nav className={styles.navbar} aria-label="Primary">
      <button
        className={styles.title}
        type="button"
        aria-label="Home"
        aria-current={activeSection === 'home' ? 'page' : undefined}
        onClick={() => selectSection('home')}
      >
        <img src={getImageUrl('batsymbol.png')} alt="" aria-hidden="true" />
      </button>

      <div className={styles.menu}>
        <button
          className={styles.menuBtn}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="primary-menu"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <img
            src={getImageUrl(menuOpen ? 'closeIcon.png' : 'burgerMenu.png')}
            alt=""
            aria-hidden="true"
          />
        </button>

        <ul
          id="primary-menu"
          className={`${styles.menuItems} ${menuOpen ? styles.menuOpen : ''}`}
        >
          {Object.entries(sections)
            .filter(([section]) => section !== 'home')
            .map(([section, { label }]) => (
            <li key={section}>
              <button
                className={activeSection === section ? styles.activeSection : ''}
                type="button"
                aria-current={activeSection === section ? 'page' : undefined}
                onClick={() => selectSection(section)}
              >
                {label}
              </button>
            </li>
            ))}
        </ul>

        <div className={styles.icons}>
          <a
            href="https://www.linkedin.com/in/aman-prakash-aa48b421b/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <img src={getImageUrl('LinkedIn.png')} alt="" decoding="async" />
          </a>
          <a
            href="https://github.com/AmanPrakash09"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <img src={getImageUrl('GitHub.png')} alt="" decoding="async" />
          </a>
          <a href="mailto:apraka01@student.ubc.ca" aria-label="Email Aman">
            <img src={getImageUrl('Mail.png')} alt="" decoding="async" />
          </a>
        </div>
      </div>
    </nav>
  );
};
