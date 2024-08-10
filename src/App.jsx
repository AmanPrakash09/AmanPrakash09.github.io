import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { getImageUrl } from './utils'; // Importing the getImageUrl function

function App() {
  // Generate an array of stars
  const stars = Array.from({ length: 100 }, (_, i) => (
    <div
      key={i}
      className={styles.star}
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 2 + 1}s`,
      }}
    />
  ));

  // State to handle the UFO position
  const [ufoStyle, setUfoStyle] = useState({
    top: '50%',
    left: '-20%',
    transform: 'translate(-50%, -50%)',
  });

  useEffect(() => {
    const moveUFO = () => {
      const randomTop = Math.random() * 80 + 10; // UFO will fly between 10% and 90% of the screen height
      const randomLeft = Math.random() * 80 + 10; // UFO will fly between 10% and 90% of the screen width

      setUfoStyle({
        top: `${randomTop}%`,
        left: `${randomLeft}%`,
        transform: 'translate(-50%, -50%)',
      });
    };

    const interval = setInterval(moveUFO, 5000); // Move UFO every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className={styles.App}>
      <NavBar />
      <Hero />
      <Experience />
      <Projects />
      <div className={styles.stars}>{stars}</div> {/* Stars overlay for the entire app */}
      <img
        src={getImageUrl('ufo.png')} // Using the getImageUrl function for the UFO image
        alt="UFO"
        className={styles.ufo}
        style={ufoStyle}
      />
    </div>
  );
}

export default App;
