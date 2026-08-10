export const ACCENT = {
  purple: '#6C4CF1',
  orange: '#FF7A32',
  blue: '#3F8CFF',
  cyan: '#00C2FF',
} as const;

export const GRADIENT = {
  purpleToOrange: 'linear-gradient(135deg, #6C4CF1 0%, #FF7A32 100%)',
  purpleToBlue: 'linear-gradient(135deg, #6C4CF1 0%, #3F8CFF 100%)',
  blueToCyan: 'linear-gradient(135deg, #3F8CFF 0%, #00C2FF 100%)',
  orangeToCyan: 'linear-gradient(135deg, #FF7A32 0%, #00C2FF 100%)',
  multi: 'linear-gradient(135deg, #6C4CF1 0%, #3F8CFF 50%, #00C2FF 100%)',
} as const;

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  yearsExp: number;
  skills: string[];
  color: string;
  location: string;
  projects: number;
  rating: number;
}

export interface ServiceOffer {
  id: number;
  name: string;
  category: string;
  shortCode: string;
  description: string;
  color: string;
  icon: string;
}

export const techServices: ServiceOffer[] = [
  // 1. Experience Design
  { id: 1, name: 'UI/UX Design', category: 'Experience Design', shortCode: 'UX', description: 'User-centered interfaces & intuitive web/mobile user experiences.', color: '#6C4CF1', icon: 'SiFigma' },
  { id: 2, name: 'Brand Identity', category: 'Experience Design', shortCode: 'ID', description: 'Logo design, visual language & brand positioning systems.', color: '#EC4899', icon: 'Sparkles' },
  { id: 3, name: 'Wireframing & Prototyping', category: 'Experience Design', shortCode: 'PR', description: 'Interactive prototypes & user flow architecture.', color: '#FF7A32', icon: 'Layers' },
  { id: 4, name: 'Design Systems', category: 'Experience Design', shortCode: 'DS', description: 'Scalable UI component libraries & design tokens.', color: '#8B5CF6', icon: 'Boxes' },
  { id: 5, name: 'Motion Graphics', category: 'Experience Design', shortCode: 'MG', description: 'Engaging animations, micro-interactions & video assets.', color: '#F59E0B', icon: 'Video' },
  { id: 6, name: 'Content Strategy', category: 'Experience Design', shortCode: 'CS', description: 'Conversion copy, brand messaging & technical writing.', color: '#06B6D4', icon: 'FileText' },

  // 2. Digital Presence
  { id: 7, name: 'Custom Web Apps', category: 'Digital Presence', shortCode: 'WEB', description: 'High-performance Next.js & React digital platforms.', color: '#3F8CFF', icon: 'SiReact' },
  { id: 8, name: 'E-Commerce Solutions', category: 'Digital Presence', shortCode: 'EC', description: 'Shopify, Headless Commerce & online store development.', color: '#10B981', icon: 'SiShopify' },
  { id: 9, name: 'Landing Pages & Portals', category: 'Digital Presence', shortCode: 'LP', description: 'High-converting lead generation pages & customer portals.', color: '#00C2FF', icon: 'Layout' },
  { id: 10, name: 'CMS & WordPress', category: 'Digital Presence', shortCode: 'CMS', description: 'Custom headless CMS & flexible content management.', color: '#6366F1', icon: 'SiWordpress' },
  { id: 11, name: 'Progressive Web Apps', category: 'Digital Presence', shortCode: 'PWA', description: 'Offline-capable, app-like browser experiences.', color: '#F43F5E', icon: 'AppWindow' },
  { id: 12, name: 'Front-End Engineering', category: 'Digital Presence', shortCode: 'FE', description: 'Pixel-perfect, responsive HTML5, CSS3 & TypeScript.', color: '#14B8A6', icon: 'Code2' },

  // 3. Software Engineering
  { id: 13, name: 'Enterprise Software', category: 'Software Development', shortCode: 'ENT', description: 'Tailored enterprise ERP, CRM & custom software systems.', color: '#7C3AED', icon: 'Building2' },
  { id: 14, name: 'API & Microservices', category: 'Software Development', shortCode: 'API', description: 'RESTful, GraphQL & gRPC scalable microservices.', color: '#3B82F6', icon: 'SiGraphql' },
  { id: 15, name: 'Back-End Architecture', category: 'Software Development', shortCode: 'BE', description: 'Node.js, Python & Java high-throughput server backends.', color: '#059669', icon: 'SiNodedotjs' },
  { id: 16, name: 'Database Management', category: 'Software Development', shortCode: 'DB', description: 'PostgreSQL, Redis, MongoDB & SQL optimization.', color: '#D946EF', icon: 'SiPostgresql' },
  { id: 17, name: 'Legacy Modernization', category: 'Software Development', shortCode: 'LEG', description: 'System refactoring, migration & code modernization.', color: '#F97316', icon: 'RefreshCw' },
  { id: 18, name: 'SaaS Product Engineering', category: 'Software Development', shortCode: 'SAAS', description: 'Multi-tenant SaaS products built for rapid scaling.', color: '#0EA5E9', icon: 'Rocket' },

  // 4. Cloud & DevOps
  { id: 19, name: 'Cloud Infrastructure', category: 'Cloud & Infrastructure', shortCode: 'CLOUD', description: 'AWS, Azure & Google Cloud architecture & deployment.', color: '#00A4EF', icon: 'Cloud' },
  { id: 20, name: 'DevOps & CI/CD', category: 'Cloud & Infrastructure', shortCode: 'DEVOPS', description: 'Automated build, test & deployment pipelines.', color: '#FF9900', icon: 'SiDocker' },
  { id: 21, name: 'Kubernetes & Docker', category: 'Cloud & Infrastructure', shortCode: 'K8S', description: 'Container orchestration & cloud-native scaling.', color: '#2563EB', icon: 'SiKubernetes' },
  { id: 22, name: 'Serverless Solutions', category: 'Cloud & Infrastructure', shortCode: 'EDGE', description: 'Event-driven AWS Lambda & Vercel edge functions.', color: '#A855F7', icon: 'SiVercel' },
  { id: 23, name: 'Infrastructure as Code', category: 'Cloud & Infrastructure', shortCode: 'IAC', description: 'Terraform & CloudFormation automated infra provisioning.', color: '#4F46E5', icon: 'SiTerraform' },
  { id: 24, name: 'SRE & Monitoring', category: 'Cloud & Infrastructure', shortCode: 'SRE', description: '24/7 uptime monitoring, Datadog & alerting systems.', color: '#EF4444', icon: 'SiDatadog' },

  // 5. AI, Automation & Analytics
  { id: 25, name: 'Artificial Intelligence', category: 'AI & Automation', shortCode: 'AI', description: 'GenAI integration, LLMs & custom AI model deployments.', color: '#00C2FF', icon: 'Bot' },
  { id: 26, name: 'Machine Learning', category: 'AI & Automation', shortCode: 'ML', description: 'Predictive modeling, PyTorch & computer vision.', color: '#6C4CF1', icon: 'SiPython' },
  { id: 27, name: 'RPA & Automation', category: 'AI & Automation', shortCode: 'RPA', description: 'Robotic process automation streamlining workflows.', color: '#FF7A32', icon: 'Cog' },
  { id: 28, name: 'Business Intelligence', category: 'AI & Automation', shortCode: 'BI', description: 'BI reporting, data warehouses & executive dashboards.', color: '#10B981', icon: 'BarChart3' },
  { id: 29, name: 'Data Analytics', category: 'AI & Automation', shortCode: 'DATA', description: 'Big data processing, pipelines & actionable insights.', color: '#8B5CF6', icon: 'LineChart' },
  { id: 30, name: 'NLP & Chatbots', category: 'AI & Automation', shortCode: 'NLP', description: 'Conversational AI agents, RAG & text processing.', color: '#EC4899', icon: 'MessageSquare' },

  // 6. Mobile & Marketing Solutions
  { id: 31, name: 'Mobile App Development', category: 'Mobile & Marketing', shortCode: 'APP', description: 'Native iOS & Android mobile applications.', color: '#3F8CFF', icon: 'Smartphone' },
  { id: 32, name: 'Flutter & React Native', category: 'Mobile & Marketing', shortCode: 'MOB', description: 'Cross-platform mobile apps built from single codebase.', color: '#06B6D4', icon: 'SiFlutter' },
  { id: 33, name: 'Online Reputation Mgmt', category: 'Mobile & Marketing', shortCode: 'ORM', description: 'Digital presence strategies & brand goodwill management.', color: '#F59E0B', icon: 'ShieldCheck' },
  { id: 34, name: 'SEO & Growth Marketing', category: 'Mobile & Marketing', shortCode: 'SEO', description: 'Search engine optimization & organic traffic growth.', color: '#10B981', icon: 'Search' },
  { id: 35, name: 'Cybersecurity Audit', category: 'Mobile & Marketing', shortCode: 'SEC', description: 'Penetration testing, OWASP & security compliance.', color: '#DC2626', icon: 'Lock' },
  { id: 36, name: 'Technical Consulting', category: 'Mobile & Marketing', shortCode: 'CON', description: 'Architecture reviews & technology roadmap strategy.', color: '#6366F1', icon: 'Lightbulb' },
];

