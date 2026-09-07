import jokerDamageCollapseSprites from '../../assets/background/joker_damage_collapse.png';
import jokerDamageFallSprites from '../../assets/background/joker_damage_fall.png';
import jokerDamageHitSprites from '../../assets/background/joker_damage_hit.png';
import jokerTauntSprites from '../../assets/background/joker_taunt.png';
import jokerSmokeSprites from '../../assets/background/joker_smoke.png';
import styles from './Background.module.css';

const damageSprites = {
  hit: jokerDamageHitSprites,
  collapse: jokerDamageCollapseSprites,
  falling: jokerDamageFallSprites,
};

/* Joker's spawn, taunt, and damage phases are controlled by Batman's encounter sequence. */
/* eslint-disable react/prop-types */
export function Joker({ jokerRef, visible, smokeVisible, direction, damage }) {
  const activeSprites = damageSprites[damage] ?? jokerTauntSprites;

  return (
    <div
      ref={jokerRef}
      className={styles.joker}
      data-visible={visible}
      data-smoke-visible={smokeVisible}
      data-direction={direction}
      data-damage={damage ?? undefined}
      aria-hidden="true"
    >
      <span className={styles.jokerSmoke}>
        <img className={styles.jokerSmokeSpriteSheet} src={jokerSmokeSprites} alt="" />
      </span>
      <span className={styles.jokerFrame}>
        <img className={styles.jokerSpriteSheet} src={activeSprites} alt="" />
      </span>
    </div>
  );
}
