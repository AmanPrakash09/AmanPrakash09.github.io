import jokerTauntSprites from '../../assets/background/joker_taunt.png';
import styles from './Background.module.css';

/* Joker is controlled by Batman's background encounter sequence. */
/* eslint-disable react/prop-types */
export function Joker({ jokerRef, visible, direction }) {
  return (
    <div
      ref={jokerRef}
      className={styles.joker}
      data-visible={visible}
      data-direction={direction}
      aria-hidden="true"
    >
      <span className={styles.jokerFrame}>
        <img className={styles.jokerSpriteSheet} src={jokerTauntSprites} alt="" />
      </span>
    </div>
  );
}
