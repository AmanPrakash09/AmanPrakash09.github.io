import { useState } from 'react';
import styles from './Projects.module.css';
import { getImageUrl } from '../utils';

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState('EasyText');
  const [showModal, setShowModal] = useState(false);

  const projects = {
    EasyText: {
      title: 'EasyText',
      detailedTitle: 'EasyText - Messaging App with AI Features',
      technologies: 'Node.js, Express.js, MongoDB Atlas, OpenAI, Amazon EC2, Docker, WebSocket, face-api.js',
      date: 'April 2024',
      logo: 'easytext.png',
    },
    PokeDex: {
      title: 'PokéDex Master',
      detailedTitle: 'PokéDex Master - Pokémon Database Web App',
      technologies: 'Django, React.tsx, SQL, Amazon RDS, MySQL Workbench, JSON Web Token',
      date: 'March 2024',
      logo: 'PokedexLogo.png',
    },
    BookIt: {
      title: 'BookIt',
      detailedTitle: 'BookIt - Study Space Booking System Android App',
      technologies: 'Java, Python, Node.js, Express.js, MongoDB, GoogleOAuth & Maps, Firebase, Geoapify, Espresso, Microsoft Azure',
      date: 'December 2023',
      logo: 'bookit.png',
    }
  };

  const projectsDetails = {
    EasyText: {
      title: 'EasyText - Messaging App with AI Features',
      technologies: 'Node.js, Express.js, MongoDB Atlas, OpenAI, Amazon EC2, Docker, WebSocket, face-api.js',
      date: 'April 2024',
      logo: 'easytext.png',
      description: `- Designed full-stack web application with real-time chat functionality due to WebSocket integration\n
                    - Implemented user authentication and session management using cookies with input sanitization to ensure security\n
                    - Integrated GPT-3.5 for generating responses, Whisper for voice-to-text transcription, and face-api for facial emotion analysis\n
                    - Facilitated chat room creation, message handling, and profile management following MVC design pattern\n
                    - Containerized application with Docker and deployed project to an Amazon EC2 instance for efficient hosting`,
    },
    PokeDex: {
      title: 'PokéDex Master - Pokémon Database Web App',
      technologies: 'Django, React.tsx, SQL, Amazon RDS, MySQL Workbench, JSON Web Token',
      date: 'March 2024',
      logo: 'PokedexLogo.png',
      description: `- Developed RESTful API using Django and user-friendly interface with organized pages and reusable components with React\n
                    - Applied JWT authentication, managing access and refresh tokens to implement protected endpoints and private routes\n
                    - Normalized database schema following BCNF, supporting optimal updating and searching features with SQL queries\n
                    - Employed an Amazon RDS instance with a MySQL Engine to maintain a synchronized database for team collaboration`,
    },
    BookIt: {
      title: 'BookIt - Study Space Booking System Android App',
      technologies: 'Java, Python, Node.js, Express.js, MongoDB, GoogleOAuth & Maps, Firebase, Geoapify, Espresso, Microsoft Azure',
      date: 'December 2023',
      logo: 'bookit.png',
      description: `- Engineered a personalized booking system that allows students and UBC staff to book study rooms on campus\n
                    - Scraped the data of 200+ learning spaces with class times, building operating hours, capacity, location, and room utilities\n
                    - Integrated authentication, notifications, search/filter strategies, and interactive map features for an optimal user experience\n
                    - Earned recognition as the Top 3 projects of the Software Engineering 2023-24 class`,
    }
  };

  const renderProjectDetails = () => {
    const project = projects[selectedProject];

    return (
      <div className={styles.projectDetails}>
        <div className={styles.projectInfo}>
          <h2>{project.detailedTitle}</h2>
          <h3>{project.technologies}</h3>
          <p>{project.date}</p>
          <button className={styles.learnMoreButton} onClick={() => setShowModal(true)}>Learn More</button>
        </div>
        <div className={styles.projectImage}>
          <img
            src={getImageUrl(project.logo)}
            alt={`${project.title} logo`}
            className={styles.logo}
          />
        </div>
      </div>
    );
  };

  const renderModal = () => {
    if (!showModal) return null;

    const project = projectsDetails[selectedProject];
    const descriptionLines = project.description.trim().split('\n');

    return (
      <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeButton} onClick={() => setShowModal(false)}>&times;</button>
          <h2>{project.title}</h2>
          <h3>{project.technologies}</h3>
          <p>{project.date}</p>
          <div className={styles.descriptionContainer}>
            {descriptionLines.map((line, index) => (
              <p key={index}>{line.trim()}</p>
            ))}
          </div>
          <div className={styles.modalLogoContainer}>
            <img
              src={getImageUrl(project.logo)}
              alt={`${project.title} logo`}
              className={styles.modalLogo}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.projectContainer} id="projects">
      <ul className={styles.projectList}>
        {Object.keys(projects).map((key) => (
          <li 
            key={key} 
            className={`${styles.listItem} ${selectedProject === key ? styles.active : ''}`}
            onClick={() => setSelectedProject(key)}
          >
            <p>{projects[key].title}</p>
          </li>
        ))}
      </ul>
      <div className={styles.projectDetailsContainer}>
        {renderProjectDetails()}
      </div>
      {renderModal()}
      <div className={styles.bottomBlur} />
    </div>
  );
};
