import { useRef, useState } from 'react';
import batmanSprites from '../../assets/background/batman_sprites.png';
import styles from './Background.module.css';
import { useBatmanMovement } from './useBatmanMovement';

/* Refs are shared only within the background scene. */
/* eslint-disable react/prop-types */
export function Batman({ sceneRef, skylineRef }) {
  const batmanRef = useRef(null);
  const grappleLineRef = useRef(null);
  const [motion, setMotion] = useState('grounded');
  const [direction, setDirection] = useState('right');
  const [descent, setDescent] = useState(null);

  useBatmanMovement({
    batmanRef,
    grappleLineRef,
    sceneRef,
    skylineRef,
    setMotion,
    setDirection,
    setDescent,
  });

  return (
    <div
      ref={batmanRef}
      className={styles.batman}
      data-motion={motion}
      data-direction={direction}
      data-descent={descent ?? undefined}
      aria-hidden="true"
    >
      <span ref={grappleLineRef} className={styles.grappleLine} />
      <span className={styles.batmanFrame}>
        <img className={styles.batmanSpriteSheet} src={batmanSprites} alt="" />
      </span>
    </div>
  );
}