const avatarColors = [
  '#6C4CF1', '#FF7A32', '#3F8CFF', '#00C2FF', '#8B5CF6',
  '#EC4899', '#F59E0B', '#10B981', '#06B6D4', '#F43F5E',
  '#8B5CF6', '#14B8A6', '#F97316', '#6366F1', '#A855F7',
  '#0EA5E9', '#22C55E', '#E11D48', '#D946EF', '#64748B',
  '#3B82F6', '#EF4444', '#84CC16', '#06B6D4', '#F59E0B',
  '#7C3AED', '#DB2777', '#059669', '#2563EB', '#DC2626',
  '#4F46E5', '#9333EA', '#0891B2', '#65A30D', '#EA580C',
  '#7C3AED', '#BE185D', '#047857', '#1D4ED8', '#B91C1C',
];

const names = [
  'Arjun Mehta', 'Priya Sharma', 'Rahul Krishnan', 'Ananya Iyer',
  'Vikram Patel', 'Sneha Reddy', 'Aditya Nair', 'Kavitha Menon',
  'Rohan Deshmukh', 'Nisha Gupta', 'Karthik Raman', 'Divya Subramaniam',
  'Amit Joshi', 'Meera Pillai', 'Suresh Verma', 'Lakshmi Narayan',
  'Deepak Singh', 'Anjali Rao', 'Sanjay Kapoor', 'Pooja Thakur',
  'Rajesh Kumar', 'Sunita Devi', 'Manish Tiwari', 'Shalini Saxena',
  'Naveen George', 'Revathi Krishnan', 'Prakash Hegde', 'Bhavana Kulkarni',
  'Ashwin Bhat', 'Geeta Viswanathan', 'Siddharth Mishra', 'Ritu Agarwal',
  'Harish Chandra', 'Kamala Das', 'Venkat Raghavan', 'Usha Nair',
  'Tarun Sharma', 'Swathi Pillai', 'Mohan Lal', 'Leela Devi',
];

