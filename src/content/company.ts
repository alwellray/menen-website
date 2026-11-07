export const contact = {
  email: "manenfps@gmail.com",
  phone: "07030141357",
  internationalPhone: "2347030141357",
  address: "Suite J-163, Road 5, Ikota Shopping Complex, VGC, Lekki, Lagos, Nigeria.",
};

export const services = [
  {
    title: "Project Management",
    intro: "Keep scope, schedule, cost and quality in view from concept to handover.",
    scope: ["Feasibility, budgeting and scheduling", "Procurement and contractor coordination", "Construction supervision and quality assurance", "Residential builds and renovations", "Commissioning and handover"],
  },
  {
    title: "Facility Management",
    intro: "Keep buildings safe, reliable and efficient with one team coordinating day-to-day operations.",
    scope: ["Integrated facility operations and helpdesk", "Preventive and reactive maintenance", "Power and energy management", "Cleaning, security and environmental services", "Asset registers, audits and vendor management"],
  },
  {
    title: "Property Management",
    intro: "Protect the value of your real estate and make property performance easier to track.",
    scope: ["Tenant relationships and lease administration", "Rent and service charge collection", "Inspections and routine upkeep", "Refurbishment and fit-out coordination", "Occupancy and performance reporting"],
  },
  {
    title: "Engineering Solutions",
    intro: "Diagnose building issues and improve how spaces and technical systems perform.",
    scope: ["Building renovation and refurbishment", "Electrical, plumbing, HVAC and fire safety systems", "Technical inspections and engineering audits", "Energy efficiency assessments", "Upgrades, installations and retrofits"],
  },
];

export const stages = [
  ["Plan", "Establish feasibility, budgets and procurement priorities. Coordinate design with future operations in mind."],
  ["Build", "Coordinate contractors, supervise construction, verify quality and manage commissioning through handover."],
  ["Operate", "Manage facilities and properties with clear responsibilities, service levels and reporting."],
  ["Sustain", "Protect asset performance with preventive maintenance, repairs, audits and efficiency upgrades."],
];

export const sectors = [
  ["Residential & private properties", "Building supervision, renovation coordination and upkeep for homeowners, landlords and investors."],
  ["Commercial buildings", "Planned maintenance, tenant coordination and facility operations for offices, malls and mixed-use developments."],
  ["Corporate organisations", "Workplace maintenance, vendor coordination and engineering support for corporate facilities."],
  ["Industrial & manufacturing", "Asset condition assessments, inspections and maintenance planning for factories and warehouses."],
  ["Real estate & development", "Development coordination, construction supervision and refurbishment support for developers and estate owners."],
  ["Individual project owners", "Budgeting, contractor coordination, site supervision and handover for personal builds and improvements."],
];

export const advantages = [
  ["Engineering-led decisions", "Technical expertise guides the decisions that affect your building systems."],
  ["One accountable partner", "A single team can support planning, delivery, operation and maintenance."],
  ["Safety and quality", "Identify risks early and use qualified personnel and approved work methods."],
  ["Transparent reporting", "Clear communication, defined service levels and honest progress updates."],
  ["Lifecycle thinking", "Consider reliability, downtime and operating costs from the start."],
  ["Flexible engagement", "Engage MANEN for a single project, a technical audit or ongoing management."],
];

export type Project = {
  title: string;
  service: string;
  description: string;
  image: string;
  imageAlt: string;
  location?: string;
};

export const projects: Project[] = [];
