export const PHONE_DISPLAY = "989-285-7977";
export const PHONE_TEL = "tel:9892857977";
export const PHONE_SMS = "sms:9892857977";
export const EMAIL = "Skyscanthermalllc@gmail.com";
export const COMPANY = "SkyScan Thermal Solutions";
export const TAGLINE = "Thermal Drone Services for Recovery & Inspection";

export const NAV = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Our Work", to: "/our-work" },
  { label: "About", to: "/about" },

  { label: "FAQs", to: "/faqs" },
  { label: "Service Areas", to: "/service-areas" },
  { label: "Contact", to: "/contact" },
] as const;

/** EDITABLE: social links. Leave href empty to hide the icon. */
export const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "Facebook", href: "" },
  { label: "Instagram", href: "" },
  { label: "YouTube", href: "" },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  body: string[];
  bullets: string[];
  cta: string;
  disclaimer?: string;
};

export const SERVICES: Service[] = [
  {
    slug: "deer-recovery",
    title: "Deer Recovery",
    short: "24/7 thermal drone-assisted deer recovery.",
    body: [
      "Thermal imaging can assist with searching fields, woods, brush, and difficult terrain for heat signatures — covering ground quickly from the air when a track goes cold.",
      "Recovery response is available 24/7. Conditions, terrain, weather, and applicable regulations affect what a thermal drone can detect on any given flight.",
    ],
    bullets: [
      "Large field and woodline sweeps",
      "Thick brush and difficult terrain",
      "Night and low-visibility searching",
      "Rapid coverage of large acreage",
    ],
    cta: "Call for Recovery",
  },
  {
    slug: "livestock-tracking",
    title: "Livestock Tracking",
    short: "Locate animals across large acreage from the air.",
    body: [
      "Thermal drone technology can help locate livestock across large areas, particularly when visibility is limited by darkness, cover, or terrain.",
    ],
    bullets: [
      "Pasture and back-field sweeps",
      "Missing or strayed animals",
      "Low-light and night operation",
      "Large-acreage coverage",
    ],
    cta: "Request a Flight",
  },
  {
    slug: "deer-herd-counts",
    title: "Deer Herd Counts",
    short: "Aerial thermal observation across large properties.",
    body: [
      "Aerial thermal imaging can assist with wildlife observation and estimating deer populations across large properties, with heat signatures highlighted against a cool background.",
    ],
    bullets: [
      "Property-wide observation flights",
      "Multiple heat signatures per pass",
      "Seasonal comparison imagery",
      "Land management support",
    ],
    cta: "Schedule a Count",
  },
  {
    slug: "solar-panel-inspections",
    title: "Solar Panel Inspections",
    short: "Identify unusual temperature patterns across arrays.",
    body: [
      "Aerial thermal imaging is used to identify unusual temperature patterns across solar arrays and areas that may warrant additional investigation.",
      "Thermal imaging is an inspection aid. It does not replace evaluation by a qualified solar technician.",
    ],
    bullets: [
      "Rooftop and ground-mount arrays",
      "Cell, string, and panel-level patterns",
      "Fast coverage of large arrays",
      "Imagery delivered for your records",
    ],
    cta: "Request an Inspection",
    disclaimer:
      "Thermal imaging highlights temperature patterns; it does not diagnose electrical faults.",
  },
  {
    slug: "roofing-heat-loss",
    title: "Roofing & Heat-Loss Inspections",
    short: "Spot temperature anomalies across roofs and buildings.",
    body: [
      "Thermal imaging is used to identify unusual temperature patterns across roofs and buildings — potential heat loss, insulation irregularities, and areas that may warrant additional investigation.",
    ],
    bullets: [
      "Residential and commercial roofs",
      "Heat-loss pattern imagery",
      "Insulation irregularity indicators",
      "Steep or hard-to-access roofs",
    ],
    cta: "Request an Inspection",
    disclaimer:
      "Thermal imaging is an inspection aid and does not replace a qualified roofing or building professional.",
  },
  {
    slug: "building-property-inspections",
    title: "Building & Property Thermal Inspections",
    short: "Aerial thermal coverage of large structures and land.",
    body: [
      "Aerial thermal imaging can be used to inspect large structures and properties from angles that are difficult or unsafe to reach from the ground.",
    ],
    bullets: [
      "Heat-loss investigation",
      "Building envelope observations",
      "Commercial properties and large structures",
      "Hard-to-reach areas",
    ],
    cta: "Discuss Your Property",
  },
  {
    slug: "agricultural-custom",
    title: "Agricultural & Custom Thermal Services",
    short: "Have a special project? Let's talk.",
    body: [
      "Not every job fits a category. If it can be flown and scanned, it can usually be discussed.",
    ],
    bullets: [
      "Agricultural thermal imaging",
      "Equipment inspection",
      "Property surveys and large-area scanning",
      "Wildlife observation and search assistance",
    ],
    cta: "Have a special project? Let's talk.",
  },
];

export const SERVICE_OPTIONS = [
  "Deer Recovery",
  "Livestock Tracking",
  "Deer Herd Count",
  "Solar Panel Inspection",
  "Roofing / Heat Loss",
  "Building Thermal Inspection",
  "Wildlife Tracking",
  "Agricultural Thermal Imaging",
  "Other",
] as const;

