import batmanSprites from '../../assets/background/batman_sprites.png';
import styles from './Background.module.css';

export function Batman() {
  return (
    <div className={styles.batman} aria-hidden="true">
      <img className={styles.batmanSpriteSheet} src={batmanSprites} alt="" />
    </div>
  );
}
