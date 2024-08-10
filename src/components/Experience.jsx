import { useState } from 'react';
import styles from './Experience.module.css';
import { getImageUrl } from '../utils';

export const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState('CIC');
  const [showModal, setShowModal] = useState(false);

  const experiences = {
    CIC: {
      title: 'Software Developer Intern',
      organization: 'UBC Cloud Innovation Centre • Amazon Web Services',
      date: 'May 2024 - PRESENT',
      logos: ['CIC.png', 'AWS.png'],
    },
    Intel: {
      title: 'ASIC Design Co-op',
      organization: 'Intel',
      date: 'Sep 2022 - April 2023',
      logos: ['intel.png'],  // Changed to an array for consistency
    }
  };

  const experiencesDetails = {
    CIC: {
      title: 'Software Developer Intern',
      organization: 'UBC Cloud Innovation Centre • Amazon Web Services',
      date: 'May 2024 - PRESENT',
      logos: ['CIC.png', 'AWS.png'],
      description: `- Developed a student advising assistant using retrieval augmented generation to address UBC course and policy inquiries\n
                    - Integrated Amazon Bedrock to improve previous architecture, improving efficiency and saving $4,897 USD per year\n
                    - Enhanced request handling capacity by 1500% to support more concurrent users and text generation speed by 85% per query\n
                    - Optimized semantic search using HNSW vector indexing and Euclidean distance with KNN in PGVector for efficient retrieval\n
                    - Implemented Flask App with LangChain and Amazon Lambda to interact with PostgreSQL Database and Amazon ECS tasks\n
                    - Deployed project following strict security protocols by configuring a private VPC with isolated subnets\n
                    - Managed IAM roles for different services like Amazon Beanstalk, EC2, containers on ECS, and Lambda functions\n
                    - Presented progress and goals to sponsors, demonstrating strong communication and stakeholder engagement skills`,
    },
    Intel: {
      title: 'ASIC Design Co-op',
      organization: 'Intel',
      date: 'Sep 2022 - April 2023',
      logos: ['intel.png'],
      description: `- Designed and implemented the Interrupt Controller in the CXL, managing inter & intra-component communicative signals\n
                    - Automated data collection from CSV files and generated 140+ SystemVerilog modules via Shell Scripting\n
                    - Optimized flow of modifying CXL interrupts, saving company time and facilitating easy reproducibility for senior engineers\n
                    - Utilized Advanced Peripheral Bus (APB) transfers and Advanced eXtensible Interfaces (AXI)\n
                    - Verified proper functionality by analyzing waveforms produced by coding SV covers and asserts\n
                    - Created efficient Design Requirements on Macro-architecture Specification (MAS) documents`,
    }
  };

  const renderExperienceDetails = () => {
    const experience = experiences[selectedExperience];
    const isSingleLogo = experience.logos.length === 1;

    return (
      <div className={styles.experienceDetails}>
        <h2>{experience.title}</h2>
        <h3>{experience.organization}</h3>
        <p>{experience.date}</p>
        <div className={`${styles.logoContainer} ${isSingleLogo ? styles.singleLogo : styles.multipleLogos}`}>
          {experience.logos.map((logo, index) => (
            <img
              key={index}
              src={getImageUrl(logo)}
              alt={`${experience.title} logo ${index + 1}`}
              className={styles.logo}
            />
          ))}
        </div>
        <button className={styles.learnMoreButton} onClick={() => setShowModal(true)}>Learn More</button>
      </div>
    );
  };

  const renderModal = () => {
    if (!showModal) return null;

    const experience = experiencesDetails[selectedExperience];
    const descriptionLines = experience.description.trim().split('\n');

    return (
      <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeButton} onClick={() => setShowModal(false)}>&times;</button>
          <h2>{experience.title}</h2>
          <h3>{experience.organization}</h3>
          <p>{experience.date}</p>
          <div className={styles.descriptionContainer}>
            {descriptionLines.map((line, index) => (
              <p key={index}>{line.trim()}</p>
            ))}
          </div>
          <div className={styles.modalLogoContainer}>
            {experience.logos.map((logo, index) => (
              <img
                key={index}
                src={getImageUrl(logo)}
                alt={`${experience.title} logo ${index + 1}`}
                className={styles.modalLogo}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.experienceContainer} id="experience">
      <ul className={styles.experienceList}>
        {Object.keys(experiences).map((key) => (
          <li 
            key={key} 
            className={`${styles.listItem} ${selectedExperience === key ? styles.active : ''}`}
            onClick={() => setSelectedExperience(key)}
          >
            <p>{experiences[key].title}</p>
          </li>
        ))}
      </ul>
      <div className={styles.experienceDetailsContainer}>
        {renderExperienceDetails()}
      </div>
      {renderModal()}
      <div className={styles.middleBlur} />
    </div>
  );
};
