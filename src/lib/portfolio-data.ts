export const profile = {
  name: "Vishal Pandey",
  title: "Senior React Native Developer",
  location: "Noida, Delhi NCR, India",
  email: "vishalpandey8130@gmail.com",
  phone: "+91-8448613996",
  linkedin: "https://www.linkedin.com/in/vishal-pandey-79b682124/",
  github: "https://github.com/Maxxtony8130",
  positioning:
    "Senior React Native Developer building high-performance mobile products for iOS and Android.",
  summary:
    "5+ years building and deploying scalable cross-platform mobile applications. 9 production apps shipped — many owned end-to-end as sole developer or technical lead — across fintech, SaaS, sports-tech, social, real estate, e-commerce, and field service.",
};

export const stats = [
  { value: 5, suffix: "+", label: "Years of experience" },
  { value: 9, suffix: "", label: "Production apps shipped" },
  { value: 5000, suffix: "+", label: "Concurrent users supported" },
  { value: 60, suffix: "%", label: "Fewer video upload failures" },
  { value: 35, suffix: "%", label: "Checkout conversion lift" },
  { value: 50, suffix: "%", label: "Donation processing efficiency" },
];

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  domain: string;
  platforms: string[];
  role: string;
  stack: string[];
  features: string[];
  outcome?: string;
  links: { label: string; url: string }[];
  overview: string;
  challenges: string[];
  solutions: string[];
}

