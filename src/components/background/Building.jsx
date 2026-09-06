import styles from './Background.module.css';

/* Building data is internal scene configuration, not a public component API. */
/* eslint-disable react/prop-types */
export function Building({ building, depth }) {
  const buildingStyle = {
    '--building-left': `${building.left}%`,
    '--building-width': `${building.width}%`,
    '--building-height': `${building.height}svh`,
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
      <div className={styles.windows} />
    </div>
  );
}
