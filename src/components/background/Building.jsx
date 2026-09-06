import styles from './Background.module.css';

/* Building data is internal scene configuration, not a public component API. */
/* eslint-disable react/prop-types */
export function Building({ building, depth }) {
  const widthScale = depth === 'distant' ? 0.48 : 0.54;
  const heightScale = depth === 'distant' ? 0.34 : 0.29;
  const scaledWidth = building.width * widthScale;
  const buildingStyle = {
    '--building-left': `${building.left + (building.width - scaledWidth) / 2}%`,
    '--building-width': `${scaledWidth}%`,
    '--building-height': `${building.height * heightScale}svh`,
    '--building-stack': building.stack,
  };

  return (
    <div
      className={`${styles.building} ${styles[depth]}`}
      data-building-id={building.id}
      data-roof={building.roof}
      data-light={building.light ?? 'dim'}
      style={buildingStyle}
    >
      {depth === 'foreground' && (
        <>
          <div className={styles.rooftop} data-rooftop />
          <div className={styles.windows} />
        </>
      )}
    </div>
  );
}
