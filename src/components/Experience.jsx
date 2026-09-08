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
    section: {
      bullets: [
        {
          text: 'Engineered a 3-stage data migration by synchronizing legacy and greenfield backends, rerouting new writes, and executing a shard-aware distributed migration job that preserved 70K user-configured subscriptions across production clusters',
          highlights: [
            '3-stage data migration',
            'shard-aware distributed migration job',
            '70K user-configured subscriptions',
          ],
        },
        {
          text: 'Audited 82K subscriptions throughout staged rollout using Datadog metrics, Databricks SQL queries, and live JavaScript probes',
          highlights: [
            '82K subscriptions throughout staged rollout',
            'Datadog',
            'Databricks',
            'JavaScript probes',
          ],
        },
        {
          text: 'Launched a Microsoft Teams integration for Asana Gov that uses asynchronous jobs to deliver 7 configurable project notifications to connected conversations and lets users manage subscriptions, extending a product serving 40K active users across 70K projects',
          highlights: [
            'Microsoft Teams integration for Asana Gov',
            '7 configurable project notifications',
            '40K active users across 70K projects',
          ],
        },
        {
          text: 'Spearheaded the design of workspace-aware routing for Microsoft Teams users, composing data-flow and sequence diagrams and building a 3-attempt backend resolver with bounded backoff and origin-validated authentication recovery',
          highlights: [
            'workspace-aware routing',
            'data-flow and sequence diagrams',
            '3-attempt backend resolver',
            'authentication recovery',
          ],
        },
        {
          text: 'Investigated a data-model gap causing redundant API fan-out and designed a unified server endpoint with centralized logic that reduced client calls by 67%, enabled targeted retries, and avoided a complex backfill',
          highlights: ['reduced client calls by 67%'],
        },
      ],
    },
  },
  AsanaIntern: {
    tabLabel: 'Asana (intern)',
    company: 'Asana',
    title: 'Software Engineering Intern',
    date: 'May 2025 – August 2025',
    logos: ['asana.png'],
    section: {
      bullets: [
        {
          text: 'Optimized and A/B-tested a paid-tier upgrade-request flow across 80+ product surfaces, reducing 4 steps to 3 and increasing upgrade requests by 367%, tier upgrades by 44%, and higher-tier ARR per organization by 28%, with a $483K ARR impact',
          highlights: [
            'A/B-tested',
            '80+ product surfaces',
            'reducing 4 steps to 3',
            'increasing upgrade requests by 367%, tier upgrades by 44%, and higher-tier ARR per organization by 28%',
            '$483K ARR impact',
          ],
        },
        {
          text: 'Integrated core work management with premium strategic planning features using React/TypeScript components, client-server mutations, server-computed values, and GraphQL projections to address a need cited by 26% of churned users',
          highlights: [
            'React/TypeScript components',
            'GraphQL projections',
            'need cited by 26% of churned users',
          ],
        },
        {
          text: "Prototyped a bidirectional Asana-Discord integration in 3 days, automating role-gated and real-time updates via REST APIs and webhooks; won 1st place at Asana's company-wide internal hackathon",
          highlights: [
            'bidirectional Asana-Discord integration',
            '3 days',
            "won 1st place at Asana's company-wide internal hackathon",
          ],
        },
      ],
    },
  },
  CIC: {
    tabLabel: 'Amazon Web Services • CIC',
    company: 'Amazon Web Services • CIC',
    title: 'Software Developer Intern',
    date: 'May 2024 – April 2025',
    logos: ['AWS.png', 'CIC.png'],
    section: {
      bullets: [
        {
          text: 'Pioneered an early reusable GenAI platform at UBC; launched a cyber teaching assistant serving 100+ computer science students, then adapted its architecture into a virtual patient simulator used in pharmacy classes of 75+ students',
          highlights: [
            'early reusable GenAI platform at UBC',
            'serving 100+ computer science students',
            'used in pharmacy classes of 75+ students',
          ],
        },
        {
          text: 'Upgraded architecture to support a student advising assistant that used retrieval-augmented generation (RAG) for course and policy inquiries; presented the solution to UBC’s President, helping advance plans for university-wide deployment',
          highlights: [
            'retrieval-augmented generation (RAG)',
            'presented the solution to UBC’s President',
            'university-wide deployment',
          ],
        },
        {
          text: 'Replaced an always-on, self-hosted LLM with serverless Amazon Bedrock, saving $4,897 USD annually while increasing model-request capacity by 16x and reducing text-generation latency by 85% per query',
          highlights: [
            'Amazon Bedrock',
            'saving $4,897 USD',
            'while increasing model-request capacity by 16x',
            'reducing text-generation latency by 85%',
          ],
        },
        {
          text: 'Architected a serverless, event-driven AWS application with 20+ Lambda functions and ~60 OpenAPI operations; automated repeatable deployments using AWS CDK across API Gateway, SQS, AppSync, Cognito, RDS, DynamoDB, S3, ECS, and ECR',
          highlights: [
            'serverless, event-driven AWS application',
            '20+ Lambda functions',
            '~60 OpenAPI operations',
            'AWS CDK',
            'API Gateway, SQS, AppSync, Cognito, RDS, DynamoDB, S3, ECS',
            'ECR',
          ],
        },
        {
          text: 'Built LangChain RAG pipelines that ingested documents from S3 buckets, generated Amazon Titan embeddings, and used HNSW vector indexes and KNN search in PostgreSQL with pgvector for low-latency semantic retrieval across content and metadata',
          highlights: [
            'LangChain RAG pipelines',
            'S3 buckets',
            'Amazon Titan embeddings',
            'HNSW vector indexes',
            'KNN search',
            'PostgreSQL',
            'pgvector',
            'low-latency semantic retrieval',
          ],
        },
        {
          text: 'Productionized workloads with multi-AZ RDS, RDS Proxy connection pooling, private subnets, VPC endpoints, WAF, Cognito, and least-privilege IAM roles; implemented SQS/AppSync asynchronous exports and CloudWatch/EventBridge failure handling',
          highlights: [
            'multi-AZ RDS, RDS Proxy connection pooling, private subnets, VPC endpoints, WAF, Cognito',
            'IAM roles',
            'SQS/AppSync asynchronous exports',
            'CloudWatch/EventBridge',
          ],
        },
      ],
    },
  },
  Intel: {
    tabLabel: 'Intel',
    company: 'Intel',
    title: 'ASIC Design Intern',
    date: 'September 2022 – April 2023',
    logos: ['intel.png'],
    section: {
      bullets: [
        {
          text: 'Designed and implemented the Interrupt Controller in the Compute eXpress Link (CXL), managing inter and intra-component communicative signals',
          highlights: ['Interrupt Controller', 'Compute eXpress Link'],
        },
        {
          text: 'Automated data collection from CSV files and generated 140+ SystemVerilog modules via Shell Scripting',
          highlights: ['data collection', '140+ SystemVerilog modules', 'Shell Scripting'],
        },
        {
          text: 'Optimized flow of modifying CXL interrupts, saving company time and facilitating easy reproducibility for senior engineers',
          highlights: ['saving company time', 'easy reproducibility'],
        },
        {
          text: 'Utilized Advanced Peripheral Bus transfers and Advanced eXtensible Interfaces',
          highlights: ['Advanced Peripheral Bus', 'Advanced eXtensible Interfaces'],
        },
        {
          text: 'Verified proper functionality by analyzing waveforms produced by coding SystemVerilog covers and asserts',
          highlights: ['analyzing waveforms', 'SystemVerilog covers and asserts'],
        },
        {
          text: 'Created efficient design requirements on Macro-architecture Specification documents',
          highlights: ['Macro-architecture Specification documents'],
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

export const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState('Asana');
  const experience = experiences[selectedExperience];
  const panelId = `experience-panel-${selectedExperience.toLowerCase()}`;
  const bulletSplitIndex = Math.ceil(experience.section.bullets.length / 2);
  const bulletColumns = [
    experience.section.bullets.slice(0, bulletSplitIndex),
    experience.section.bullets.slice(bulletSplitIndex),
  ].filter((column) => column.length > 0);

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

        <section className={styles.experienceSection}>
          {experience.section.heading && <h4>{experience.section.heading}</h4>}
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
        </section>
      </article>
    </section>
  );
};
