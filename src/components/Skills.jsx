import styles from './Skills.module.css';
import { getImageUrl } from '../utils';

const skillGroups = [
  {
    title: 'Languages',
    skills: [
      { title: 'Python', logo: 'python.png' },
      { title: 'TypeScript', logo: 'typescript.png' },
      { title: 'JavaScript', logo: 'javascript.png' },
      { title: 'Java', logo: 'java.png' },
      { title: 'Rust', logo: 'rust.png' },
      { title: 'C++', logo: 'cpp.png' },
      { title: 'C', logo: 'c.png' },
      { title: 'SQL', logo: 'sql.png' },
      { title: 'GraphQL', logo: 'graphql.png' },
      { title: 'HTML', logo: 'html.png' },
      { title: 'CSS', logo: 'css.png' },
    ],
  },
  {
    title: 'Frameworks',
    skills: [
      { title: 'React', logo: 'react.png' },
      { title: 'Flask', logo: 'flask.png' },
      { title: 'Django', logo: 'django.png' },
      { title: 'Node.js', logo: 'node.png' },
      { title: 'Express', logo: 'express.png' },
      { title: 'LangChain', logo: 'langchain.png' },
      { title: 'PyTorch', logo: 'pytorch.png' },
      { title: 'OpenCV', logo: 'opencv.png' },
      { title: 'Espresso', logo: 'espresso.png' },
      { title: 'JUnit', logo: 'junit.png' },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { title: 'AWS', logo: 'AWS.png' },
      { title: 'GCP', logo: 'gcp.png' },
      { title: 'DataBricks', logo: 'databricks.png' },
      { title: 'Datadog', logo: 'datadog.png' },
      { title: 'GitHub', logo: 'github-og.png' },
      { title: 'Git', logo: 'git.png' },
      { title: 'Graphite', logo: 'graphite.png' },
      { title: 'MySQL', logo: 'mysql.png' },
      { title: 'MongoDB', logo: 'mongodb.png' },
      { title: 'PostgreSQL', logo: 'postgresql.png' },
      { title: 'Docker', logo: 'docker.png' },
    ],
  },
];

export const Skills = () => (
  <section className={styles.skills} id="skills">
    <header className={styles.skillsHeader}>
      <h2>Skills</h2>
    </header>

    <div className={styles.skillGroups}>
      {skillGroups.map((group) => {
        const headingId = `skills-${group.title
          .toLowerCase()
          .replace(/[^a-z]+/g, '-')}`;

        return (
          <section
            key={group.title}
            className={styles.skillGroup}
            aria-labelledby={headingId}
          >
            <header className={styles.groupHeader}>
              <h3 id={headingId}>{group.title}</h3>
            </header>

            <ul className={styles.skillGrid}>
              {group.skills.map((skill) => (
                <li key={skill.title} className={styles.skillCard}>
                  <span className={styles.iconFrame}>
                    <img
                      src={getImageUrl(skill.logo)}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className={styles.skillName}>{skill.title}</span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  </section>
);
