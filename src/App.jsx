import { useState } from 'react';
import styles from './App.module.css';
import { Background } from './components/background/Background';
import { Experience } from './components/Experience';
import { Hero } from './components/Hero';
import { NavBar } from './components/NavBar';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';

const sections = {
  home: { label: 'Home', component: Hero },
  experience: { label: 'Experience', component: Experience },
  projects: { label: 'Projects', component: Projects },
  skills: { label: 'Skills', component: Skills },
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const ActiveSection = sections[activeSection].component;

  return (
    <main className={styles.app}>
      <Background />
      <NavBar
        activeSection={activeSection}
        sections={sections}
        onSectionChange={setActiveSection}
      />

      <section
        className={styles.portfolioPanel}
        aria-label={`${sections[activeSection].label} portfolio section`}
      >
        <div key={activeSection} className={styles.panelContent}>
          <ActiveSection />
        </div>
      </section>
    </main>
  );
}

export default App;
