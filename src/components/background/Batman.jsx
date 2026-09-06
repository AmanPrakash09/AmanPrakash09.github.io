import { useRef } from 'react';
import batmanSprites from '../../assets/background/batman_sprites.png';
import styles from './Background.module.css';
import { useBatmanMovement } from './useBatmanMovement';

/* Refs are shared only within the background scene. */
/* eslint-disable react/prop-types */
export function Batman({ sceneRef, skylineRef }) {
  const batmanRef = useRef(null);
  const grappleLineRef = useRef(null);

  useBatmanMovement({ batmanRef, grappleLineRef, sceneRef, skylineRef });

  return (
    <div ref={batmanRef} className={styles.batman} data-motion="grounded" aria-hidden="true">
      <span ref={grappleLineRef} className={styles.grappleLine} />
      <span className={styles.batmanFrame}>
        <img className={styles.batmanSpriteSheet} src={batmanSprites} alt="" />
      </span>
    </div>
  );
}