const roles = [
  'Full Stack Developer', 'UI/UX Designer', 'Backend Engineer', 'DevOps Engineer',
  'Mobile Developer', 'Data Scientist', 'Cloud Architect', 'QA Lead',
  'Frontend Developer', 'Project Manager', 'AI/ML Engineer', 'System Architect',
  'React Developer', 'Node.js Developer', 'Python Developer', 'Flutter Developer',
  'Database Admin', 'Security Engineer', 'Tech Lead', 'Business Analyst',
  'SRE Engineer', 'Blockchain Developer', 'IoT Specialist', 'Graphic Designer',
  'Product Manager', 'Scrum Master', 'Solution Architect', 'Angular Developer',
  'AWS Specialist', 'Azure Engineer', 'API Architect', 'Performance Engineer',
  'Integration Specialist', 'Tech Writer', 'Junior Developer', 'QA Engineer',
  'Vue.js Developer', '.NET Developer', 'PHP Developer', 'Laravel Developer',
];

const skillsList = [
  ['React', 'TypeScript', 'Next.js', 'Tailwind'],
  ['Figma', 'Adobe XD', 'UI Design', 'Prototyping'],
  ['Node.js', 'Python', 'PostgreSQL', 'Redis'],
  ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
  ['Flutter', 'React Native', 'Swift', 'Kotlin'],
  ['TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'],
  ['AWS', 'Azure', 'GCP', 'Kubernetes'],
  ['Selenium', 'Cypress', 'Jest', 'Testing'],
  ['React', 'Vue.js', 'CSS', 'JavaScript'],
  ['Agile', 'Scrum', 'Jira', 'Leadership'],
  ['OpenAI', 'LangChain', 'Python', 'ML'],
  ['Microservices', 'System Design', 'Java', 'Go'],
  ['React', 'Redux', 'GraphQL', 'REST API'],
  ['Node.js', 'Express', 'MongoDB', 'Socket.io'],
  ['Python', 'Django', 'Flask', 'FastAPI'],
  ['Flutter', 'Dart', 'Firebase', 'REST API'],
  ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
  ['Cybersecurity', 'Pen Testing', 'OWASP', 'Compliance'],
  ['Architecture', 'Team Lead', 'Mentoring', 'Strategy'],
  ['Requirements', 'Stakeholder Mgmt', 'Data Analysis'],
  ['CI/CD', 'Monitoring', 'AWS', 'Linux'],
  ['Solidity', 'Web3', 'Ethereum', 'DeFi'],
  ['IoT', 'MQTT', 'Edge Computing', 'Sensors'],
  ['Illustrator', 'Photoshop', 'Branding', 'Motion'],
  ['Roadmap', 'Analytics', 'UX Research', 'A/B Testing'],
  ['Scrum', 'Kanban', 'Agile', 'Coaching'],
  ['Enterprise', 'Cloud', 'Integration', 'Design'],
  ['Angular', 'RxJS', 'NgRx', 'TypeScript'],
  ['AWS', 'Lambda', 'S3', 'CloudFront'],
  ['Azure', 'DevOps', 'Pipelines', 'Active Directory'],
  ['REST', 'GraphQL', 'gRPC', 'Microservices'],
  ['Lighthouse', 'Web Vitals', 'Optimization'],
  ['MuleSoft', 'Kafka', 'RabbitMQ', 'ESB'],
  ['Documentation', 'API Docs', 'Technical Writing'],
  ['React', 'JavaScript', 'CSS', 'HTML'],
  ['Testing', 'Automation', 'Jest', 'Cypress'],
  ['Vue.js', 'Nuxt.js', 'Pinia', 'TypeScript'],
  ['.NET', 'C#', 'Azure', 'SQL Server'],
  ['PHP', 'Laravel', 'MySQL', 'REST API'],
  ['Laravel', 'Vue.js', 'Livewire', 'MySQL'],
];

