import jokerTauntSprites from '../../assets/background/joker_taunt.png';
import jokerSmokeSprites from '../../assets/background/joker_smoke.png';
import styles from './Background.module.css';

/* Joker is controlled by Batman's background encounter sequence. */
/* eslint-disable react/prop-types */
export function Joker({ jokerRef, visible, smokeVisible, direction }) {
  return (
    <div
      ref={jokerRef}
      className={styles.joker}
      data-visible={visible}
      data-smoke-visible={smokeVisible}
      data-direction={direction}
      aria-hidden="true"
    >
      <span className={styles.jokerSmoke}>
        <img className={styles.jokerSmokeSpriteSheet} src={jokerSmokeSprites} alt="" />
      </span>
      <span className={styles.jokerFrame}>
        <img className={styles.jokerSpriteSheet} src={jokerTauntSprites} alt="" />
      </span>
    </div>
  );
}