export const projects: Project[] = [
  {
    slug: "besein",
    name: "Besein",
    tagline: "AI Football Analytics Platform",
    domain: "Sports-tech",
    platforms: ["iOS", "Android"],
    role: "Sole React Native Developer — owned the mobile architecture end-to-end",
    stack: ["React Native", "TypeScript", "Firebase", "Real-time sync", "Video pipeline"],
    features: [
      "Role-specific experiences for players and scouts",
      "Advanced video tagging, filtering, and player comparison",
      "Background upload pipeline with compression and retry logic",
      "Optimized video streaming, caching, and buffering",
      "Scalable Firebase Storage architecture for large video datasets",
    ],
    outcome:
      "Reduced video upload failures by 60% on low-connectivity networks; improved playback performance by 45%.",
    links: [{ label: "App Store", url: "https://apps.apple.com/us/app/besein/id6748543595" }],
    overview:
      "A sports-tech platform where football players upload match videos and scouts review AI-generated performance analytics.",
    challenges: [
      "Large match video files failing to upload on low-connectivity networks",
      "Smooth video streaming and buffering for scout review workflows",
      "Two distinct user roles — players and scouts — in one codebase",
    ],
    solutions: [
      "Built a resilient background upload pipeline with video compression, retry logic, and low-connectivity handling",
      "Optimized streaming, caching, and buffering layers for playback",
      "Designed role-specific experiences on a shared, scalable architecture",
    ],
  },
  {
    slug: "zien",
    name: "Zien",
    tagline: "AI-Powered Real Estate Platform",
    domain: "Real estate",
    platforms: ["iOS", "Android"],
    role: "React Native Developer",
    stack: ["React Native", "Google Maps SDK", "AI insights", "Push notifications"],
    features: [
      "Property discovery across homes, condos, and townhouses for sale or rent",
      "Advanced search and filtering — price, type, school district",
      "Saved searches with notifications for newly matching listings",
      "AI-powered property and location insights",
      "Google Maps-based discovery, commute features, and tour booking",
    ],
    links: [{ label: "App Store", url: "https://apps.apple.com/us/app/zien/id6475808475" }],
    overview:
      "A real estate platform for discovering properties, personalized search, property insights, and booking property tours.",
    challenges: [
      "Making large property inventories searchable and personal",
      "Location-aware discovery with maps, commute, and directions",
    ],
    solutions: [
      "Built personalized search with saved searches and matching-listing notifications",
      "Integrated Google Maps-based discovery, open-house directions, and in-app tour booking",
    ],
  },
  {
    slug: "diosync",
    name: "Diosync",
    tagline: "AI-Based Inventory Management SaaS",
    domain: "SaaS / Hospitality",
    platforms: ["Android"],
    role: "React Native Developer",
    stack: ["React Native", "Supabase", "MMKV", "OCR", "AI APIs", "Offline-first"],
    features: [
      "Offline-first inventory workflows with MMKV local storage",
      "Supabase synchronization across devices",
      "OCR and AI APIs for automated data entry",
      "Stock-based order management",
      "Anomaly tracking for overuse, theft, and wastage",
      "Cost and margin monitoring dashboards",
    ],
    links: [
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.diosync.app",
      },
    ],
    overview:
      "A SaaS platform for hospitality businesses to digitize and manage food & beverage inventory.",
    challenges: [
      "Inventory work happens in storerooms with unreliable connectivity",
      "Manual data entry was slow and error-prone",
    ],
    solutions: [
      "Built offline-first workflows with MMKV local storage and Supabase sync",
      "Integrated OCR and AI APIs to automate data entry",
    ],
  },
  {
    slug: "bunchy",
    name: "Bunchy",
    tagline: "Private Community App",
    domain: "Social",
    platforms: ["iOS", "Android"],
    role: "React Native Developer",
    stack: ["React Native", "Firebase", "OAuth", "Biometric auth", "Real-time messaging"],
    features: [
      "Real-time messaging powered by Firebase",
      "Biometric login and OAuth authentication",
      "Pseudonymous user profiles",
    ],
    links: [{ label: "App Store", url: "https://apps.apple.com/ca/app/bunchy/id6757946184" }],
    overview: "A private community app with real-time interaction and privacy-first identity.",
    challenges: ["Real-time messaging at scale", "Privacy-preserving user identity"],
    solutions: [
      "Built Firebase-powered real-time messaging",
      "Implemented biometric login, OAuth, and pseudonymous profiles",
    ],
  },
  {
    slug: "ydf",
    name: "YDF",
    tagline: "Scholarship & Donations Platform",
    domain: "Social impact",
    platforms: ["Android"],
    role: "React Native Developer",
    stack: ["React Native", "Razorpay", "Stripe", "Role-based access"],
    features: [
      "Role-based experiences for students, donors, and creators",
      "Razorpay and Stripe payment integration",
      "Admin workflows for donation processing",
    ],
    outcome: "Improved donation processing efficiency by 50%.",
    links: [{ label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.YDF" }],
    overview:
      "A scholarship and donations platform connecting students, donors, and creators.",
    challenges: ["Three distinct user roles with different workflows", "Reliable payment processing"],
    solutions: [
      "Developed role-based experiences with automated workflows and role-based access",
      "Integrated Razorpay and Stripe payment flows",
    ],
  },
  {
    slug: "cyberwolf",
    name: "Cyberwolf Service",
    tagline: "Field Service Management",
    domain: "Field service",
    platforms: ["iOS", "Android"],
    role: "React Native Developer",
    stack: ["React Native", "GPS tracking", "Digital signatures", "In-app payments"],
    features: [
      "GPS tracking for field teams",
      "Job management workflows",
      "Digital signatures on completion",
      "In-app payment collection",
    ],
    links: [
      { label: "App Store", url: "https://apps.apple.com/us/app/cyberwolf-service/id6758789744" },
    ],
    overview: "A field-service app for managing jobs, teams, and payments in the field.",
    challenges: ["Tracking and coordinating field teams in real time"],
    solutions: [
      "Built GPS tracking, job management, digital signatures, and in-app payment features",
    ],
  },
  {
    slug: "jabburr",
    name: "Jabburr",
    tagline: "Social Networking & Marketplace",
    domain: "Social",
    platforms: ["iOS"],
    role: "Sole React Native Developer — iOS",
    stack: ["React Native", "Firebase Auth", "Real-time features"],
    features: [
      "Rebuilt onboarding flow from the ground up",
      "Firebase Authentication implementation",
      "Redesigned mobile UI flows",
      "Real-time interaction features",
    ],
    outcome: "Reduced onboarding completion time by 60%.",
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/in/app/jabburr-social-marketplace/id1639059394",
      },
    ],
    overview: "A social networking platform for user interaction and content sharing.",
    challenges: ["Onboarding drop-off was high", "Authentication flow needed a rebuild"],
    solutions: [
      "Rebuilt the onboarding flow and Firebase Authentication as sole iOS developer",
      "Redesigned UI flows and implemented real-time interactions",
    ],
  },
  {
    slug: "planify",
    name: "Planify",
    tagline: "Pre-IPO, SME & AIF Investment Platform",
    domain: "Fintech",
    platforms: ["iOS", "Android"],
    role: "React Native Developer",
    stack: ["React Native", "Stripe", "Victory Native", "OAuth", "Biometric auth"],
    features: [
      "Secure authentication — biometric login, Google, Apple, LinkedIn OAuth",
      "Real-time portfolio and market data synchronization",
      "Interactive investment charts with Victory Native",
      "Stripe payment workflows",
    ],
    outcome: "Supported 5,000+ concurrent users through state and rendering optimization.",
    links: [
      { label: "App Store", url: "https://apps.apple.com/mt/app/planify-preipo-sme-aif/id1639178344" },
    ],
    overview:
      "A fintech application enabling users to explore and invest in pre-IPO, SME, and AIF opportunities with portfolio tracking.",
    challenges: ["Real-time market data at high concurrency", "Secure, frictionless authentication"],
    solutions: [
      "Optimized state management and rendering to support 5,000+ concurrent users",
      "Built biometric login and multi-provider OAuth with Stripe payments",
    ],
  },
  {
    slug: "parure-la-plee",
    name: "Parure La Plee",
    tagline: "E-Commerce Application",
    domain: "E-commerce",
    platforms: ["Android"],
    role: "React Native Developer",
    stack: ["React Native", "Stripe", "Inventory sync"],
    features: [
      "Product discovery experience",
      "Inventory synchronization",
      "Stripe payment integration",
    ],
    outcome: "Improved checkout conversion by 35%.",
    links: [
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.parurelaplee.app",
      },
    ],
    overview: "An e-commerce mobile application with product discovery and seamless checkout.",
    challenges: ["Checkout friction hurting conversion"],
    solutions: [
      "Improved product discovery, inventory synchronization, and Stripe payment integration",
    ],
  },
];