const locations = [
  'India', 'India', 'India', 'India', 'India', 'India', 'India', 'India',
  'India', 'India', 'India', 'India', 'India', 'India', 'India', 'India',
  'Dubai', 'Qatar', 'Singapore', 'Malaysia', 'UK', 'USA', 'India', 'India',
  'India', 'India', 'India', 'India', 'India', 'India', 'India', 'India',
  'India', 'India', 'India', 'India', 'India', 'India', 'India', 'India',
];

function seededNum(seed: number, min: number, max: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  const rnd = x - Math.floor(x);
  return Math.floor(rnd * (max - min + 1)) + min;
}

export const teamMembers: TeamMember[] = names.map((name, i) => ({
  id: i + 1,
  name,
  role: roles[i],
  yearsExp: seededNum(i + 1, 3, 14),
  skills: skillsList[i],
  color: avatarColors[i],
  location: locations[i],
  projects: seededNum(i + 17, 10, 50),
  rating: Number((4.5 + (seededNum(i + 31, 0, 4) / 10)).toFixed(1)),
}));

export const featuredExperts = [
  {
    id: 1,
    name: 'Arjun Mehta',
    role: 'Founder & CEO',
    yearsExp: 18,
    skills: ['Entrepreneurship', 'Product Strategy', 'System Architecture', 'Team Building'],
    image: '/team/founder.png',
    projects: 150,
    rating: 5.0,
    color: ACCENT.purple,
    bio: 'Visionary leader with 18+ years building digital products across industries.',
  },
  {
    id: 2,
    name: 'Rahul Krishnan',
    role: 'Technology Architect',
    yearsExp: 15,
    skills: ['System Design', 'Cloud Architecture', 'Microservices', 'DevOps'],
    image: '/team/architect.png',
    projects: 120,
    rating: 4.9,
    color: ACCENT.blue,
    bio: 'Architect of scalable systems serving millions of users worldwide.',
  },
  {
    id: 3,
    name: 'Ananya Iyer',
    role: 'AI & ML Specialist',
    yearsExp: 10,
    skills: ['Machine Learning', 'NLP', 'Computer Vision', 'LLM Integration'],
    image: '/team/ai-specialist.png',
    projects: 80,
    rating: 4.8,
    color: ACCENT.cyan,
    bio: 'Pioneering AI solutions that transform business operations and user experiences.',
  },
  {
    id: 4,
    name: 'Priya Sharma',
    role: 'Design Lead',
    yearsExp: 12,
    skills: ['UI/UX Design', 'Design Systems', 'User Research', 'Figma'],
    image: '/team/design-lead.png',
    projects: 95,
    rating: 4.9,
    color: ACCENT.orange,
    bio: 'Crafting pixel-perfect experiences that users love and businesses rely on.',
  },
];

