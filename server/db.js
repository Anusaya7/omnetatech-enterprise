import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { Buffer } from 'node:buffer';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Safe resolution of data directory
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch {
  // Read-only filesystem in serverless environments
}

export function getDbFilePath() {
  if (process.env.DB_FILE_PATH) {
    return process.env.DB_FILE_PATH;
  }
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const tmpPath = path.join('/tmp', 'omnetatech-db.json');
    if (!fs.existsSync(tmpPath)) {
      try {
        if (fs.existsSync(DB_FILE)) {
          fs.copyFileSync(DB_FILE, tmpPath);
        }
      } catch {
        // ignore copy failure
      }
    }
    return tmpPath;
  }
  return DB_FILE;
}

// Password hashing utility using PBKDF2 (secure server-side hashing)
export function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(':')) return false;
  const [salt, originalHash] = storedHash.split(':');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(originalHash, 'hex'));
}

// Initial Seed Data preserving exact verified OmNetaTech information
const initialSeed = {
  admin: {
    id: 'admin-1',
    email: 'admin@omnetatech.com',
    name: 'OmNetaTech Admin',
    // Default password: Admin@OmNetaTech2026!
    passwordHash: hashPassword('Admin@OmNetaTech2026!'),
    updatedAt: new Date().toISOString()
  },
  sessions: [], // { token, userId, expiresAt }
  enquiries: [],
  notifications: [],
  services: [
    {
      id: 'svc-1',
      title: 'Software Development',
      slug: 'software-development',
      category: 'Core Engineering',
      shortDescription: 'Engineered backend systems, custom web software, and secure APIs designed to handle complex business operations efficiently.',
      description: 'We build custom business software tailored to your specific organizational workflows. Our development focus emphasizes clean architecture, database efficiency, secure endpoints, and maintainability for long-term scalability.',
      features: [
        'Custom Web Applications',
        'Business Software Solutions',
        'API Development & Integration',
        'Backend Systems & Microservices',
        'Database Architecture & Optimization'
      ],
      icon: 'Code',
      status: 'Published',
      displayOrder: 1,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'svc-2',
      title: 'Web Development',
      slug: 'web-development',
      category: 'Digital Presence',
      shortDescription: 'Modern, high-speed, and responsive business websites crafted to establish trust and convert visitors into active inquiries.',
      description: 'From corporate brand websites to dynamic client portals, we build fast, SEO-friendly, and mobile-responsive web platforms using modern web standards that represent your brand with technical authority.',
      features: [
        'Business & Corporate Websites',
        'Responsive Web Applications',
        'Custom E-commerce Solutions',
        'Content Management Platforms',
        'Website Maintenance & Speed Optimization'
      ],
      icon: 'Globe',
      status: 'Published',
      displayOrder: 2,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'svc-3',
      title: 'Mobile App Development',
      slug: 'mobile-app-development',
      category: 'Application Engineering',
      shortDescription: 'Intuitive native and cross-platform mobile apps for Android and iOS that provide smooth performance and delightful user experience.',
      description: 'We design and develop mobile applications that deliver consistent experiences across diverse devices. We handle state management, offline-first caching, push notifications, and secure backend synchronization.',
      features: [
        'Android Applications',
        'iOS Applications',
        'Cross-Platform Development (Flutter/React Native)',
        'Mobile API Integration',
        'App Maintenance & Store Publishing'
      ],
      icon: 'Smartphone',
      status: 'Published',
      displayOrder: 3,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'svc-4',
      title: 'UI/UX Design',
      slug: 'ui-ux-design',
      category: 'Product Design',
      shortDescription: 'User-centered interfaces that balance visual elegance, brand consistency, and frictionless user journeys across screens.',
      description: 'Great software starts with clear design. We map out user personas, wireframes, interactive prototypes, and production design systems to ensure users complete their goals without confusion.',
      features: [
        'Website & Portal UI Design',
        'Application & Dashboard UI',
        'User Experience & Wireframing',
        'Responsive Layout Systems',
        'Design Systems & Component Libraries'
      ],
      icon: 'Palette',
      status: 'Published',
      displayOrder: 4,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'svc-5',
      title: 'Cloud & DevOps',
      slug: 'cloud-devops',
      category: 'Infrastructure',
      shortDescription: 'Reliable cloud environments, automated deployment pipelines, and proactive server configuration for maximum uptime.',
      description: 'We help businesses set up, manage, and scale cloud environments across standard cloud providers. Our automated pipelines reduce manual deployment errors and ensure your applications run reliably.',
      features: [
        'Cloud Deployment & Hosting',
        'CI/CD Automated Pipelines',
        'Server Configuration & Management',
        'Performance & Load Optimization',
        'Backup & Disaster Recovery Planning'
      ],
      icon: 'Cloud',
      status: 'Published',
      displayOrder: 5,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'svc-6',
      title: 'Automation & AI',
      slug: 'automation-ai',
      category: 'Process Intelligence',
      shortDescription: 'Practical automation workflows and intelligent tools that eliminate repetitive tasks and accelerate business turnaround.',
      description: 'We integrate practical AI capabilities and workflow automations into existing operations—such as document processing, data extraction, and CRM updates—saving valuable team hours and reducing operational friction.',
      features: [
        'Business Process Automation',
        'AI-Powered Practical Features',
        'Workflow & Notification Automation',
        'Third-Party API Automation',
        'Intelligent Business Tools'
      ],
      icon: 'Bot',
      status: 'Published',
      displayOrder: 6,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'svc-7',
      title: 'IT Consulting',
      slug: 'it-consulting',
      category: 'Technology Advisory',
      shortDescription: 'Strategic guidance on technology selection, technical feasibility, architecture planning, and digital modernization roadmaps.',
      description: 'Whether you are planning a new software product or revamping legacy systems, our consulting services help you make informed architectural decisions, avoid costly technical debt, and plan realistic timelines.',
      features: [
        'Technology Stack Consulting',
        'System Architecture Planning',
        'Product Development Strategy',
        'Code & Infrastructure Technical Audits',
        'Digital Transformation Roadmaps'
      ],
      icon: 'Compass',
      status: 'Published',
      displayOrder: 7,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    }
  ],
  solutions: [
    {
      id: 'sol-1',
      title: 'Business Website Solutions',
      slug: 'business-website-solutions',
      tagline: 'Transforming digital presence into reliable lead pipelines',
      problem: 'Businesses frequently suffer from slow, outdated websites that fail to establish credibility or convert visitors into inquiries.',
      solution: 'We build modern, ultra-responsive corporate websites with clean messaging, mobile speed optimization, and clear call-to-actions.',
      benefit: 'Increased inbound inquiries, professional digital brand authority, and seamless viewing across mobile and desktop devices.',
      icon: 'Globe',
      status: 'Published',
      displayOrder: 1,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'sol-2',
      title: 'Custom Software Solutions',
      slug: 'custom-software-solutions',
      tagline: 'Tailored systems built around your operational workflows',
      problem: 'Generic off-the-shelf software rarely fits specific operational workflows, forcing teams to rely on clumsy spreadsheets.',
      solution: 'We develop bespoke web applications, internal dashboards, and database tools specifically mapped to your day-to-day operations.',
      benefit: 'Elimination of manual errors, faster team coordination, centralized data access, and full ownership of your technology.',
      icon: 'Database',
      status: 'Published',
      displayOrder: 2,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'sol-3',
      title: 'Automation Solutions',
      slug: 'automation-solutions',
      tagline: 'Eliminating repetitive manual bottlenecks across tools',
      problem: 'Valuable employee hours are wasted copying data between software, sending manual follow-ups, and compiling routine reports.',
      solution: 'We build automated pipelines connecting your emails, forms, databases, and third-party tools to trigger actions automatically.',
      benefit: 'Drastic reduction in repetitive manual tasks, faster customer response times, and higher employee productivity.',
      icon: 'Cpu',
      status: 'Published',
      displayOrder: 3,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'sol-4',
      title: 'Digital Product Development',
      slug: 'digital-product-development',
      tagline: 'From initial concept to production-ready digital products',
      problem: 'Startups and SMEs often struggle to turn software ideas into functional, reliable products without escalating development costs.',
      solution: 'We guide digital products through structured prototyping, MVP engineering, user testing, and scalable cloud deployment.',
      benefit: 'Clear milestones, predictable development velocity, and a well-architected software foundation ready for user growth.',
      icon: 'Layers',
      status: 'Published',
      displayOrder: 4,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'sol-5',
      title: 'E-commerce Solutions',
      slug: 'ecommerce-solutions',
      tagline: 'Fast and secure digital commerce platforms',
      problem: 'Online stores often struggle with clunky checkout flows, inventory mismatches, and poor performance during customer traffic spikes.',
      solution: 'We build custom, fast e-commerce platforms with streamlined payment gateways, catalog management, and automated order notifications.',
      benefit: 'Higher checkout completion rates, smooth customer purchasing experience, and simplified product administration.',
      icon: 'ShoppingCart',
      status: 'Published',
      displayOrder: 5,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'sol-6',
      title: 'Cloud & Infrastructure Solutions',
      slug: 'cloud-infrastructure-solutions',
      tagline: 'Dependable hosting and cloud architectures',
      problem: 'Unmanaged servers lead to unexpected downtime, slow load times, data loss vulnerabilities, and security concerns.',
      solution: 'We set up secure cloud hosting environments with automated backups, monitoring, and performance tuning.',
      benefit: 'Reliable application availability, peace of mind regarding data safety, and infrastructure that scales as your traffic expands.',
      icon: 'Cloud',
      status: 'Published',
      displayOrder: 6,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'sol-7',
      title: 'AI-Powered Business Solutions',
      slug: 'ai-powered-business-solutions',
      tagline: 'Practical AI implementations delivering tangible value',
      problem: 'Organizations want to leverage modern AI but struggle to identify realistic applications that actually assist their business operations.',
      solution: 'We implement targeted AI features such as intelligent document parsing, smart search across internal files, and automated chat assistance.',
      benefit: 'Faster information retrieval, automated first-line customer responses, and intelligent insights from your company data.',
      icon: 'Bot',
      status: 'Published',
      displayOrder: 7,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    }
  ],
  industries: [
    {
      id: 'ind-1',
      title: 'Healthcare',
      slug: 'healthcare',
      desc: 'Technology solutions for Healthcare clinics, practices, and health businesses: patient inquiry portals, digital booking systems, and responsive health service websites.',
      icon: 'HeartPulse',
      status: 'Published',
      displayOrder: 1,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'ind-2',
      title: 'Education',
      slug: 'education',
      desc: 'Technology solutions for Education institutions and training academies: student learning portals, course registration workflows, and educational content hubs.',
      icon: 'GraduationCap',
      status: 'Published',
      displayOrder: 2,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'ind-3',
      title: 'Finance',
      slug: 'finance',
      desc: 'Technology solutions for Finance firms and advisory services: client onboarding forms, invoice and billing integrations, and secure account access portals.',
      icon: 'Landmark',
      status: 'Published',
      displayOrder: 3,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'ind-4',
      title: 'Retail & E-commerce',
      slug: 'retail-ecommerce',
      desc: 'Technology solutions for Retail & E-commerce businesses: modern online storefronts, catalog management tools, and seamless payment gateway integrations.',
      icon: 'ShoppingBag',
      status: 'Published',
      displayOrder: 4,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'ind-5',
      title: 'Manufacturing',
      slug: 'manufacturing',
      desc: 'Technology solutions for Manufacturing units: internal operational trackers, supply scheduling dashboards, and distributor communication portals.',
      icon: 'Factory',
      status: 'Published',
      displayOrder: 5,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'ind-6',
      title: 'Real Estate',
      slug: 'real-estate',
      desc: 'Technology solutions for Real Estate agencies and developers: property showcases, dynamic lead inquiry forms, and virtual project presentation websites.',
      icon: 'Building2',
      status: 'Published',
      displayOrder: 6,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'ind-7',
      title: 'Logistics',
      slug: 'logistics',
      desc: 'Technology solutions for Logistics & transport providers: delivery status lookups, customer booking tools, and automated dispatch notification systems.',
      icon: 'Truck',
      status: 'Published',
      displayOrder: 7,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'ind-8',
      title: 'Professional Services',
      slug: 'professional-services',
      desc: 'Technology solutions for Legal, accounting, and consulting firms: authoritative corporate websites, appointment schedulers, and client intake workflows.',
      icon: 'Briefcase',
      status: 'Published',
      displayOrder: 8,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'ind-9',
      title: 'Startups & SMEs',
      slug: 'startups-smes',
      desc: 'Technology solutions for Startups & growing Indian businesses: agile MVP development, scalable web applications, and fast time-to-market software delivery.',
      icon: 'Rocket',
      status: 'Published',
      displayOrder: 9,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    }
  ],
  portfolio: [
    {
      id: 'proj-1',
      title: 'Business Management Platform',
      slug: 'business-management-platform',
      tag: 'web',
      badge: 'Sample Project',
      category: 'Web Application',
      icon: 'Database',
      summary: 'Centralized operations dashboard unifying client tracking, project milestones, and invoicing in one secure web portal.',
      challenge: 'The business was struggling with disconnected spreadsheets, misplaced client communication, and delayed billing reconciliations.',
      approach: 'Engineered a modular web application with role-based access, automated PDF invoice generation, and real-time operational status updates.',
      deliverables: [
        'Secure role-based dashboard for team and managers',
        'Automated billing and invoice generation',
        'Client task and milestone tracking module',
        'Database optimization for fast search and filtering'
      ],
      status: 'Published',
      displayOrder: 1,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'proj-2',
      title: 'E-commerce Retail Website',
      slug: 'ecommerce-retail-website',
      tag: 'ecommerce',
      badge: 'Sample Project',
      category: 'Digital Storefront',
      icon: 'ShoppingBag',
      summary: 'Modern, high-speed online shopping experience with seamless checkout, product catalogs, and inventory synchronization.',
      challenge: 'Existing online store experienced slow loading speeds on mobile devices and high checkout drop-off rates.',
      approach: 'Built a lightweight, responsive storefront with streamlined one-page checkout, Indian payment gateway integration, and automated order confirmation emails.',
      deliverables: [
        'Mobile-first responsive product catalog',
        'Payment gateway integration (UPI, Cards, NetBanking)',
        'Admin inventory and order dispatch panel',
        'Automated customer order status notifications'
      ],
      status: 'Published',
      displayOrder: 2,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'proj-3',
      title: 'Service Booking & Inquiry Portal',
      slug: 'service-booking-inquiry-portal',
      tag: 'web',
      badge: 'Selected Solution',
      category: 'Custom Web Application',
      icon: 'Code',
      summary: 'Automated booking workflow allowing customers to select services, pick available slots, and receive instant confirmations.',
      challenge: 'Handling appointments manually via phone calls led to double bookings, customer wait times, and staff scheduling errors.',
      approach: 'Created an intuitive booking portal with real-time calendar availability, automated reminder notifications, and an admin schedule overview.',
      deliverables: [
        'Interactive real-time calendar picker',
        'Automated email and SMS confirmation triggers',
        'Staff availability management dashboard',
        'Customer inquiry intake and follow-up tracker'
      ],
      status: 'Published',
      displayOrder: 3,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'proj-4',
      title: 'Customer & Operations Mobile App',
      slug: 'customer-operations-mobile-app',
      tag: 'mobile',
      badge: 'Selected Solution',
      category: 'Cross-Platform Mobile Application',
      icon: 'Smartphone',
      summary: 'Cross-platform Android and iOS application enabling on-the-go account management and real-time service tracking.',
      challenge: 'Field staff and end users required reliable access to project information without needing a desktop computer.',
      approach: 'Developed a cross-platform mobile application using modern frameworks, implementing offline caching and real-time cloud data sync.',
      deliverables: [
        'Cross-platform Android and iOS deployment',
        'Offline-first local caching mechanism',
        'Push notifications for critical status updates',
        'Intuitive touch-optimized user interface'
      ],
      status: 'Published',
      displayOrder: 4,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'proj-5',
      title: 'Business Workflow Automation Pipeline',
      slug: 'business-workflow-automation-pipeline',
      tag: 'automation',
      badge: 'Sample Project',
      category: 'Automation Platform',
      icon: 'Cpu',
      summary: 'Integrated data pipeline synchronizing incoming website inquiries directly with team communication channels and databases.',
      challenge: 'Valuable customer inquiries were sitting in mailboxes for hours before team members noticed and manually responded.',
      approach: 'Configured automated API webhooks linking contact forms, lead databases, and instant notifications to alert the team immediately.',
      deliverables: [
        'Instant multi-channel notifications on new lead arrival',
        'Centralized lead capture and deduplication',
        'Automated acknowledgement emails to clients',
        'Daily operational summary digests'
      ],
      status: 'Published',
      displayOrder: 5,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    }
  ],
  insights: [
    {
      id: 'ins-1',
      title: 'Key Considerations When Building Custom Web Applications for Growing Businesses',
      slug: 'custom-web-applications-growing-businesses',
      category: 'Software Development',
      author: 'OmNetaTech Engineering Team',
      date: 'August 2026',
      readTime: '6 min read',
      summary: 'Why off-the-shelf software often creates operational bottlenecks, and how custom software architectures help companies scale their workflows efficiently.',
      content: [
        'As organizations grow, their operational processes invariably diverge from generic software templates. While standard SaaS tools are excellent for early-stage validation, expanding companies soon encounter data silos, manual reconciliation steps, and subscription overhead.',
        'Custom web applications allow businesses to design databases and user interfaces directly around their actual operations. When architected cleanly, custom software provides proprietary data ownership, eliminates recurring seat licensing fees, and adapts smoothly as operational needs change.',
        'When planning a custom web application, teams should prioritize clean database schema design, modular API endpoints, and a component-driven frontend architecture to ensure long-term maintainability.'
      ],
      status: 'Published',
      displayOrder: 1,
      createdAt: '2026-08-15T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'ins-2',
      title: 'Practical Automation: Streamlining Operations Without Overcomplicating Tools',
      slug: 'practical-automation-streamlining-operations',
      category: 'AI & Automation',
      author: 'OmNetaTech Engineering Team',
      date: 'July 2026',
      readTime: '5 min read',
      summary: 'How small to mid-sized organizations can implement workflow automation and intelligent document tools to reduce daily manual tasks.',
      content: [
        'Automation does not need to mean complex machine learning models or expensive enterprise software suites. Most business efficiency gains come from automating high-frequency, repetitive tasks.',
        'Examples include automatically parsing incoming customer inquiries into internal trackers, triggering instant WhatsApp or email alerts to the sales team, and generating formatted PDF invoices automatically upon payment confirmation.',
        'By focusing on high-ROI automation bottlenecks first, organizations can free up valuable employee time and reduce clerical errors without incurring high implementation overhead.'
      ],
      status: 'Published',
      displayOrder: 2,
      createdAt: '2026-07-20T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'ins-3',
      title: 'Why Mobile Responsiveness and Fast Loading Speed Matter for Digital Success',
      slug: 'mobile-responsiveness-fast-loading-speed',
      category: 'Web Development',
      author: 'OmNetaTech Engineering Team',
      date: 'July 2026',
      readTime: '4 min read',
      summary: 'Exploring why responsive design, web performance optimization, and clean typography directly impact client trust and inquiry conversions.',
      content: [
        'In the modern digital landscape, over 70% of initial business website visits in India happen on mobile devices. A website that is slow to load or suffers from broken touch layouts creates an immediate impression of technical neglect.',
        'Optimizing images, eliminating unnecessary third-party scripts, and enforcing clean semantic HTML ensures fast load times even on mobile connections.',
        'A fast, responsive website establishes technical credibility within seconds, reassuring prospective clients and significantly increasing the likelihood of an inquiry.'
      ],
      status: 'Published',
      displayOrder: 3,
      createdAt: '2026-07-10T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'ins-4',
      title: 'Cloud Deployment Fundamentals: Choosing Dependable Hosting for Web Applications',
      slug: 'cloud-deployment-fundamentals-dependable-hosting',
      category: 'Cloud',
      author: 'OmNetaTech Engineering Team',
      date: 'June 2026',
      readTime: '5 min read',
      summary: 'A guide to cloud hosting selection, automated backups, and server monitoring tailored for business applications.',
      content: [
        'Selecting the right cloud hosting architecture is crucial for maintaining application uptime and data security without paying for idle server capacity.',
        'Key cloud fundamentals include setting up automated database backups, configuring SSL certificates properly, implementing automated deployment pipelines (CI/CD), and monitoring server CPU and memory usage proactively.',
        'A dependable hosting setup ensures your business applications remain available to clients 24/7 with zero unexpected downtime.'
      ],
      status: 'Published',
      displayOrder: 4,
      createdAt: '2026-06-25T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    }
  ],
  careers: [
    {
      id: 'job-1',
      title: 'Full-Stack Web Developer',
      department: 'Engineering',
      location: 'India (Remote / Hybrid)',
      type: 'Full-Time',
      description: 'Join our development team building responsive web platforms, modern frontend applications, and clean backend API services using React, Node.js, and modern ecosystems.',
      requirements: [
        'Proficiency with React, Node.js, and modern JavaScript / TypeScript',
        'Experience designing RESTful APIs and working with relational or document databases',
        'Strong understanding of responsive layouts, semantic HTML, and web performance',
        'Commitment to clean code, testing, and collaborative git workflows'
      ],
      responsibilities: [
        'Develop and maintain client web applications and internal tools',
        'Collaborate closely with UI/UX designers to translate Figma mockups into clean React code',
        'Participate in sprint planning and code reviews'
      ],
      status: 'Active',
      displayOrder: 1,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'job-2',
      title: 'Mobile App Developer',
      department: 'Mobile Engineering',
      location: 'India (Remote / Hybrid)',
      type: 'Full-Time',
      description: 'Craft performant cross-platform and native mobile applications for Android and iOS using Flutter or React Native.',
      requirements: [
        'Hands-on experience with Flutter or React Native',
        'Understanding of mobile UI patterns, offline caching, and state management',
        'Experience integrating third-party REST APIs and push notification services',
        'Knowledge of publishing workflows for Google Play and Apple App Store'
      ],
      responsibilities: [
        'Build and optimize cross-platform mobile apps for business clients',
        'Ensure fluid 60fps animations and touch-responsive interactions',
        'Debug cross-device rendering and performance quirks'
      ],
      status: 'Active',
      displayOrder: 2,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'job-3',
      title: 'UI/UX & Product Designer',
      department: 'Design',
      location: 'India (Remote / Hybrid)',
      type: 'Full-Time',
      description: 'Design intuitive user experiences, wireframes, high-fidelity mockups, and modular design systems using Figma.',
      requirements: [
        'Portfolio demonstrating clean, modern corporate and web application design',
        'Mastery of Figma (auto-layout, components, design tokens)',
        'Strong grasp of typography, whitespace, and accessibility contrast standards',
        'Ability to communicate design rationale clearly with engineering teams'
      ],
      responsibilities: [
        'Produce user flows, wireframes, and production-ready Figma designs',
        'Maintain and expand OmNetaTech design libraries and component systems',
        'Conduct usability evaluations on prototypes and live products'
      ],
      status: 'Active',
      displayOrder: 3,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    },
    {
      id: 'job-4',
      title: 'Backend & Cloud Engineer',
      department: 'Infrastructure',
      location: 'India (Remote / Hybrid)',
      type: 'Full-Time',
      description: 'Architect relational and NoSQL databases, RESTful web services, automated deployment pipelines, and cloud hosting setups.',
      requirements: [
        'Strong backend fundamentals in Node.js, Python, or Go',
        'Experience with cloud environments (AWS, GCP, or Azure), Docker, and CI/CD',
        'Solid database design skills (PostgreSQL, MySQL, Redis)',
        'Understanding of basic security practices (SSL, CORS, token auth, rate limiting)'
      ],
      responsibilities: [
        'Design scalable database schemas and high-throughput APIs',
        'Set up automated backup schedules and server monitoring alerts',
        'Optimize application query performance and load handling'
      ],
      status: 'Active',
      displayOrder: 4,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-12T10:00:00.000Z'
    }
  ],
  websiteContent: {
    hero: {
      headline: 'Building Digital Solutions That Move Your Business Forward',
      highlight: 'Business Forward',
      subheading: 'OmNetaTech delivers practical, scalable and reliable technology solutions that help businesses improve operations, automate processes and build better digital experiences.',
      primaryCta: 'Get a Free Consultation',
      secondaryCta: 'Explore Our Services',
      trustStatement: 'Technology solutions designed around your business goals.',
      badgeText: 'Indian Technology Services Company'
    },
    about: {
      badge: 'About OmNetaTech',
      headline: 'Practical Technology Built Around Your Goals',
      leadText: 'OmNetaTech is an India-based technology company focused on helping businesses use technology to solve real-world challenges. We work across software development, web and mobile solutions, automation, cloud technologies and modern digital experiences.',
      visionTitle: 'Empowering Businesses Through Technology',
      visionDesc: 'To be a trusted technology partner for growing Indian businesses and global organizations by delivering practical, scalable, and beautifully engineered software solutions that drive sustainable business growth.',
      missionTitle: 'Reliable Engineering Without Compromise',
      missionDesc: 'To bridge the gap between business objectives and technology implementation. We craft maintainable codebases, prioritize honest communication, and design digital experiences that users love.'
    },
    whyChoose: {
      badge: 'Why OmNetaTech',
      title: 'A Dedicated Technology Partner for Your Business',
      subtitle: 'We focus on establishing long-term technology partnerships built on engineering reliability, honest timelines, and business-focused delivery.'
    },
    techFocus: {
      badge: 'Our Technical Standard',
      title: 'Engineering Excellence in Every Project',
      subtitle: 'We focus on clean software architecture and practical usability rather than hype. Our goal is delivering digital solutions that work reliably day in and day out.'
    },
    contact: {
      badge: 'Get in Touch',
      heading: "Let's Build Something Great Together",
      subheading: 'Have a project, business requirement or technology challenge? Talk to the OmNetaTech team.',
      phone: '+91 8237140776',
      email: 'omnetatech@gmail.com',
      country: 'India',
      supportHours: 'Available Mon – Sat, 9:30 AM – 6:30 PM IST'
    },
    footer: {
      description: 'Technology solutions that help businesses build, grow and transform.',
      copyright: 'OmNetaTech. All rights reserved.',
      privacyPolicy: 'Standard Privacy Policy for client data protection, NDA assurance, and confidential software engagements in India and worldwide.',
      termsConditions: 'Standard Terms & Conditions governing technology consulting, intellectual property code ownership upon milestone delivery, and service terms under the laws of India.'
    },
    lastUpdated: '2026-09-12T10:00:00.000Z',
    updatedBy: 'System'
  }
};

// Database state management
class DatabaseManager {
  constructor() {
    this.data = null;
    this.init();
  }

  init() {
    const activeFile = getDbFilePath();
    try {
      if (fs.existsSync(activeFile)) {
        const raw = fs.readFileSync(activeFile, 'utf-8');
        this.data = JSON.parse(raw);
        // Merge any missing keys from initialSeed to ensure schema completeness
        let modified = false;
        for (const [key, value] of Object.entries(initialSeed)) {
          if (!(key in this.data)) {
            this.data[key] = value;
            modified = true;
          }
        }
        if (modified) {
          this.save();
        }
      } else if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        this.save();
      } else {
        this.data = { ...initialSeed };
        this.save();
      }
    } catch (err) {
      console.error('Error reading database file, using seed data:', err);
      this.data = { ...initialSeed };
      this.save();
    }
  }

  save() {
    try {
      const activeFile = getDbFilePath();
      const dir = path.dirname(activeFile);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const tmpFile = `${activeFile}.tmp.${Date.now()}`;
      fs.writeFileSync(tmpFile, JSON.stringify(this.data, null, 2), 'utf-8');
      fs.renameSync(tmpFile, activeFile);
    } catch (err) {
      console.error('Failed to write database file:', err);
    }
  }

  // Auth & Session
  verifyAdmin(email, password) {
    if (!this.data.admin) return null;
    if (this.data.admin.email.toLowerCase() !== email.toLowerCase().trim()) return null;
    if (verifyPassword(password, this.data.admin.passwordHash)) {
      return {
        id: this.data.admin.id,
        email: this.data.admin.email,
        name: this.data.admin.name
      };
    }
    return null;
  }

  createSession(userId) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours
    this.data.sessions.push({ token, userId, expiresAt });
    this.save();
    return { token, expiresAt };
  }

  validateSession(token) {
    if (!token) return null;
    const session = this.data.sessions.find(s => s.token === token);
    if (!session) return null;
    if (new Date(session.expiresAt) < new Date()) {
      // Expired
      this.data.sessions = this.data.sessions.filter(s => s.token !== token);
      this.save();
      return null;
    }
    return this.data.admin;
  }

  destroySession(token) {
    if (!token) return;
    this.data.sessions = this.data.sessions.filter(s => s.token !== token);
    this.save();
  }

  updateAdminPassword(oldPassword, newPassword) {
    if (!verifyPassword(oldPassword, this.data.admin.passwordHash)) {
      return { success: false, error: 'Current password is incorrect' };
    }
    if (!newPassword || newPassword.length < 8) {
      return { success: false, error: 'New password must be at least 8 characters' };
    }
    this.data.admin.passwordHash = hashPassword(newPassword);
    this.data.admin.updatedAt = new Date().toISOString();
    // Invalidate old sessions
    this.data.sessions = [];
    this.save();
    return { success: true };
  }

  // Dashboard Summary
  getDashboardStats() {
    const totalEnquiries = this.data.enquiries.length;
    const newEnquiries = this.data.enquiries.filter(e => e.status === 'New').length;
    const unreadNotifications = this.data.notifications.filter(n => !n.isRead).length;
    const publishedInsights = this.data.insights.filter(i => i.status === 'Published').length;
    const activeServices = this.data.services.filter(s => s.status === 'Published').length;
    const activeCareers = this.data.careers.filter(c => c.status === 'Active').length;

    return {
      totalEnquiries,
      newEnquiries,
      unreadNotifications,
      publishedInsights,
      activeServices,
      activeCareers
    };
  }

  // Enquiries
  getEnquiries(filter = 'All') {
    let list = [...this.data.enquiries];
    if (filter === 'New') list = list.filter(e => e.status === 'New');
    else if (filter === 'In Progress') list = list.filter(e => e.status === 'In Progress');
    else if (filter === 'Contacted') list = list.filter(e => e.status === 'Contacted');
    else if (filter === 'Closed') list = list.filter(e => e.status === 'Closed');
    else if (filter === 'Unread') list = list.filter(e => !e.isRead);

    // Newest first
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getEnquiryById(id) {
    return this.data.enquiries.find(e => e.id === id) || null;
  }

  createEnquiry(payload) {
    const newEnquiry = {
      id: `enq-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
      fullName: payload.fullName.trim(),
      companyName: payload.companyName ? payload.companyName.trim() : '',
      email: payload.email.trim().toLowerCase(),
      phone: payload.phone.trim(),
      service: payload.service || 'Software Development',
      message: payload.message.trim(),
      status: 'New',
      isRead: false,
      adminNote: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.data.enquiries.unshift(newEnquiry);

    // Create real notification
    const newNotification = {
      id: `notif-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
      type: 'NEW_ENQUIRY',
      title: 'New Contact Enquiry',
      message: `New enquiry received from ${newEnquiry.fullName} for ${newEnquiry.service}.`,
      relatedId: newEnquiry.id,
      customerName: newEnquiry.fullName,
      email: newEnquiry.email,
      phone: newEnquiry.phone,
      company: newEnquiry.companyName,
      service: newEnquiry.service,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    this.data.notifications.unshift(newNotification);
    this.save();

    return { enquiry: newEnquiry, notification: newNotification };
  }

  updateEnquiry(id, updates) {
    const index = this.data.enquiries.findIndex(e => e.id === id);
    if (index === -1) return null;

    const allowed = ['status', 'isRead', 'adminNote'];
    for (const key of allowed) {
      if (key in updates) {
        this.data.enquiries[index][key] = updates[key];
      }
    }
    this.data.enquiries[index].updatedAt = new Date().toISOString();

    // If marked read, also mark related notifications read
    if (updates.isRead === true) {
      this.data.notifications.forEach(n => {
        if (n.relatedId === id) n.isRead = true;
      });
    }

    this.save();
    return this.data.enquiries[index];
  }

  deleteEnquiry(id) {
    const initialLen = this.data.enquiries.length;
    this.data.enquiries = this.data.enquiries.filter(e => e.id !== id);
    // Also remove notifications related to this enquiry
    this.data.notifications = this.data.notifications.filter(n => n.relatedId !== id);
    this.save();
    return this.data.enquiries.length < initialLen;
  }

  // Notifications
  getNotifications() {
    return [...this.data.notifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  markNotificationRead(id) {
    const notif = this.data.notifications.find(n => n.id === id);
    if (!notif) return null;
    notif.isRead = true;
    this.save();
    return notif;
  }

  markAllNotificationsRead() {
    this.data.notifications.forEach(n => {
      n.isRead = true;
    });
    this.save();
    return true;
  }

  // Services
  getServices(publishedOnly = false) {
    let list = [...this.data.services];
    if (publishedOnly) {
      list = list.filter(s => s.status === 'Published');
    }
    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  createService(payload) {
    const newService = {
      id: `svc-${Date.now()}`,
      title: payload.title.trim(),
      slug: payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: payload.category || 'Technology Services',
      shortDescription: payload.shortDescription || '',
      description: payload.description || '',
      features: Array.isArray(payload.features) ? payload.features : [],
      icon: payload.icon || 'Code',
      status: payload.status || 'Published',
      displayOrder: parseInt(payload.displayOrder || this.data.services.length + 1, 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.services.push(newService);
    this.save();
    return newService;
  }

  updateService(id, payload) {
    const index = this.data.services.findIndex(s => s.id === id);
    if (index === -1) return null;
    this.data.services[index] = {
      ...this.data.services[index],
      ...payload,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.services[index];
  }

  deleteService(id) {
    const len = this.data.services.length;
    this.data.services = this.data.services.filter(s => s.id !== id);
    this.save();
    return this.data.services.length < len;
  }

  // Solutions
  getSolutions(publishedOnly = false) {
    let list = [...this.data.solutions];
    if (publishedOnly) {
      list = list.filter(s => s.status === 'Published');
    }
    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  createSolution(payload) {
    const newSol = {
      id: `sol-${Date.now()}`,
      title: payload.title.trim(),
      slug: payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: payload.tagline || '',
      problem: payload.problem || '',
      solution: payload.solution || '',
      benefit: payload.benefit || '',
      icon: payload.icon || 'Layers',
      status: payload.status || 'Published',
      displayOrder: parseInt(payload.displayOrder || this.data.solutions.length + 1, 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.solutions.push(newSol);
    this.save();
    return newSol;
  }

  updateSolution(id, payload) {
    const index = this.data.solutions.findIndex(s => s.id === id);
    if (index === -1) return null;
    this.data.solutions[index] = {
      ...this.data.solutions[index],
      ...payload,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.solutions[index];
  }

  deleteSolution(id) {
    const len = this.data.solutions.length;
    this.data.solutions = this.data.solutions.filter(s => s.id !== id);
    this.save();
    return this.data.solutions.length < len;
  }

  // Industries
  getIndustries(publishedOnly = false) {
    let list = [...this.data.industries];
    if (publishedOnly) {
      list = list.filter(i => i.status === 'Published');
    }
    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  createIndustry(payload) {
    const newInd = {
      id: `ind-${Date.now()}`,
      title: payload.title.trim(),
      slug: payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      desc: payload.desc || '',
      icon: payload.icon || 'Building2',
      status: payload.status || 'Published',
      displayOrder: parseInt(payload.displayOrder || this.data.industries.length + 1, 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.industries.push(newInd);
    this.save();
    return newInd;
  }

  updateIndustry(id, payload) {
    const index = this.data.industries.findIndex(i => i.id === id);
    if (index === -1) return null;
    this.data.industries[index] = {
      ...this.data.industries[index],
      ...payload,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.industries[index];
  }

  deleteIndustry(id) {
    const len = this.data.industries.length;
    this.data.industries = this.data.industries.filter(i => i.id !== id);
    this.save();
    return this.data.industries.length < len;
  }

  // Portfolio
  getPortfolio(publishedOnly = false) {
    let list = [...this.data.portfolio];
    if (publishedOnly) {
      list = list.filter(p => p.status === 'Published');
    }
    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  createPortfolio(payload) {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: payload.title.trim(),
      slug: payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tag: payload.tag || 'web',
      badge: payload.badge || 'Sample Project',
      category: payload.category || 'Custom Software',
      icon: payload.icon || 'Code',
      summary: payload.summary || '',
      challenge: payload.challenge || '',
      approach: payload.approach || '',
      deliverables: Array.isArray(payload.deliverables) ? payload.deliverables : [],
      status: payload.status || 'Published',
      displayOrder: parseInt(payload.displayOrder || this.data.portfolio.length + 1, 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.portfolio.push(newProj);
    this.save();
    return newProj;
  }

  updatePortfolio(id, payload) {
    const index = this.data.portfolio.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.data.portfolio[index] = {
      ...this.data.portfolio[index],
      ...payload,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.portfolio[index];
  }

  deletePortfolio(id) {
    const len = this.data.portfolio.length;
    this.data.portfolio = this.data.portfolio.filter(p => p.id !== id);
    this.save();
    return this.data.portfolio.length < len;
  }

  // Insights
  getInsights(publishedOnly = false) {
    let list = [...this.data.insights];
    if (publishedOnly) {
      list = list.filter(i => i.status === 'Published');
    }
    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  createInsight(payload) {
    const newArticle = {
      id: `ins-${Date.now()}`,
      title: payload.title.trim(),
      slug: payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: payload.category || 'Technology',
      author: payload.author || 'OmNetaTech Engineering Team',
      date: payload.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      readTime: payload.readTime || '5 min read',
      summary: payload.summary || '',
      content: Array.isArray(payload.content) ? payload.content : [payload.content || ''],
      status: payload.status || 'Published',
      displayOrder: parseInt(payload.displayOrder || this.data.insights.length + 1, 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.insights.push(newArticle);
    this.save();
    return newArticle;
  }

  updateInsight(id, payload) {
    const index = this.data.insights.findIndex(i => i.id === id);
    if (index === -1) return null;
    this.data.insights[index] = {
      ...this.data.insights[index],
      ...payload,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.insights[index];
  }

  deleteInsight(id) {
    const len = this.data.insights.length;
    this.data.insights = this.data.insights.filter(i => i.id !== id);
    this.save();
    return this.data.insights.length < len;
  }

  // Careers
  getCareers(activeOnly = false) {
    let list = [...this.data.careers];
    if (activeOnly) {
      list = list.filter(c => c.status === 'Active');
    }
    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  createCareer(payload) {
    const newJob = {
      id: `job-${Date.now()}`,
      title: payload.title.trim(),
      department: payload.department || 'Engineering',
      location: payload.location || 'India (Remote / Hybrid)',
      type: payload.type || 'Full-Time',
      description: payload.description || '',
      requirements: Array.isArray(payload.requirements) ? payload.requirements : [],
      responsibilities: Array.isArray(payload.responsibilities) ? payload.responsibilities : [],
      status: payload.status || 'Active',
      displayOrder: parseInt(payload.displayOrder || this.data.careers.length + 1, 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.careers.push(newJob);
    this.save();
    return newJob;
  }

  updateCareer(id, payload) {
    const index = this.data.careers.findIndex(c => c.id === id);
    if (index === -1) return null;
    this.data.careers[index] = {
      ...this.data.careers[index],
      ...payload,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.careers[index];
  }

  deleteCareer(id) {
    const len = this.data.careers.length;
    this.data.careers = this.data.careers.filter(c => c.id !== id);
    this.save();
    return this.data.careers.length < len;
  }

  // Website Content
  getWebsiteContent() {
    return this.data.websiteContent;
  }

  updateWebsiteContent(section, updates, user = 'Admin') {
    if (!this.data.websiteContent[section]) {
      this.data.websiteContent[section] = {};
    }
    this.data.websiteContent[section] = {
      ...this.data.websiteContent[section],
      ...updates
    };
    this.data.websiteContent.lastUpdated = new Date().toISOString();
    this.data.websiteContent.updatedBy = user;
    this.save();
    return this.data.websiteContent;
  }

  // Global Admin Search
  globalSearch(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) return { enquiries: [], services: [], solutions: [], industries: [], insights: [], careers: [] };

    const match = (text) => (text || '').toLowerCase().includes(q);

    return {
      enquiries: this.data.enquiries.filter(e => match(e.fullName) || match(e.companyName) || match(e.email) || match(e.service) || match(e.message)),
      services: this.data.services.filter(s => match(s.title) || match(s.shortDescription) || match(s.category)),
      solutions: this.data.solutions.filter(s => match(s.title) || match(s.tagline) || match(s.problem) || match(s.solution)),
      industries: this.data.industries.filter(i => match(i.title) || match(i.desc)),
      insights: this.data.insights.filter(i => match(i.title) || match(i.summary) || match(i.category)),
      careers: this.data.careers.filter(c => match(c.title) || match(c.department) || match(c.description))
    };
  }

  // Public Bundle (for instant public website loading)
  getPublicBundle() {
    return {
      content: this.data.websiteContent,
      services: this.getServices(true),
      solutions: this.getSolutions(true),
      industries: this.getIndustries(true),
      portfolio: this.getPortfolio(true),
      insights: this.getInsights(true),
      careers: this.getCareers(true)
    };
  }
}

export const db = new DatabaseManager();
