import React, { useState, useRef, useEffect } from 'react';
import styles from './Skills.module.css';
import { getImageUrl } from '../utils';

export const Skills = () => {
  const [selectedTab, setSelectedTab] = useState('Languages');
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const skillsListRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  const languages = {
    Python: { title: 'Python', logo: 'python.png' },
    JavaScript: { title: 'JavaScript', logo: 'javascript.png' },
    TypeScript: { title: 'TypeScript', logo: 'typescript.png' },
    Java: { title: 'Java', logo: 'java.png' },
    Cpp: { title: 'C++', logo: 'cpp.png' },
    C: { title: 'C', logo: 'c.png' },
    SQL: { title: 'SQL', logo: 'sql.png' },
    HTML: { title: 'HTML', logo: 'html.png' },
    CSS: { title: 'CSS', logo: 'css.png' },
  };

  const frameworks = {
    Flask: { title: 'Flask', logo: 'flask.png' },
    Django: { title: 'Django', logo: 'django.png' },
    Node: { title: 'Node.js', logo: 'node.png' },
    Express: { title: 'Express', logo: 'express.png' },
    React: { title: 'React', logo: 'react.png' },
    LangChain: { title: 'LangChain', logo: 'langchain.png' },
    Locust: { title: 'Locust', logo: 'locust.png' },
    Vite: { title: 'Vite', logo: 'vite.png' },
    Espresso: { title: 'Espresso', logo: 'espresso.png' },
    JUnit: { title: 'JUnit', logo: 'junit.png' },
  };

  const tools = {
    AWS: { title: 'AWS', logo: 'AWS.png' },
    GitHub: { title: 'GitHub', logo: 'github-og.png' },
    Git: { title: 'Git', logo: 'git.png' },
    MySQL: { title: 'MySQL', logo: 'mysql.png' },
    MongoDB: { title: 'MongoDB', logo: 'mongodb.png' },
    PostgreSQL: { title: 'PostgreSQL', logo: 'postgresql.png' },
    Docker: { title: 'Docker', logo: 'docker.png' },
    VSCode: { title: 'VS Code', logo: 'vscode.png' },
    IntelliJ: { title: 'IntelliJ', logo: 'intellij.png' },
    AndroidStudio: { title: 'Android Studio', logo: 'androidstudio.png' },
    Figma: { title: 'Figma', logo: 'figma.png' },
  };

  const tabs = {
    Languages: languages,
    Frameworks: frameworks,
    Tools: tools,
  };

  const updateArrowsState = () => {
    const scrollLeft = skillsListRef.current.scrollLeft;
    const scrollWidth = skillsListRef.current.scrollWidth;
    const clientWidth = skillsListRef.current.clientWidth;

    setIsAtStart(scrollLeft === 0);
    setIsAtEnd(Math.ceil(scrollLeft + clientWidth) >= Math.floor(scrollWidth));
  };

  const startScrolling = (direction) => {
    if (skillsListRef.current) {
      scrollIntervalRef.current = setInterval(() => {
        skillsListRef.current.scrollLeft += direction * 10;
        updateArrowsState();
      }, 10);
    }
  };

  const stopScrolling = () => {
    clearInterval(scrollIntervalRef.current);
    updateArrowsState();
  };

  useEffect(() => {
    updateArrowsState(); // Check arrow states on mount and whenever the selected tab changes

    // Add event listener to update arrows on window resize
    window.addEventListener('resize', updateArrowsState);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateArrowsState);
    };
  }, [selectedTab]);

  const renderSkills = (skills) => (
    <div className={styles.skillsContainer}>
      {Object.keys(skills).map((key) => (
        <div key={key} className={styles.skillItem}>
          <img src={getImageUrl(skills[key].logo)} alt={skills[key].title} />
          <p>{skills[key].title}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.skills} id="skills">
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.scrollLeft} ${isAtStart ? styles.disabled : ''}`}
          onMouseDown={() => !isAtStart && startScrolling(-1)}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          disabled={isAtStart}
        >
          ←
        </button>
        <div className={styles.tabs}>
          {Object.keys(tabs).map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${selectedTab === tab ? styles.active : ''}`}
              onClick={() => setSelectedTab(tab)}
            >
              <p>{tab}</p>
            </button>
          ))}
        </div>
        <button
          className={`${styles.scrollRight} ${isAtEnd ? styles.disabled : ''}`}
          onMouseDown={() => !isAtEnd && startScrolling(1)}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          disabled={isAtEnd}
        >
          →
        </button>
      </div>
      <div className={styles.skillsList} ref={skillsListRef} onScroll={updateArrowsState}>
        {renderSkills(tabs[selectedTab])}
      </div>
    </div>
  );
};