export const stats = [
  { value: 40, suffix: '+', label: 'Experts', icon: 'Users' },
  { value: 12, suffix: '+', label: 'Avg. Experience (Yrs)', icon: 'Award' },
  { value: 150, suffix: '+', label: 'Clients', icon: 'Handshake' },
  { value: 300, suffix: '+', label: 'Projects', icon: 'FolderOpen' },
  { value: 7, suffix: '+', label: 'Countries', icon: 'Globe' },
  { value: 19, suffix: '+', label: 'Technology Domains', icon: 'Layers' },
];

export const teamDNA = [
  { label: 'Engineering', value: 35, color: ACCENT.purple },
  { label: 'Design', value: 15, color: ACCENT.orange },
  { label: 'AI/ML', value: 12, color: ACCENT.cyan },
  { label: 'QA', value: 12, color: ACCENT.blue },
  { label: 'Cloud & DevOps', value: 14, color: '#8B5CF6' },
  { label: 'Marketing & PM', value: 12, color: '#EC4899' },
];

export const coreValues = [
  { title: 'Ownership', description: 'We treat every project as our own, taking full responsibility from concept to delivery.', icon: 'Shield' },
  { title: 'Innovation', description: 'We push boundaries and embrace new technologies to solve complex problems creatively.', icon: 'Lightbulb' },
  { title: 'Transparency', description: 'Open communication and honest feedback are the foundation of every relationship.', icon: 'Eye' },
  { title: 'Quality', description: 'We ship production-grade code with rigorous testing and attention to detail.', icon: 'CheckCircle' },
  { title: 'Long-term Relationships', description: 'We build partnerships, not just projects. Our clients stay for years.', icon: 'Heart' },
];

export interface WorldLocation {
  name: string;
  x: number;
  y: number;
  coordinates: [number, number];
  team: number;
  flag: string;
}

export const worldLocations: WorldLocation[] = [
  { name: 'India', x: 68, y: 48, coordinates: [78.9629, 20.5937], team: 28, flag: '🇮🇳' },
  { name: 'Dubai', x: 60, y: 42, coordinates: [55.2708, 25.2048], team: 3, flag: '🇦🇪' },
  { name: 'Qatar', x: 57, y: 40, coordinates: [51.5310, 25.2854], team: 2, flag: '🇶🇦' },
  { name: 'Singapore', x: 76, y: 55, coordinates: [103.8198, 1.3521], team: 2, flag: '🇸🇬' },
  { name: 'Malaysia', x: 74, y: 56, coordinates: [101.6869, 3.1390], team: 1, flag: '🇲🇾' },
  { name: 'UK', x: 47, y: 25, coordinates: [-0.1276, 51.5074], team: 2, flag: '🇬🇧' },
  { name: 'USA', x: 20, y: 35, coordinates: [-74.0060, 40.7128], team: 2, flag: '🇺🇸' },
];

export const worldConnections = [
  { from: 'India', to: 'Dubai' },
  { from: 'India', to: 'Qatar' },
  { from: 'India', to: 'Singapore' },
  { from: 'India', to: 'Malaysia' },
  { from: 'India', to: 'UK' },
  { from: 'India', to: 'USA' },
];

