import { useEffect, useState } from 'react';
import styles from "./Hero.module.css";
import { getImageUrl } from "../utils";

const INTRODUCTION = "I'm Aman";
const TYPING_START_DELAY = 250;
const CHARACTER_DELAY = 115;

export const Hero = () => {
  const [typedIntroduction, setTypedIntroduction] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? INTRODUCTION : '',
  );

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let nextCharacterIndex = 0;
    let typingTimer;

    const typeNextCharacter = () => {
      nextCharacterIndex += 1;
      setTypedIntroduction(INTRODUCTION.slice(0, nextCharacterIndex));

      if (nextCharacterIndex < INTRODUCTION.length) {
        typingTimer = window.setTimeout(typeNextCharacter, CHARACTER_DELAY);
      }
    };

    typingTimer = window.setTimeout(typeNextCharacter, TYPING_START_DELAY);
    return () => window.clearTimeout(typingTimer);
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title} aria-label={INTRODUCTION}>
          <span aria-hidden="true" className={styles.typedText}>{typedIntroduction}</span>
          <span aria-hidden="true" className={styles.cursor} />
        </h1>
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