export const FAQS: { q: string; a: string }[] = [
  {
    q: "What is thermal drone imaging?",
    a: "A thermal camera mounted on a drone reads infrared energy — heat — instead of visible light. From the air, warm objects show up brightly against cooler surroundings, which makes it possible to see patterns and objects that are invisible to the eye or a normal camera.",
  },
  {
    q: "What can thermal cameras detect?",
    a: "Thermal cameras detect differences in surface temperature. That includes animal heat signatures, warm or cold patches on a roof, unusual temperature patterns on solar panels, and heat coming off equipment. They read heat patterns — not shapes behind walls or underground.",
  },
  {
    q: "Can you find deer at night?",
    a: "Thermal imaging can assist with locating heat signatures at night, subject to operating conditions, terrain, cover, weather, applicable laws, and flight requirements. No recovery can be guaranteed.",
  },
  {
    q: "Are you available 24/7?",
    a: "Recovery services are offered with 24/7 response availability. Call or text 989-285-7977 any time.",
  },
  {
    q: "Are you FAA Part 107 certified?",
    a: "Yes — SkyScan Thermal Solutions operates under FAA Part 107 remote pilot certification.",
  },
  {
    q: "Are you insured?",
    a: "Yes — SkyScan Thermal Solutions carries insurance coverage for its drone operations.",
  },
  {
    q: "How much does a thermal drone inspection cost?",
    a: "Every project is different. Contact us for a quote.",
  },
  {
    q: "Can thermal drones inspect solar panels?",
    a: "Yes. Aerial thermal imaging can identify unusual temperature patterns across an array that may warrant further investigation by a qualified solar professional.",
  },
  {
    q: "Can you inspect my roof?",
    a: "Yes. Aerial thermal imaging can highlight temperature anomalies, possible heat loss, and insulation irregularities on a roof. It is an inspection aid and does not replace a qualified roofing or building professional.",
  },
  {
    q: "Can you find livestock?",
    a: "Thermal imaging can assist with locating livestock across large areas, especially at night or where cover and terrain limit visibility from the ground.",
  },
  {
    q: "What areas do you service?",
    a: "SkyScan Thermal Solutions operates in Michigan. See the Service Areas page, and contact us if your location is not listed — we may still be able to help depending on the project and flight requirements.",
  },
  {
    q: "How quickly can you respond?",
    a: "Recovery calls are answered 24/7 and dispatched as quickly as conditions, travel distance, weather, and flight requirements allow. We do not guarantee a specific arrival time.",
  },
];

/**
 * EDITABLE: service areas. Add or remove entries here.
 * `x` / `y` are percentage coordinates on the Michigan map graphic.
 */
export type ServiceArea = { name: string; note?: string; x: number; y: number };
export const SERVICE_AREAS: ServiceArea[] = [
  { name: "Add your first service area", note: "Placeholder — edit in src/lib/site.ts", x: 55, y: 62 },
];

/**
 * EDITABLE: portfolio projects. Placeholders only — replace with real work.
 * No projects are fabricated: entries below are marked as placeholders.
 */
export type Project = {
  id: string;
  title: string;
  category: "Deer Recovery" | "Wildlife" | "Solar" | "Roofing" | "Thermal Inspection" | "Livestock" | "Other";
  date: string;
  location: string;
  service: string;
  description: string;
  outcome: string;
  placeholder: boolean;
  normalImage?: string;
  thermalImage?: string;
};

export const PROJECT_CATEGORIES = [
  "All",
  "Deer Recovery",
  "Wildlife",
  "Solar",
  "Roofing",
  "Thermal Inspection",
  "Livestock",
  "Other",
] as const;

export const PROJECTS: Project[] = [
  {
    id: "placeholder-recovery",
    title: "Deer Recovery — Project Slot",
    category: "Deer Recovery",
    date: "—",
    location: "Michigan",
    service: "Deer Recovery",
    description:
      "Placeholder slot for a completed recovery. Add the date, general location, description, and imagery in src/lib/site.ts.",
    outcome: "Add outcome details here.",
    placeholder: true,
  },
  {
    id: "placeholder-roofing",
    title: "Roof Heat-Loss Scan — Project Slot",
    category: "Roofing",
    date: "—",
    location: "Michigan",
    service: "Roofing / Heat Loss",
    description:
      "Placeholder slot for a roofing thermal inspection. Replace with real imagery and observations.",
    outcome: "Add outcome details here.",
    placeholder: true,
  },
  {
    id: "placeholder-solar",
    title: "Solar Array Scan — Project Slot",
    category: "Solar",
    date: "—",
    location: "Michigan",
    service: "Solar Panel Inspection",
    description:
      "Placeholder slot for a solar array thermal inspection. Replace with real imagery and observations.",
    outcome: "Add outcome details here.",
    placeholder: true,
  },
  {
    id: "placeholder-wildlife",
    title: "Deer Herd Count — Project Slot",
    category: "Wildlife",
    date: "—",
    location: "Michigan",
    service: "Deer Herd Count",
    description:
      "Placeholder slot for a herd count flight. Replace with real imagery and observations.",
    outcome: "Add outcome details here.",
    placeholder: true,
  },
  {
    id: "placeholder-livestock",
    title: "Livestock Locate — Project Slot",
    category: "Livestock",
    date: "—",
    location: "Michigan",
    service: "Livestock Tracking",
    description:
      "Placeholder slot for a livestock tracking flight. Replace with real imagery and observations.",
    outcome: "Add outcome details here.",
    placeholder: true,
  },
  {
    id: "placeholder-inspection",
    title: "Building Thermal Inspection — Project Slot",
    category: "Thermal Inspection",
    date: "—",
    location: "Michigan",
    service: "Building Thermal Inspection",
    description:
      "Placeholder slot for a building inspection. Replace with real imagery and observations.",
    outcome: "Add outcome details here.",
    placeholder: true,
  },
];
