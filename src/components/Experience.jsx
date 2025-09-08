import { useState } from 'react';
import styles from './Experience.module.css';
import { getImageUrl } from '../utils';

export const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState('Asana');
  const [showModal, setShowModal] = useState(false);

  const experiences = {
    Asana: {
      company: 'Asana',
      title: 'Software Engineering Intern',
      date: 'May 2025 - August 2025',
      logos: ['asana.png'],
    },
    CIC: {
      company: 'Amazon Web Services • CIC',
      title: 'Software Developer Intern',
      date: 'May 2024 - April 2025',
      logos: ['AWS.png', 'CIC.png'],
    },
    Intel: {
      company: 'Intel',
      title: 'ASIC Design Intern',
      date: 'Sep 2022 - April 2023',
      logos: ['intel.png'],
    }
  };

  const experiencesDetails = {
    Asana: {
      company: 'Asana',
      title: 'Software Engineering Intern',
      date: 'May 2025 - August 2025',
      logos: ['asana.png'],
      description: `- Optimized billing checkout flow with refactored logic, raising 0.32% success rate to 3% and projecting $1,000,000+ in ARR\n
                    - Connected Asana’s most popular premium and core features to increase paid-tier adoption, mitigating 26% of churned users\n
                    - Crafted new components via React TypeScript with client-server mutations, server-computed values, and GraphQL projections\n
                    - Developed an Asana–Discord integration that earned 1st place in Asana’s company-wide internal hackathon`,
    },
    CIC: {
      company: 'Amazon Web Services • Cloud Innovation Centre',
      title: 'Software Developer Intern',
      date: 'May 2024 - April 2025',
      logos: ['AWS.png', 'CIC.png'],
      description: ` September 2024 – April 2025:\n
                    - Instituted a virtual patient simulator and student teaching assistant using retrieval augmented generation\n
                    - Architected a serverless and scalable backend with AWS Lambda and API Gateway to support high-concurrency workloads\n
                    - Applied data modelling principles to design a relational database schema in a PostgreSQL RDS, ensuring optimized queries\n
                    - Containerized data ingestion and text generation workflows with Docker on Amazon ECR for portable execution environments\n
                    - Leveraged LangChain to parse S3 files, create embeddings, store vectors in indexed RDS tables, and perform similarity search\n
                    - Implemented a chat log export feature using AppSync for real-time updates and SQS to queue and process asynchronous tasks\n
                    - Designed a VPC with private subnets, an internet gateway, a NAT gateway, and AWS service endpoints for secure networking\n
                    - Automated deployment with AWS CDK stacks across multiple faculties, enhancing the learning of 100+ active student users\n
                     May 2024 – August 2024 :\n
                    - Constructed a student advising assistant using retrieval augmented generation to address UBC course and policy inquiries\n
                    - Integrated Amazon Bedrock to improve the previous architecture, improving efficiency and saving $4,897 USD per year\n
                    - Enhanced request handling capacity by 1500% to support more concurrent users and text generation speed by 85% per query\n
                    - Accelerated semantic search using HNSW vector indexing and KNN search with PGVector for efficient retrieval\n
                    - Established Flask App with LangChain in Amazon Beanstalk to interact with PostgreSQL RDS and Amazon ECS tasks\n
                    - Showcased project to the President of UBC, sparking plans for university-wide deployment to support all students`,
    },
    Intel: {
      company: 'Intel',
      title: 'ASIC Design Intern',
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
        <h2>{experience.company}</h2>
        <h3>{experience.title}</h3>
        <p>{experience.date}</p>
        <div className={`${styles.logoContainer} ${isSingleLogo ? styles.singleLogo : styles.multipleLogos}`}>
          {experience.logos.map((logo, index) => (
            <img
              key={index}
              src={getImageUrl(logo)}
              alt={`${experience.company} logo ${index + 1}`}
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
          <h2>{experience.company}</h2>
          <h3>{experience.title}</h3>
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
                alt={`${experience.company} logo ${index + 1}`}
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
            <p>{experiences[key].company}</p>
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