export const experience = [
  {
    company: "Isynbus Technology",
    location: "Noida, India",
    role: "Senior React Native Developer",
    period: "Jun 2023 – Jul 2026",
    points: [
      "Owned mobile application architecture end-to-end as sole React Native developer across multiple production apps",
      "Shipped Besein, Zien, Diosync, Bunchy, YDF, Cyberwolf, and ClicBoum across sports-tech, real estate, SaaS, social, donations, and field service",
      "Reduced video upload failures by 60% with a resilient background upload pipeline",
      "Improved donation processing efficiency by 50% through automated workflows and integrated payments",
      "Contributed to a 40% increase in local engagement with geofencing and FCM campaign analytics (ClicBoum)",
    ],
    tech: ["React Native", "Expo", "Firebase", "Supabase", "MMKV", "Stripe", "Razorpay"],
  },
  {
    company: "Planify Capital Ltd",
    location: "Gurgaon, India",
    role: "React Native Developer",
    period: "Oct 2022 – Jun 2023",
    points: [
      "Built secure authentication with biometric login and Google, Apple, and LinkedIn OAuth",
      "Implemented real-time portfolio and market data synchronization",
      "Developed interactive investment charts using Victory Native",
      "Optimized state management and rendering to support 5,000+ concurrent users",
    ],
    tech: ["React Native", "Stripe", "Victory Native", "OAuth"],
  },
  {
    company: "Oodles Technologies Pvt. Ltd.",
    location: "Gurgaon, India",
    role: "React Native Developer",
    period: "Sep 2021 – Aug 2022",
    points: [
      "Sole React Native developer for the Jabburr iOS application",
      "Rebuilt the onboarding flow and Firebase Authentication implementation",
      "Redesigned mobile UI flows and real-time features, reducing onboarding completion time by 60%",
    ],
    tech: ["React Native", "Firebase", "iOS"],
  },
  {
    company: "The WebPlant Pvt. Ltd.",
    location: "New Delhi, India",
    role: "Frontend Developer",
    period: "Oct 2020 – Sep 2021",
    points: [
      "Developed 15+ responsive web applications with HTML5, CSS3, JavaScript, and modern frameworks",
      "Integrated HubSpot CMS for client-managed content, reducing maintenance effort by 60%",
      "Achieved up to 40% faster page loads through code splitting and lazy loading",
    ],
    tech: ["JavaScript", "HTML5", "CSS3", "HubSpot CMS"],
  },
];

export const techGroups = [
  {
    name: "Mobile",
    items: ["React Native", "Expo", "React Native CLI", "iOS", "Android"],
  },
  { name: "Languages", items: ["TypeScript", "JavaScript (ES6+)"] },
  {
    name: "State & Data",
    items: [
      "Redux Toolkit",
      "Zustand",
      "TanStack Query",
      "MMKV",
      "Offline-First Architecture",
      "Real-Time Sync",
    ],
  },
  {
    name: "Backend & APIs",
    items: ["REST APIs", "GraphQL", "Firebase", "Supabase"],
  },
  {
    name: "Auth & Payments",
    items: [
      "OAuth",
      "Biometric Authentication",
      "RBAC",
      "Stripe",
      "Razorpay",
      "PayPal",
      "Apple Pay",
      "Google Pay",
      "In-App Purchases",
    ],
  },
  {
    name: "Maps & Location",
    items: ["Google Maps SDK", "Mapbox", "GPS Tracking", "Geofencing"],
  },
  {
    name: "DevOps & Deployment",
    items: ["EAS Build", "GitHub Actions", "CodePush", "CI/CD", "Sentry", "App Store", "Google Play"],
  },
  {
    name: "Testing & Performance",
    items: ["Jest", "RN Testing Library", "Hermes", "Rendering Optimization", "Startup Profiling"],
  },
];

export const services = [
  {
    title: "New mobile app development",
    description:
      "From architecture to App Store — production-ready React Native apps built end-to-end.",
  },
  {
    title: "Existing app development",
    description:
      "Feature development, production bug fixing, and release management for live apps.",
  },
  {
    title: "Performance optimization",
    description:
      "Rendering, bundle, startup, and memory optimization — proven at 5,000+ concurrent users.",
  },
  {
    title: "App architecture",
    description:
      "Modular, scalable codebases with clean architecture and reusable components.",
  },
  {
    title: "API & AI integrations",
    description:
      "REST, GraphQL, Firebase, Supabase, OCR, and AI APIs wired into reliable mobile experiences.",
  },
  {
    title: "Payments & authentication",
    description:
      "Stripe, Razorpay, PayPal, Apple Pay, Google Pay, in-app purchases, OAuth, and biometrics.",
  },
  {
    title: "Offline-first & real-time",
    description:
      "MMKV-backed offline workflows, real-time sync, messaging, and background uploads.",
  },
  {
    title: "Store deployment & CI/CD",
    description:
      "EAS Build, CodePush, GitHub Actions, Sentry — shipping to App Store and Google Play.",
  },
];
