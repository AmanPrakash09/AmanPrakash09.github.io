import { useState } from 'react';
import styles from './Projects.module.css';
import { getImageUrl } from '../utils';

const projects = {
  AILA: {
    tabLabel: 'AILA',
    tabIcon: 'projects/aila-icon.png',
    title: 'AI Learning Assistant',
    technologies: '',
    date: '',
    subsections: {
      intro: {
        title: 'Intro',
        content: [
          'The AI Learning Assistant is a web-based teaching tool that gives UBC students personalized, course-specific support on demand. Using retrieval-augmented generation, it answers questions from instructor-provided materials, identifies knowledge gaps, and recommends relevant resources while keeping responses grounded in approved course content. Designed to complement instructors, it extends academic support beyond the classroom and helps students learn at their own pace.',
          'I built this tool specifically for the UBC Computer Science faculty, working directly with a professor who now uses the tool in their classrooms. I designed its serverless, event-driven AWS backend and developed a LangChain RAG pipeline that ingests instructor materials, generates Amazon Titan embeddings, retrieves relevant context through PGVector, and produces course-grounded responses. I also presented the project to UBC’s President, demonstrating its potential to expand personalized AI-supported learning across the university.',
        ],
        carousel: [
          {
            src: 'projects/aila-intro.png',
            alt: 'Pixel-art illustration of a robot teaching in front of a glowing classroom display',
          },
        ],
      },
      architecture: {
        title: 'Architecture',
        numberedPoints: [
          'The user sends a request to the application hosted on AWS Amplify.',
          'Amplify integrates with the backend API Gateway.',
          'Instructors can upload course materials to the application, which are stored in an S3 bucket using a pre-signed upload URL.',
          'Adding a new course file to the S3 bucket triggers the data ingestion workflow. The Lambda function runs a Docker container with Amazon Elastic Container Registry (ECR).',
          'The Lambda function embeds the text from uploaded files into vectors using Amazon Bedrock. This project uses the Amazon Titan Text Embeddings V2 model to generate embeddings.',
          'The Lambda function stores the vectors in the PostgreSQL database.',
          'Users can perform course management and access actions by sending an API request that invokes a Lambda function.',
          'This Lambda function interacts with Amazon RDS.',
          'Users can start chatting with the LLM by sending an API request that invokes the Lambda function to generate a response. The Lambda function runs a Docker container with Amazon ECR.',
          'The Lambda function stores the embedded messages in Amazon DynamoDB.',
          'This Lambda function uses RAG architecture to retrieve responses from LLMs hosted on Amazon Bedrock, augmented with the course information stored in Amazon RDS.',
          'When an instructor clicks download chat logs, the request is queued in Amazon SQS.',
          'An AWS Lambda function is triggered by the SQS queue to process the chat messages asynchronously.',
          'The processed chat messages are then stored in the Amazon RDS database for structured storage and retrieval.',
          'Additionally, chat logs are stored in Amazon S3.',
          'The Lambda function also interacts with AWS AppSync (GraphQL) to update the frontend chat interface in real time and notify the instructor when the CSV has finished downloading.',
        ],
        carousel: [
          {
            src: 'projects/aila-architecture.png',
            alt: 'AWS architecture diagram for the AI Learning Assistant, including its security, frontend, API, data ingestion, chat history, database, and generative AI pipelines',
          },
        ],
      },
      flows: {
        title: 'Flows',
        views: {
          student: {
            title: 'Student',
            carousel: [
              {
                src: 'projects/aila-student-courses.png',
                alt: 'Student dashboard showing an enrolled CPSC 210 course',
                description: 'Students enrolled in a course offering the AI Learning Assistant can access the web application anytime to engage with the tool. When they need help, they can log in to view their course.',
              },
              {
                src: 'projects/aila-student-learning-journey.png',
                alt: 'CPSC 210 learning journey with module progress and review controls',
                description: 'After selecting their course, students can see their progress in the course learning journey and select a module they want to review. The screenshot shows the learning journey in red because the student has yet to begin. As the student progresses, these icons go from red to yellow, then green.',
              },
              {
                src: 'projects/aila-student-chat.png',
                alt: 'AI Learning Assistant chat guiding a student through a Java program structure module',
                description: 'When the student selects “Review,” they are brought to the chat feature of the web application. The LLM prompts the student, engaging in constructive and kind dialogue until the student has achieved competency for the concept.',
              },
            ],
          },
          instructor: {
            title: 'Instructor',
            carousel: [
              {
                src: 'projects/aila-instructor-courses.png',
                alt: 'Instructor dashboard listing courses and their statuses',
                description: 'An instructor logging into the AI Learning Assistant is brought to a dashboard displaying their courses. Here, they can view each course’s status and enter the “Student View” as well.',
              },
              {
                src: 'projects/aila-instructor-analytics.png',
                alt: 'Instructor analytics dashboard showing message counts across course concepts',
                description: 'After selecting the course “CPSC 210 Software Construction,” the instructor is brought to the Analytics dashboard. Here, they can view relevant insights about the course, such as the “Message count” in relation to different concepts.',
              },
              {
                src: 'projects/aila-instructor-course-settings.png',
                alt: 'Instructor course dashboard for editing concepts and other course settings',
                description: 'Within the selected course, instructors can edit the concepts, modules, and prompt setting for their course, as well as view students.',
              },
            ],
          },
          admin: {
            title: 'Admin',
            carousel: [
              {
                src: 'projects/aila-admin-instructors.png',
                alt: 'Administrator dashboard for managing and assigning instructors',
                description: 'A user with administrator permissions can assign instructors to different courses.',
              },
              {
                src: 'projects/aila-admin-courses.png',
                alt: 'Administrator courses view showing course access codes and statuses',
                description: 'In the “Courses” view, administrators can activate and deactivate courses, as well as view the course name, course access code, and status.',
              },
              {
                src: 'projects/aila-admin-create-course.png',
                alt: 'Administrator form for creating a course and entering its settings',
                description: 'If administrators wish to create a new course, they must enter relevant information such as the Course Name, Course Department, and Course Code. They must also assign instructors to the course who have already registered with the application.',
              },
            ],
          },
        },
      },
    },
  },
  ObjectIdentificationUAV: {
    tabLabel: 'Object Identification via UAV Camera',
    tabIcon: 'projects/uav-icon.png',
    title: 'Object Identification via UAV Camera',
    technologies: '',
    date: '',
    subsections: {
      intro: {
        title: 'Intro',
        content: 'I developed an onboard perception system. It automatically detects, classifies, and tracks people and vehicles from live RGB and infrared UAV footage while estimating vehicle speeds during flight. Designed for long-range missions in remote environments, the system runs on lightweight embedded hardware without relying on cloud connectivity. It reduces manual video review, improves situational awareness, and establishes a foundation for autonomous alerts and decision-making.',
        images: [
          {
            src: 'projects/uav-infrared-tracking.png',
            alt: 'Infrared UAV footage with tracked cars and identification labels',
          },
          {
            src: 'projects/uav-rgb-tracking.png',
            alt: 'RGB UAV footage with cars and trucks identified in a parking lot',
          },
          {
            src: 'projects/uav-speed-estimation.png',
            alt: 'UAV vehicle tracking with estimated speeds on a roundabout',
          },
        ],
      },
      modelTraining: {
        title: 'Model Training',
        content: 'I developed and evaluated several RF-DETR Nano training strategies to identify the strongest detector for each camera modality. Higher-resolution enhanced RGB training preserved more detail for small aerial targets and improved performance over the initial RGB baseline, while training on video-derived frames caused overfitting because adjacent frames were highly correlated. For infrared inputs, isolated training learned modality-specific features more consistently than fine-tuning an RGB checkpoint, which introduced noise into the model. I therefore selected the enhanced RGB and isolated infrared checkpoints for the final pipeline. Their detections are passed to ByteTrack, which associates each object across consecutive frames and assigns it a persistent ID. Maintaining that identity is essential for constructing trajectories, producing consistent annotations, and measuring frame-to-frame displacement for vehicle speed estimation.',
        carousel: [
          {
            src: 'projects/uav-rgb-training-comparison.png',
            alt: 'Bar chart comparing initial and enhanced RGB training evaluation metrics',
            title: 'Comparison between Initial vs. Enhanced RGB Training.',
          },
          {
            src: 'projects/uav-infrared-validation-metrics.png',
            alt: 'Line chart of infrared validation detection metrics across training epochs',
            title: 'Validation Metrics during Infrared Training across Epochs.',
          },
          {
            src: 'projects/uav-infrared-over-rgb-validation-metrics.png',
            alt: 'Line chart of infrared-over-RGB validation detection metrics across training epochs',
            title: 'Validation Metrics during Infrared Training over RGB Training across Epochs.',
          },
          {
            src: 'projects/uav-infrared-checkpoint-comparison.png',
            alt: 'Bar chart comparing isolated infrared and infrared-over-RGB checkpoints',
            title: 'Comparison between Isolated Infrared vs. Infrared over RGB Training',
          },
        ],
      },
      speedEstimator: {
        title: 'Speed Estimator',
        content: 'I designed a class-aware speed estimator that converts tracked image motion into real-world vehicle speed using only information available during flight. For each ByteTrack ID, the estimator divides the object’s known physical dimensions by its bounding-box dimensions to calculate horizontal and vertical metres-per-pixel ratios, then combines and smooths them into a local scale. It measures the frame-to-frame displacement of a representative point and uses the video’s frame rate to convert that pixel movement into physical speed. To compensate for UAV movement, I used Lucas-Kanade optical flow to estimate background motion and infer the camera’s direction. That direction is combined with speed data from the UAV’s sensors to form a camera-velocity vector, which is added to the vehicle’s relative-velocity vector to recover its estimated ground speed.',
        carousel: [
          {
            src: 'projects/uav-speed-ground-truth-comparison.png',
            alt: 'Line chart comparing class-aware vehicle speed estimates with ground-truth speed values',
            title: 'Class Aware Speed Estimations vs. Ground Truth Values.',
          },
          {
            src: 'projects/uav-speed-annotated-output.png',
            alt: 'UAV footage showing calculated camera motion, a tracked car with its estimated speed, and the ground-truth speed',
            title: 'Calculated Camera Motion on Top Left, Calculated Speed of Tracked Car over Bounding Box, Ground Truth speed at Bottom Right',
          },
          {
            src: 'projects/uav-speed-estimator-explanation.png',
            alt: 'Diagram explaining how object dimensions, frame rate, tracked motion, and UAV motion are combined to estimate vehicle speed',
            title: 'Simplified Explanation of Speed Estimator',
          },
        ],
      },
      architecture: {
        title: 'Architecture',
        content: 'With each local RF-DETR training epoch taking several hours, I designed a managed Google Cloud workflow to accelerate experimentation and remove its dependence on a single workstation. I used Vertex AI Workbench to prepare the training code and build a Docker image, Artifact Registry to store the versioned container, and Vertex AI Custom Training to execute it on an n1-standard-8 machine with an NVIDIA Tesla V100 GPU. Three Cloud Storage buckets separately managed the COCO dataset, training logs and metrics, and versioned model checkpoints. During each run, the container retrieved its inputs, validated the dataset, performed a forward-pass sanity check, and continuously persisted metrics and checkpoints. This architecture made long-running experiments reproducible, auditable, and recoverable while providing a clear path toward distributed training in the future.',
        carousel: [
          {
            src: 'projects/uav-google-cloud-training-architecture.png',
            alt: 'Architecture diagram of an RF-DETR model-training workflow using a local machine, Cloud Storage, Vertex AI, Docker, and Artifact Registry',
            title: 'Architecture Diagram Displaying Model Training on Google Cloud',
          },
        ],
      },
      video: {
        title: 'Video',
        embedUrl: 'https://www.youtube-nocookie.com/embed/jMFFpLjFEec',
        embedTitle: 'Object Identification via UAV Camera demonstration',
      },
    },
  },
  SpecializationExplorer: {
    tabLabel: 'Specialization Explorer',
    tabIcon: 'projects/specializationexplorer-icon.png',
    title: 'Specialization Explorer',
    technologies: '',
    date: '',
    subsections: {
      intro: { title: 'Intro', content: 'hello world' },
      architecture: { title: 'Architecture', content: 'hello world' },
      flows: { title: 'Flows', content: 'hello world' },
    },
  },
  VCI: {
    tabLabel: 'VCI',
    tabIcon: 'projects/vci-icon.png',
    title: 'VCI',
    technologies: '',
    date: '',
    subsections: {
      intro: { title: 'Intro', content: 'hello world' },
      architecture: { title: 'Architecture', content: 'hello world' },
      flows: { title: 'Flows', content: 'hello world' },
    },
  },
  StudentAdvising: {
    tabLabel: 'Student Advising',
    tabIcon: 'projects/studentadvising-icon.png',
    title: 'Student Advising',
    technologies: '',
    date: '',
    subsections: {
      intro: { title: 'Intro', content: 'hello world' },
      architecture: { title: 'Architecture', content: 'hello world' },
      flows: { title: 'Flows', content: 'hello world' },
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
  const [selectedSubsection, setSelectedSubsection] = useState(null);
  const [selectedView, setSelectedView] = useState(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const project = projects[selectedProject];
  const panelId = `project-panel-${selectedProject.toLowerCase()}`;
  const subsectionEntries = Object.entries(project.subsections ?? {});
  const activeSubsectionKey = subsectionEntries.some(([key]) => key === selectedSubsection)
    ? selectedSubsection
    : subsectionEntries[0]?.[0];
  const activeSubsection = project.subsections?.[activeSubsectionKey];
  const viewEntries = Object.entries(activeSubsection?.views ?? {});
  const activeViewKey = viewEntries.some(([key]) => key === selectedView)
    ? selectedView
    : viewEntries[0]?.[0];
  const activeView = activeSubsection?.views?.[activeViewKey];
  const displayedSubsection = activeView ?? activeSubsection;
  const carouselItems = displayedSubsection?.carousel ?? [];
  const activeCarouselIndex = carouselItems.length
    ? selectedMediaIndex % carouselItems.length
    : 0;
  const activeMedia = carouselItems[activeCarouselIndex];
  const subsectionParagraphs = displayedSubsection?.content
    ? (Array.isArray(displayedSubsection.content) ? displayedSubsection.content : [displayedSubsection.content])
    : [];
  const subsectionPoints = displayedSubsection?.numberedPoints ?? [];
  const subsectionPanelId = `${panelId}-subsection-${activeSubsectionKey}`;
  const bullets = project.section?.bullets ?? [];
  const bulletSplitIndex = Math.ceil(bullets.length / 2);
  const bulletColumns = [
    bullets.slice(0, bulletSplitIndex),
    bullets.slice(bulletSplitIndex),
  ].filter((column) => column.length > 0);

  const selectProject = (key) => {
    setSelectedProject(key);
    setSelectedSubsection(Object.keys(projects[key].subsections ?? {})[0] ?? null);
    setSelectedView(null);
    setSelectedMediaIndex(0);
  };

  const selectSubsection = (key) => {
    setSelectedSubsection(key);
    setSelectedView(null);
    setSelectedMediaIndex(0);
  };

  const selectView = (key) => {
    setSelectedView(key);
    setSelectedMediaIndex(0);
  };

  const showPreviousMedia = () => {
    setSelectedMediaIndex((index) => (
      (index - 1 + carouselItems.length) % carouselItems.length
    ));
  };

  const showNextMedia = () => {
    setSelectedMediaIndex((index) => (index + 1) % carouselItems.length);
  };

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
              onClick={() => selectProject(key)}
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
          <div className={styles.projectIdentity}>
            <h2>{project.title}</h2>
            {project.technologies && <h3>{project.technologies}</h3>}
            {project.date && <p>{project.date}</p>}
          </div>

          {subsectionEntries.length > 0 && (
            <div
              className={styles.subsectionTabs}
              role="tablist"
              aria-label={`${project.title} sections`}
            >
              {subsectionEntries.map(([key, subsection]) => {
                const isSelected = activeSubsectionKey === key;

                return (
                  <button
                    key={key}
                    id={`${panelId}-subsection-tab-${key}`}
                    className={`${styles.subsectionTab} ${isSelected ? styles.activeSubsection : ''}`}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={isSelected ? subsectionPanelId : undefined}
                    onClick={() => selectSubsection(key)}
                  >
                    {subsection.title}
                  </button>
                );
              })}
            </div>
          )}
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

          {activeSubsection && (
            <section
              key={activeSubsectionKey}
              id={subsectionPanelId}
              className={`${styles.subsectionContent} ${activeMedia && viewEntries.length === 0 ? styles.mediaSubsection : ''} ${viewEntries.length > 0 ? styles.flowSubsection : ''}`}
              role="tabpanel"
              aria-labelledby={`${panelId}-subsection-tab-${activeSubsectionKey}`}
            >
              {viewEntries.length > 0 && (
                <div
                  className={styles.viewTabs}
                  role="group"
                  aria-label={`${project.title} flow views`}
                >
                  {viewEntries.map(([key, view]) => {
                    const isSelected = activeViewKey === key;

                    return (
                      <button
                        key={key}
                        className={`${styles.viewTab} ${isSelected ? styles.activeView : ''}`}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => selectView(key)}
                      >
                        {view.title}
                      </button>
                    );
                  })}
                </div>
              )}
              {(subsectionParagraphs.length > 0 || subsectionPoints.length > 0) && (
                <div className={styles.subsectionText}>
                  {subsectionParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {subsectionPoints.length > 0 && (
                    <ol className={styles.numberedPoints}>
                      {subsectionPoints.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ol>
                  )}
                </div>
              )}
              {displayedSubsection.embedUrl && (
                <div className={styles.videoEmbed}>
                  <iframe
                    src={displayedSubsection.embedUrl}
                    title={displayedSubsection.embedTitle}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}
              {displayedSubsection.images?.length > 0 && (
                <div className={styles.subsectionImages}>
                  {displayedSubsection.images.map((image) => (
                    <img
                      key={image.src}
                      className={styles.subsectionImage}
                      src={getImageUrl(image.src)}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              )}
              {activeMedia && (
                <div
                  className={`${styles.subsectionCarousel} ${carouselItems.length === 1 ? styles.singleCarouselItem : ''}`}
                  role="group"
                  aria-label={`${activeView?.title ?? activeSubsection.title} images`}
                >
                  {carouselItems.length > 1 && (
                    <button
                      className={styles.carouselButton}
                      type="button"
                      aria-label="Show previous image"
                      onClick={showPreviousMedia}
                    >
                      <span aria-hidden="true">&#8249;</span>
                    </button>
                  )}

                  <figure className={styles.carouselFigure} aria-live="polite">
                    <img
                      key={activeMedia.src}
                      className={styles.carouselImage}
                      src={getImageUrl(activeMedia.src)}
                      alt={activeMedia.alt}
                      loading="lazy"
                      decoding="async"
                    />
                    {activeMedia.description ? (
                      <figcaption className={styles.carouselDescription}>
                        {activeMedia.description}
                      </figcaption>
                    ) : activeMedia.title && (
                      <figcaption className={styles.carouselCaption}>
                        {activeMedia.title}
                      </figcaption>
                    )}
                    {carouselItems.length > 1 && (
                      <span className={styles.carouselPosition}>
                        {activeCarouselIndex + 1} / {carouselItems.length}
                      </span>
                    )}
                  </figure>

                  {carouselItems.length > 1 && (
                    <button
                      className={styles.carouselButton}
                      type="button"
                      aria-label="Show next image"
                      onClick={showNextMedia}
                    >
                      <span aria-hidden="true">&#8250;</span>
                    </button>
                  )}
                </div>
              )}
            </section>
          )}
        </div>
      </article>
    </section>
  );
};