export const continentPaths = [
  // North America & Canada
  'M 8,22 C 10,14 18,12 28,14 C 33,16 35,22 33,30 C 30,36 24,42 21,43 C 18,41 16,36 12,32 C 9,28 7,24 8,22 Z M 22,10 C 26,8 30,9 33,12 C 29,14 25,14 22,10 Z',
  // South America
  'M 24,47 C 30,45 36,48 35,62 C 33,74 28,82 25,78 C 22,70 22,55 24,47 Z',
  // Europe
  'M 42,16 C 46,14 53,15 56,20 C 54,26 48,28 44,26 C 41,23 41,18 42,16 Z',
  // UK & Ireland
  'M 45,21 C 47,20 48,21 47,24 C 45,25 44,23 45,21 Z',
  // Africa
  'M 43,32 C 54,29 63,33 61,46 C 58,60 52,67 47,65 C 43,58 41,43 43,32 Z',
  // Middle East & India / South Asia
  'M 55,34 C 62,32 72,36 71,52 C 67,54 62,48 57,44 C 54,40 54,36 55,34 Z',
  // East Asia & Siberia
  'M 56,14 C 66,11 84,13 90,20 C 93,28 86,40 78,44 C 68,46 59,38 57,28 C 55,20 54,16 56,14 Z',
  // Southeast Asia & Indonesia
  'M 74,48 C 78,48 84,52 82,58 C 76,60 72,56 74,48 Z',
  // Australia & New Zealand
  'M 75,58 C 84,56 90,60 88,72 C 81,77 75,74 74,65 Z M 91,72 C 93,71 94,74 92,76 C 90,75 90,73 91,72 Z',
];

export const capabilityRows = [
  { skill: 'Frontend', levels: [1, 2, 4, 8] },
  { skill: 'Backend', levels: [2, 3, 5, 7] },
  { skill: 'Mobile', levels: [1, 2, 4, 6] },
  { skill: 'AI / ML', levels: [2, 2, 5, 5] },
  { skill: 'Cloud', levels: [1, 3, 4, 6] },
  { skill: 'DevOps', levels: [1, 2, 5, 5] },
  { skill: 'QA', levels: [2, 3, 4, 5] },
  { skill: 'Design', levels: [1, 2, 5, 4] },
];

export const capabilityColumns = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const domains = [
  { name: 'Healthcare', icon: 'Heart', projects: 35, experience: '8+ years' },
  { name: 'Retail', icon: 'ShoppingCart', projects: 28, experience: '7+ years' },
  { name: 'Fintech', icon: 'Wallet', projects: 32, experience: '9+ years' },
  { name: 'Manufacturing', icon: 'Factory', projects: 20, experience: '6+ years' },
  { name: 'Government', icon: 'Landmark', projects: 15, experience: '5+ years' },
  { name: 'Construction', icon: 'HardHat', projects: 18, experience: '6+ years' },
  { name: 'Education', icon: 'GraduationCap', projects: 22, experience: '7+ years' },
  { name: 'Real Estate', icon: 'Building2', projects: 25, experience: '7+ years' },
  { name: 'Logistics', icon: 'Truck', projects: 20, experience: '5+ years' },
  { name: 'Hospitality', icon: 'Hotel', projects: 15, experience: '5+ years' },
];

export const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Vue.js', 'PostgreSQL', 'MongoDB',
  'GraphQL', 'REST API', 'Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe After Effects',
  'Adobe XD', 'UI/UX Design', 'Brand Identity', 'Motion Graphics', 'Design Systems', 'Blender',
];

export const certifications = [
  { name: 'Microsoft', color: '#00A4EF' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Google Cloud', color: '#4285F4' },
  { name: 'Oracle', color: '#F80000' },
  { name: 'Cisco', color: '#049FD9' },
  { name: 'Meta', color: '#1877F2' },
  { name: 'Scrum Alliance', color: '#009FDA' },
  { name: 'ISTQB', color: '#4C6FAE' },
];

export const funStats = [
  { value: 420000, suffix: '+', label: 'Lines of Code', icon: 'Code', color: ACCENT.purple },
  { value: 10500, suffix: '+', label: 'Commits', icon: 'GitCommit', color: ACCENT.blue },
  { value: 980, suffix: '+', label: 'Deployments', icon: 'Rocket', color: ACCENT.cyan },
  { value: 5000, suffix: '+', label: 'Meetings', icon: 'Video', color: ACCENT.orange },
  { value: 8700, suffix: '+', label: 'Coffee Cups', icon: 'Coffee', color: '#F59E0B' },
  { value: 640, suffix: '+', label: 'Late Night Releases', icon: 'Moon', color: '#8B5CF6' },
];
