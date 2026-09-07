import { useRef, useState } from 'react';
import batmanMeleeSprites from '../../assets/background/batman_melee.png';
import batmanSprites from '../../assets/background/batman_sprites.png';
import styles from './Background.module.css';
import { Joker } from './Joker';
import { useBatmanMovement } from './useBatmanMovement';

/* Refs are shared only within the background scene. */
/* eslint-disable react/prop-types */
export function Batman({ sceneRef, skylineRef }) {
  const batmanRef = useRef(null);
  const grappleLineRef = useRef(null);
  const jokerRef = useRef(null);
  const [motion, setMotion] = useState('grounded');
  const [direction, setDirection] = useState('right');
  const [descent, setDescent] = useState(null);
  const [joker, setJoker] = useState({ visible: false, direction: 'left' });
  const activeSprites = motion === 'melee-attacking' ? batmanMeleeSprites : batmanSprites;

  useBatmanMovement({
    batmanRef,
    grappleLineRef,
    jokerRef,
    sceneRef,
    skylineRef,
    setMotion,
    setDirection,
    setDescent,
    setJoker,
  });

  return (
    <>
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
          <img className={styles.batmanSpriteSheet} src={activeSprites} alt="" />
        </span>
      </div>
      <Joker jokerRef={jokerRef} visible={joker.visible} direction={joker.direction} />
    </>
  );
}
