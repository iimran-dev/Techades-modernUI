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

export const teamMembers: TeamMember[] = names.map((name, i) => ({
  id: i + 1,
  name,
  role: roles[i],
  yearsExp: Math.floor(Math.random() * 12) + 3,
  skills: skillsList[i],
  color: avatarColors[i],
  location: locations[i],
  projects: Math.floor(Math.random() * 40) + 10,
  rating: 4 + Math.random(),
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

export const worldLocations = [
  { name: 'India', x: 68, y: 48, team: 28, flag: '🇮🇳' },
  { name: 'Dubai', x: 60, y: 42, team: 3, flag: '🇦🇪' },
  { name: 'Qatar', x: 57, y: 40, team: 2, flag: '🇶🇦' },
  { name: 'Singapore', x: 76, y: 55, team: 2, flag: '🇸🇬' },
  { name: 'Malaysia', x: 74, y: 56, team: 1, flag: '🇲🇾' },
  { name: 'UK', x: 47, y: 25, team: 2, flag: '🇬🇧' },
  { name: 'USA', x: 20, y: 35, team: 2, flag: '🇺🇸' },
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
  'React', 'Next.js', 'Node.js', 'PHP', 'Flutter', 'Azure',
  'Docker', 'OpenAI', 'Python', 'Laravel', '.NET', 'TypeScript',
  'AWS', 'Vue.js', 'Angular', 'Swift', 'Kotlin', 'Go',
  'GraphQL', 'MongoDB', 'PostgreSQL', 'Redis', 'Kubernetes', 'Terraform',
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
