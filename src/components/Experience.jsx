import { useState } from 'react';
import styles from './Experience.module.css';
import { getImageUrl } from '../utils';

const experiences = {
  Asana: {
    tabLabel: 'Asana',
    company: 'Asana',
    title: 'Software Engineer',
    date: 'May 2026 – PRESENT',
    logos: ['asana.png'],
    sections: [
      {
        bullets: [
          'Engineered a 3-stage data migration by synchronizing legacy and greenfield backends, rerouting new writes, and executing a shard-aware distributed migration job that preserved 70K user-configured subscriptions across production clusters',
          'Audited 82K subscriptions throughout staged rollout using Datadog metrics, Databricks SQL queries, and live JavaScript probes',
          'Launched a Microsoft Teams integration for Asana Gov that uses asynchronous jobs to deliver 7 configurable project notifications to connected conversations and lets users manage subscriptions, extending a product serving 40K active users across 70K projects',
          'Spearheaded the design of workspace-aware routing for Microsoft Teams users, composing data-flow and sequence diagrams and building a 3-attempt backend resolver with bounded backoff and origin-validated authentication recovery',
          'Investigated a data-model gap causing redundant API fan-out and designed a unified server endpoint with centralized logic that reduced client calls by 67%, enabled targeted retries, and avoided a complex backfill'
        ],
      },
    ],
  },
  AsanaIntern: {
    tabLabel: 'Asana (intern)',
    company: 'Asana',
    title: 'Software Engineering Intern',
    date: 'May 2025 – August 2025',
    logos: ['asana.png'],
    sections: [
      {
        bullets: [
          'Optimized and A/B-tested a paid-tier upgrade-request flow across 80+ product surfaces, reducing 4 steps to 3 and increasing upgrade requests by 367%, tier upgrades by 44%, and higher-tier ARR per organization by 28%, with a $483K ARR impact ',
          'Integrated core work management with premium strategic planning features using React/TypeScript components, client-server mutations, server-computed values, and GraphQL projections to address a need cited by 26% of churned users ',
          "Prototyped a bidirectional Asana-Discord integration in 3 days, automating role-gated and real-time updates via REST APIs and webhooks; won 1st place at Asana's company-wide internal hackathon"
        ],
      },
    ],
  },
  CIC: {
    tabLabel: 'Amazon Web Services • CIC',
    company: 'Amazon Web Services • CIC',
    title: 'Software Developer Intern',
    date: 'May 2024 – April 2025',
    logos: ['AWS.png', 'CIC.png'],
    sections: [
      {
        bullets: [
          'Pioneered an early reusable GenAI platform at UBC; launched a cyber teaching assistant serving 100+ computer science students, then adapted its architecture into a virtual patient simulator used in pharmacy classes of 75+ students ',
          'Upgraded architecture to support a student advising assistant that used retrieval-augmented generation (RAG) for course and policy inquiries; presented the solution to UBC’s President, helping advance plans for university-wide deployment ',
          'Replaced an always-on, self-hosted LLM with serverless Amazon Bedrock, saving $4,897 USD annually while increasing model-request capacity by 16x and reducing text-generation latency by 85% per query ',
          'Architected a serverless, event-driven AWS application with 20+ Lambda functions and ~60 OpenAPI operations; automated repeatable deployments using AWS CDK across API Gateway, SQS, AppSync, Cognito, RDS, DynamoDB, S3, ECS, and ECR',
          'Built LangChain RAG pipelines that ingested documents from S3 buckets, generated Amazon Titan embeddings, and used HNSW vector indexes and KNN search in PostgreSQL with pgvector for low-latency semantic retrieval across content and metadata',
          'Productionized workloads with multi-AZ RDS, RDS Proxy connection pooling, private subnets, VPC endpoints, WAF, Cognito, and least-privilege IAM roles; implemented SQS/AppSync asynchronous exports and CloudWatch/EventBridge failure handling',
        ],
      },
    ],
  },
  Intel: {
    tabLabel: 'Intel',
    company: 'Intel',
    title: 'ASIC Design Intern',
    date: 'September 2022 – April 2023',
    logos: ['intel.png'],
    sections: [
      {
        bullets: [
          'Designed and implemented the Interrupt Controller in the CXL, managing inter and intra-component communicative signals',
          'Automated data collection from CSV files and generated 140+ SystemVerilog modules via Shell Scripting',
          'Optimized flow of modifying CXL interrupts, saving company time and facilitating easy reproducibility for senior engineers',
          'Utilized Advanced Peripheral Bus (APB) transfers and Advanced eXtensible Interfaces (AXI)',
          'Verified proper functionality by analyzing waveforms produced by coding SystemVerilog covers and asserts',
          'Created efficient Design Requirements on Macro-architecture Specification (MAS) documents',
        ],
      },
    ],
  },
};

export const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState('Asana');
  const experience = experiences[selectedExperience];
  const panelId = `experience-panel-${selectedExperience.toLowerCase()}`;

  return (
    <section className={styles.experienceContainer} id="experience">
      <div className={styles.folderTabs} role="tablist" aria-label="Experience folders">
        {Object.entries(experiences).map(([key, item]) => {
          const isSelected = selectedExperience === key;

          return (
            <button
              key={key}
              id={`experience-tab-${key.toLowerCase()}`}
              className={`${styles.folderTab} ${isSelected ? styles.active : ''}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={isSelected ? panelId : undefined}
              onClick={() => setSelectedExperience(key)}
            >
              <span>{item.tabLabel}</span>
            </button>
          );
        })}
      </div>

      <article
        key={selectedExperience}
        id={panelId}
        className={styles.folderContent}
        role="tabpanel"
        aria-labelledby={`experience-tab-${selectedExperience.toLowerCase()}`}
      >
        <header className={styles.experienceHeader}>
          <div>
            <h2>{experience.company}</h2>
            <h3>{experience.title}</h3>
            <p>{experience.date}</p>
          </div>

          <div className={styles.logoContainer} aria-hidden="true">
            {experience.logos.map((logo) => (
              <img
                key={logo}
                src={getImageUrl(logo)}
                alt=""
                className={styles.logo}
                decoding="async"
              />
            ))}
          </div>
        </header>

        <div
          className={styles.experienceSections}
          data-section-count={experience.sections.length}
        >
          {experience.sections.map((section, sectionIndex) => (
            <section className={styles.experienceSection} key={section.heading ?? sectionIndex}>
              {section.heading && <h4>{section.heading}</h4>}
              <ul className={styles.highlights}>
                {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            </section>
          ))}
        </div>
      </article>
    </section>
  );
};
