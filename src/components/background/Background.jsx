import { useRef } from 'react';
import { Batman } from './Batman';
import { Building } from './Building';
import styles from './Background.module.css';
import { distantBuildings, foregroundBuildings } from './sceneData';

export function Background() {
  const backgroundRef = useRef(null);
  const foregroundSkylineRef = useRef(null);

  return (
    <section ref={backgroundRef} className={styles.background} aria-label="Gotham City skyline">
      <div className={styles.sky} aria-hidden="true">
        <div className={styles.horizonGlow} />
        <div className={`${styles.cloud} ${styles.cloudOne}`} />
        <div className={`${styles.cloud} ${styles.cloudTwo}`} />
        <div className={`${styles.cloud} ${styles.cloudThree}`} />
      </div>

      <div className={styles.distantSkyline} aria-hidden="true">
        {distantBuildings.map((building) => (
          <Building key={building.id} building={building} depth="distant" />
        ))}
      </div>

      <div ref={foregroundSkylineRef} className={styles.foregroundSkyline} aria-hidden="true">
        {foregroundBuildings.map((building) => (
          <Building key={building.id} building={building} depth="foreground" />
        ))}
      </div>

      <div className={styles.ground} aria-hidden="true" />
      <Batman sceneRef={backgroundRef} skylineRef={foregroundSkylineRef} />
    </section>
  );
}
