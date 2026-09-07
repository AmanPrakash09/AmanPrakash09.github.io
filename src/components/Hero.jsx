import styles from "./Hero.module.css";
import { getImageUrl } from "../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{"I'm Aman"}</h1>
        <p className={styles.description}>
          {"I'm a Software Engineer who builds cool things"}
        </p>
      </div>
      <img
        src={getImageUrl("hero.png")}
        alt="Hero image of me"
        className={styles.heroImg}
      />
    </section>
  );
};
