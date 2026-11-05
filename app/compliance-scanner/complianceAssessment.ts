export type AssessmentOption = {
  label: string;
  points: number;
};

export type AssessmentQuestion = {
  id: string;
  question: string;
  help?: string;
  options: AssessmentOption[];
};

export type AssessmentCategory = {
  id: string;
  name: string;
  description: string;
  questions: AssessmentQuestion[];
};

export const assessmentCategories: AssessmentCategory[] = [
  {
    id: "legal-governance",
    name: "Accreditations & Certification",
    description: "Checks your current certification status and accreditation progress.",
    questions: [
      {
        id: "sia-licence",
        question: "Do you have any certificates, like SIA ACS, ISO or CHAS, or are you working on getting one?",
        options: [
          { label: "We are working towards one or more relevant certificates", points: 2 },
          { label: "Yes, we have one or more relevant certificates and keep them current", points: 4 },
          { label: "No, we do not have any relevant certificates and are not working towards one", points: 0 }
        ]
      },
      {
        id: "policies-controls",
        question: "Do you have written policies and procedures that your team follows every day?",
        options: [
          { label: "Some written policies exist, but they are not followed consistently", points: 2 },
          { label: "No, we do not have written policies and procedures", points: 0 },
          { label: "Yes, written policies and procedures are current and followed every day", points: 4 }
        ]
      }
    ]
  },
  {
    id: "licensing-vetting",
    name: "People & Vetting",
    description: "Checks staff screening, induction and training controls.",
    questions: [
      {
        id: "bs7858",
        question: "Do you check new staff properly before they start (ID, references, background checks)?",
        options: [
          { label: "No, new staff are not screened consistently before starting", points: 0 },
          { label: "Yes, all required checks are completed and verified before starting", points: 4 },
          { label: "We carry out some checks, but records are incomplete or inconsistent", points: 2 }
        ]
      }
    ]
  },
  {
    id: "site-operations",
    name: "Risk & Site Operations",
    description: "Checks risk assessments, workplace checks and corrective actions.",
    questions: [
      {
        id: "operational-procedures",
        question: "Do you complete a risk assessment before starting work at a new site?",
        options: [
          { label: "No, we do not complete site risk assessments", points: 0 },
          { label: "We assess most new sites, but the process is not consistent", points: 2 },
          { label: "Yes, a current risk assessment is completed before every new site starts", points: 4 }
        ]
      },
      {
        id: "incident-management",
        question: "Do your staff's training records and licences stay up to date and can you show them?",
        options: [
          { label: "No, training and licence records are not kept up to date", points: 0 },
          { label: "We review some records, but expiries and updates are not fully tracked", points: 2 },
          { label: "Yes, all training and licences are monitored, renewed and evidenced on time", points: 4 }
        ]
      },
      {
        id: "business-continuity",
        question: "Do you check your own work regularly to find and fix problems?",
        options: [
          { label: "No, work is not checked regularly for problems", points: 0 },
          { label: "Yes, regular checks are completed and issues are recorded and closed", points: 4 },
          { label: "We carry out occasional checks, but actions are not always tracked", points: 2 }
        ]
      }
    ]
  },
  {
    id: "quality-cyber",
    name: "Records, Insurance & Documents",
    description: "Checks incident records, missing certificates and insurance evidence.",
    questions: [
      {
        id: "quality-management",
        question: "Do you keep records of accidents, incidents and complaints?",
        options: [
          { label: "No, accidents, incidents and complaints are not recorded consistently", points: 0 },
          { label: "Yes, all accidents, incidents and complaints are logged and reviewed", points: 4 },
          { label: "Some records are kept, but follow-up and investigations are inconsistent", points: 2 }
        ]
      },
      {
        id: "supplier-management",
        question: "Do you know which certificates your clients or tender ask for and which ones you are still missing?",
        options: [
          { label: "No, we do not know the certificates required by our clients or tenders", points: 0 },
          { label: "Yes, requirements and missing certificates are identified and managed centrally", points: 4 },
          { label: "We know some requirements, but there are gaps in our evidence or record of missing certificates", points: 2 }
        ]
      },
      {
        id: "health-safety",
        question: "Do you have the right insurance?",
        options: [
          { label: "No, required insurance cover is not in place", points: 0 },
          { label: "Some insurance is in place, but cover or currency needs checking", points: 2 },
          { label: "Yes, the required insurance cover is active and meets our obligations", points: 4 }
        ]
      },
      {
        id: "cyber-controls",
        question: "If a client asked for your compliance documents tomorrow, could you send them quickly?",
        options: [
          { label: "Yes, an organised evidence pack can be provided quickly", points: 4 },
          { label: "No, requested documents are difficult to find or are incomplete", points: 0 },
          { label: "Some documents are available, but gathering them would take time or manual work", points: 2 }
        ]
      }
    ]
  }
];

export const getRiskStatus = (score: number) => {
  if (score < 60) return { label: "Action Required", colour: "red" };
  if (score < 85) return { label: "Improvement Needed", colour: "yellow" };
  return { label: "Audit Ready", colour: "green" };
};
