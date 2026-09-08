import { useState } from 'react';
import styles from './Projects.module.css';
import { getImageUrl } from '../utils';

const projects = {
  AILA: {
    tabLabel: 'AILA',
    tabIcon: 'projects/aila-icon.png',
    title: 'AILA',
    technologies: '',
    date: '',
    subsections: {
      intro: { title: 'Intro', content: [] },
      impact: { title: 'Impact', content: [] },
      architecture: { title: 'Architecture', content: [] },
      flows: { title: 'Flows', content: [] },
    },
  },
  SpecializationExplorer: {
    tabLabel: 'Specialization Explorer',
    tabIcon: 'projects/specializationexplorer-icon.png',
    title: 'Specialization Explorer',
    technologies: '',
    date: '',
    subsections: {
      intro: { title: 'Intro', content: [] },
      impact: { title: 'Impact', content: [] },
      architecture: { title: 'Architecture', content: [] },
      flows: { title: 'Flows', content: [] },
    },
  },
  VCI: {
    tabLabel: 'VCI',
    tabIcon: 'projects/vci-icon.png',
    title: 'VCI',
    technologies: '',
    date: '',
    subsections: {
      intro: { title: 'Intro', content: [] },
      impact: { title: 'Impact', content: [] },
      architecture: { title: 'Architecture', content: [] },
      flows: { title: 'Flows', content: [] },
    },
  },
  StudentAdvising: {
    tabLabel: 'Student Advising',
    tabIcon: 'projects/studentadvising-icon.png',
    title: 'Student Advising',
    technologies: '',
    date: '',
    subsections: {
      intro: { title: 'Intro', content: [] },
      impact: { title: 'Impact', content: [] },
      architecture: { title: 'Architecture', content: [] },
      flows: { title: 'Flows', content: [] },
    },
  },
  SightSteer: {
    tabLabel: 'SightSteer',
    tabIcon: 'projects/sightsteer-icon.png',
    title: 'SightSteer – Client-Server Based Remote Control System',
    technologies: 'Rust, Python, Networking, Computer Vision, ESP32',
    date: 'April 2025',
    section: {
      bullets: [
        {
          text: 'Engineered a Rust server that broadcasts its IP over UDP for discovery and establishes TCP connections to stream data to clients',
          highlights: ['Rust server', 'broadcasts its IP over UDP for discovery', 'TCP connections to stream data'],
        },
        {
          text: 'Created a client that connects to Wi-Fi, parses server IP/port via UDP discovery, and maintains a fault-tolerant TCP connection',
          highlights: ['parses server IP/port via UDP discovery', 'fault-tolerant TCP connection'],
        },
        {
          text: 'Built a hand-recognition system that computes wrist–fingertip angles with normalization and smoothing using computer vision',
          highlights: ['hand-recognition system', 'computer vision'],
        },
      ],
    },
  },
  EasyText: {
    tabLabel: 'EasyText',
    tabIcon: 'projects/easytext-icon.png',
    title: 'EasyText - Messaging App with AI Features',
    technologies: 'Node.js, Express.js, MongoDB Atlas, OpenAI, Amazon EC2, Docker, WebSocket, face-api.js',
    date: 'April 2024',
    section: {
      bullets: [
        {
          text: 'Designed full-stack web application with real-time chat functionality due to WebSocket integration',
          highlights: ['real-time chat functionality' , 'WebSocket'],
        },
        {
          text: 'Implemented user authentication and session management using cookies with input sanitization to ensure security',
          highlights: ['user authentication', 'cookies', 'input sanitization to ensure security'],
        },
        {
          text: 'Integrated GPT-3.5 for generating responses, Whisper for voice-to-text transcription, and face-api for facial emotion analysis',
          highlights: ['GPT-3.5', 'Whisper', 'facial emotion analysis'],
        },
        {
          text: 'Facilitated chat room creation, message handling, and profile management following Model-View-Controller design pattern',
          highlights: ['Model-View-Controller design pattern'],
        },
        {
          text: 'Containerized application with Docker and deployed project to an Amazon EC2 instance for efficient hosting',
          highlights: ['Docker', 'Amazon EC2'],
        },
      ],
    },
  },
  PokeDex: {
    tabLabel: 'PokéDex',
    tabIcon: 'projects/pokedex-icon.png',
    title: 'PokéDex Master - Pokémon Database Web App',
    technologies: 'Django, React.tsx, SQL, Amazon RDS, MySQL Workbench, JSON Web Token',
    date: 'March 2024',
    section: {
      bullets: [
        {
          text: 'Developed RESTful API using Django and user-friendly interface with organized pages and reusable components with React',
          highlights: ['RESTful API', 'Django', 'React'],
        },
        {
          text: 'Applied JSON Web Token authentication, managing access and refresh tokens to implement protected endpoints and private routes',
          highlights: ['JSON Web Token authentication'],
        },
        {
          text: 'Normalized database schema following Boyce-Codd Normal Form, supporting optimal updating and searching features with SQL queries',
          highlights: ['Boyce-Codd Normal Form', 'SQL queries'],
        },
        {
          text: 'Employed an Amazon RDS instance with a MySQL Engine to maintain a synchronized database for team collaboration',
          highlights: ['Amazon RDS', 'MySQL Engine'],
        },
      ],
    },
  },
  BookIt: {
    tabLabel: 'BookIt',
    tabIcon: 'projects/bookit-icon.png',
    title: 'BookIt - Study Space Booking System Android App',
    technologies: 'Java, Python, Node.js, Express.js, MongoDB, GoogleOAuth & Maps, Firebase, Geoapify, Espresso, Microsoft Azure',
    date: 'December 2023',
    section: {
      bullets: [
        {
          text: 'Engineered a personalized booking system that allows students and UBC staff to book study rooms on campus',
          highlights: ['personalized booking system'],
        },
        {
          text: 'Scraped the data of 200+ learning spaces with class times, building operating hours, capacity, location, and room utilities',
          highlights: ['200+ learning spaces', 'class times', 'building operating hours', 'capacity', 'location', 'room utilities'],
        },
        {
          text: 'Integrated authentication, notifications, search/filter strategies, and interactive map features for an optimal user experience',
          highlights: ['authentication', 'notifications', 'search/filter strategies', 'interactive map features'],
        },
        {
          text: 'Earned recognition as the Top 3 projects of the Software Engineering 2023-24 class',
          highlights: ['Top 3 projects'],
        },
      ],
    },
  },
};

const renderBulletText = ({ text, highlights }) => {
  const parts = [];
  let cursor = 0;

  highlights.forEach((phrase) => {
    const phraseStart = text.indexOf(phrase, cursor);

    if (phraseStart === -1) return;

    if (phraseStart > cursor) {
      parts.push(text.slice(cursor, phraseStart));
    }

    parts.push(<mark key={`${phraseStart}-${phrase}`}>{phrase}</mark>);
    cursor = phraseStart + phrase.length;
  });

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return parts;
};

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState('SightSteer');
  const project = projects[selectedProject];
  const panelId = `project-panel-${selectedProject.toLowerCase()}`;
  const bullets = project.section?.bullets ?? [];
  const bulletSplitIndex = Math.ceil(bullets.length / 2);
  const bulletColumns = [
    bullets.slice(0, bulletSplitIndex),
    bullets.slice(bulletSplitIndex),
  ].filter((column) => column.length > 0);

  return (
    <section className={styles.projectContainer} id="projects">
      <div className={styles.folderTabs} role="tablist" aria-label="Project folders">
        {Object.entries(projects).map(([key, item]) => {
          const isSelected = selectedProject === key;

          return (
            <button
              key={key}
              id={`project-tab-${key.toLowerCase()}`}
              className={`${styles.folderTab} ${isSelected ? styles.active : ''}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={isSelected ? panelId : undefined}
              aria-label={item.tabLabel}
              title={item.tabLabel}
              onClick={() => setSelectedProject(key)}
            >
              <img src={getImageUrl(item.tabIcon)} alt="" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <article
        key={selectedProject}
        id={panelId}
        className={styles.folderContent}
        role="tabpanel"
        aria-labelledby={`project-tab-${selectedProject.toLowerCase()}`}
      >
        <header className={styles.projectHeader}>
          <div>
            <h2>{project.title}</h2>
            {project.technologies && <h3>{project.technologies}</h3>}
            {project.date && <p>{project.date}</p>}
          </div>

        </header>

        <div className={styles.projectBody}>
          {project.section && (
            <div
              className={styles.highlightColumns}
              data-column-count={bulletColumns.length}
            >
              {bulletColumns.map((column, columnIndex) => (
                <ul className={styles.highlights} key={columnIndex}>
                  {column.map((bullet) => (
                    <li key={bullet.text}>{renderBulletText(bullet)}</li>
                  ))}
                </ul>
              ))}
            </div>
          )}

          {project.subsections && (
            <div className={styles.subsectionGrid}>
              {Object.entries(project.subsections).map(([key, subsection]) => (
                <section className={styles.subsection} key={key}>
                  <h3>{subsection.title}</h3>
                  {subsection.content.map((item) => <p key={item}>{item}</p>)}
                </section>
              ))}
            </div>
          )}
        </div>
      </article>
    </section>
  );
};
