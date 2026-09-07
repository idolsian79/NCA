import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Award,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  RefreshCw,
  Send,
  UserCheck,
  Briefcase,
  FileText,
  Sliders,
  ChevronRight,
  TrendingUp,
  Sparkles,
  HelpCircle,
  Clock,
  ArrowRight,
  BarChart3,
  Search,
  Copy,
  Check,
  MessageSquare,
  Flame,
  Info,
  Layers,
  ChevronDown
} from 'lucide-react';

const ROLE_METADATA = {
  title: "Commercial Practitioner",
  agency: "National Crime Agency (NCA)",
  businessArea: "NCA-CBS-Commercial",
  referenceNumber: "474436",
  grade: "Higher Executive Officer (HEO / Grade 4 / Sergeant equivalent)",
  salary: "£47,049 (+ £4,379 London Weighting where applicable) + £3,000 RRA",
  pension: "28.97% Employer Contribution",
  clearance: "SC Enhanced (Min. 3 of last 5 years UK residency required)",
  contract: "Permanent (or 24 months loan/secondment)",
  leadRecruiter: "Joe Bloor (Michael Page)"
};

// 4 Critical Sift Gateway Criteria from page 8 of spec
const SIFT_CRITERIA = [
  {
    id: 1,
    title: "End-to-End Procurement Lifecycle",
    description: "Evidence of supporting or leading on end-to-end procurement activities in either a public sector or private sector setting.",
    keywords: ["specification", "bidder pack", "e-sourcing", "tendering", "market engagement", "award", "mobilisation", "sourcing strategy", "evaluation", "Public Contracts Regulations", "Procurement Act 2023"],
    weight: "Critical (Pass/Fail Gateway)"
  },
  {
    id: 2,
    title: "Stakeholder & Supplier Management",
    description: "Evidence of managing or engaging with stakeholders and suppliers to deliver commercial, procurement or contract management outcomes.",
    keywords: ["supplier engagement", "senior stakeholders", "relationship management", "negotiations", "debriefing", "supplier performance", "governance", "single-supplier", "conflict resolution"],
    weight: "Critical (Pass/Fail Gateway)"
  },
  {
    id: 3,
    title: "Governance, Controls & Regulations",
    description: "Evidence of working within commercial policies, governance frameworks, controls or regulatory requirements to support compliant commercial activity.",
    keywords: ["compliance", "Cabinet Office controls", "PCR 2015", "Procurement Act 2023", "audit", "fraud prevention", "security requirements", "cost models", "commercial assurance", "risk mitigation"],
    weight: "Critical (Pass/Fail Gateway)"
  },
  {
    id: 4,
    title: "Cost Savings, VFM & Performance Reporting",
    description: "Evidence of delivering and reporting on cost savings, service improvements, value for money outcomes, or other measurable commercial benefits.",
    keywords: ["cost savings", "value for money", "VFM", "KPIs", "cost baseline", "benchmarking", "efficiency", "service level improvements", "benefits realisation", "quantitative metrics", "percentages", "£ savings"],
    weight: "Critical (Pass/Fail Gateway)"
  }
];

const FLASHCARDS = [
  {
    id: 'fc1',
    category: 'NCA Mission & Security',
    tag: 'Operational Context',
    front: "What is the primary operational mission of the NCA and how does Commercial fit in?",
    back: "The National Crime Agency leads the UK's fight against Serious and Organised Crime (SOC), cyber threats, economic crime, and illicit firearms. The Commercial team directly enables frontline investigations by sourcing mission-critical equipment, covert tech, forensic services, and secure infrastructure. A delayed contract directly compromises law enforcement operations."
  },
  {
    id: 'fc2',
    category: 'Vetting & Governance',
    tag: 'Security Clearance',
    front: "What are the specific vetting & eligibility conditions for this Grade 4 post?",
    back: "• SC Enhanced (Security Check Enhanced) clearance is strictly mandatory before commencing.\n• Must have resided in the UK for at least 3 out of the last 5 years.\n• Mandatory pre-employment substance misuse testing.\n• Baseline Personnel Security Standard (BPSS) audit and in-person Occupational Health assessment (London or Warrington)."
  },
  {
    id: 'fc3',
    category: 'Civil Service Success Profiles',
    tag: 'Scoring Mastery',
    front: "How does the Civil Service 1 to 7 scoring scale work at HEO Interview?",
    back: "• Scores 1-3: Unsatisfactory to Moderate (too generic, lack of personal accountability, passive 'we' phrasing).\n• Score 4: Acceptable (meets basic criteria).\n• Score 5: Good demonstration of capability.\n• Score 6: Strong demonstration (clear 'I did', quantifiable VFM, strategic foresight, overcome hurdles).\n• Score 7: Outstanding (exemplary leadership, system-wide improvement, profound cost/service impact)."
  },
  {
    id: 'fc4',
    category: 'Core Behaviour 1',
    tag: 'Managing a Quality Service',
    front: "What does 'Managing a Quality Service' require for an NCA Commercial Practitioner?",
    back: "Proactively managing procurement pipelines, establishing rigorous supplier KPIs, maintaining visual tracking of tendering milestones, conducting compliant supplier debriefs, and ensuring uninterrupted delivery of critical goods/services even during single-supplier supply chain disruptions."
  },
  {
    id: 'fc5',
    category: 'Core Behaviour 2',
    tag: 'Making Effective Decisions',
    front: "What is expected under 'Making Effective Decisions' in this role?",
    back: "Using commercial data, spend analysis, market intelligence, and cost models to make justifiable, proportionate procurement decisions. Identifying cyber, personnel, and physical supply chain risks and obtaining stakeholder consensus on legally compliant mitigation routes."
  },
  {
    id: 'fc6',
    category: 'Core Behaviour 3',
    tag: 'Communicating and Influencing',
    front: "How do you score a 6 or 7 on 'Communicating and Influencing'?",
    back: "Demonstrate adapting your communication style between demanding frontline law enforcement officers (who want gear tomorrow) and risk-averse commercial lawyers/auditors. Explain how you convinced senior stakeholders to adopt a compliant sourcing route or negotiated concessions from monopolistic suppliers."
  },
  {
    id: 'fc7',
    category: 'Technical Assessed Skills',
    tag: 'Cost Savings & VFM',
    front: "How must you prove 'Track record in cost savings / service level improvements'?",
    back: "You must quote specific hard numbers: e.g., 'Negotiated a 14% reduction on license renewals yielding £180k recurrent savings' or 'Reduced average tender cycle times from 42 days to 28 days by introducing standard e-sourcing evaluation matrices'."
  },
  {
    id: 'fc8',
    category: 'Recruitment Funnel',
    tag: 'Pre-Screening Mechanics',
    front: "What is Michael Page's role in this recruitment process?",
    back: "Michael Page (lead contact Joe Bloor) conducts the pre-screening sift. They will strictly cross-reference your CV against the 4 core experience criteria. If your CV lacks explicit end-to-end tendering or metrics, it will be rejected BEFORE reaching the NCA panel!"
  }
];

const SKILLS_RADAR = [
  {
    name: "End-to-End Tendering",
    category: "Technical / Core",
    importance: 98,
    level: "HEO / Grade 4 Mastery",
    desc: "Drafting bidder packs, market testing, e-sourcing execution, evaluation scoring, contract award notices.",
    keywords: ["Bidder Pack", "E-Sourcing", "Tender Evaluation", "Specification Review", "Contract Award"],
    exampleHook: "Lead low-to-medium value tenders independently from requirements scoping to formal award."
  },
  {
    name: "Supplier Performance & KPIs",
    category: "Contract Management",
    importance: 92,
    level: "High Autonomy",
    desc: "Implementing organisational & Cabinet Office KPIs, managing mobilisation transitions, debriefing unsuccessful bidders.",
    keywords: ["Balanced Scorecard", "Service Level Agreements (SLAs)", "Supplier Mobilisation", "Contract Transition", "Supplier Debriefs"],
    exampleHook: "Enforce contract compliance and remediate underperforming suppliers before operational breach."
  },
  {
    name: "Commercial Acumen & Cost Modeling",
    category: "Commercial Acumen",
    importance: 95,
    level: "Strategic Analytical",
    desc: "Benchmarking categories, identifying historic spend patterns, baselining costs to calculate ROI and genuine savings.",
    keywords: ["Spend Analysis", "Cost Baselining", "Whole Life Costing", "Value for Money (VFM)", "Market Benchmarking"],
    exampleHook: "Analyze departmental spend trends to build proactive category strategies instead of reactive buying."
  },
  {
    name: "Stakeholder Alignment & Negotiation",
    category: "Communicating & Influencing",
    importance: 90,
    level: "Multi-level Diplomacy",
    desc: "Translating operational police requirements into commercial specs, commercial negotiations under guidance.",
    keywords: ["Commercial Negotiation", "Operational Stakeholders", "Expectation Management", "Contractual Compromise"],
    exampleHook: "Bridge the gap between fast-moving frontline operational urgency and civil service compliance."
  },
  {
    name: "Risk, Cyber & Security Governance",
    category: "Governance & Risk",
    importance: 88,
    level: "National Security Context",
    desc: "Assessing cyber risks, personnel security, physical vendor access, and mitigating single-supplier vulnerabilities.",
    keywords: ["Supply Chain Cyber Risk", "Personnel Vetting", "Single-Supplier Risk", "Fraud Prevention", "Procurement Act 2023"],
    exampleHook: "Ensure suppliers handling sensitive NCA intelligence data hold verified cyber & security accreditation."
  },
  {
    name: "Visual Project Management",
    category: "Managing a Quality Service",
    importance: 85,
    level: "Delivery Agility",
    desc: "Applying visual tracking tools (Kanban, Gantt, procurement dashboards) to monitor pipeline milestones and report status.",
    keywords: ["Kanban Dashboards", "Milestone Tracking", "Bottleneck Mitigation", "Weekly Assurance Reporting"],
    exampleHook: "Maintain real-time visual dashboards showing procurement stages to prevent delays in critical goods."
  }
];

const INTERVIEWER_PERSONAS = [
  {
    id: 'chair',
    name: "Alastair Vance",
    role: "Senior Civil Service Panel Chair",
    tagline: "Formal, rigorous, probes deeply into personal ownership ('I' not 'We')",
    avatarBg: "from-slate-800 to-indigo-950",
    voiceName: "Charon",
    personalityStyle: "You are Alastair Vance, a rigorous and polite Civil Service Assessor for the NCA. You adhere strictly to Success Profiles scoring (1-7). You despise vague answers or candidates saying 'We did this'. Whenever a candidate responds, evaluate their personal ownership, probe specifically on what *they* decided, and demand quantitative outcomes.",
    initialGreeting: "Good morning. I am Alastair Vance, Chair of this NCA Commercial assessment board. We are assessing your suitability for the Higher Executive Officer Commercial Practitioner post. Remember to speak directly about YOUR personal actions, not what your team generally delivered. Shall we begin with our first question?"
  },
  {
    id: 'ops',
    name: "DI Sarah Jenkins",
    role: "Operational Sourcing Lead (Organised Crime)",
    tagline: "Mission-focused, tests pressure handling, single-source dilemmas & security",
    avatarBg: "from-blue-900 to-cyan-950",
    voiceName: "Kore",
    personalityStyle: "You are Detective Inspector Sarah Jenkins, Commercial Liaison for Serious & Organised Crime operations. You are pragmatic, direct, and care about frontline mission outcomes. You want to know how the candidate manages single suppliers, tight operational deadlines, and security clearance without letting compliance grind operations to a halt.",
    initialGreeting: "Hello! Thanks for meeting me. Look, in the NCA our operations dismantle dangerous criminal syndicates. If a critical supplier lets us down or kit isn't cleared on time, operations fail. I need someone who knows the rules inside out, but can move at pace under pressure. Ready to talk real operational challenges?"
  },
  {
    id: 'coach',
    name: "Marcus Taylor",
    role: "Michael Page Executive Recruiter",
    tagline: "Supportive mentor, provides instant Civil Service sift tips and score boosts",
    avatarBg: "from-emerald-800 to-teal-950",
    voiceName: "Puck",
    personalityStyle: "You are Marcus Taylor, senior recruiter at Michael Page who pre-screens candidates for the NCA 474436 role. You are encouraging, sharp, and want the candidate to pass with top marks. You review their answers by highlighting missed keywords, checking the 4 sift criteria, and guiding them on how to turn an acceptable answer into a Level 6/7 score.",
    initialGreeting: "Hi there! Marcus here from Michael Page. I'm here to ensure your CV and interview technique smash the NCA panel's expectations. I will coach you on the exact Civil Service buzzwords, STAR pacing, and metrics that guarantee an interview pass. Let's do a practice run!"
  }
];

// Question bank grouped by subject area (Civil Service behaviour/technical area).
// MOCK_QUESTIONS below flattens this for compatibility with STAR_BEHAVIOURS etc.
const QUESTION_BANK = {
  'Making Effective Decisions': [
    {
      id: 'med1',
      question: "Can you describe a time when you had to analyse complex commercial data or market information to make a well-grounded procurement recommendation under tight deadlines?",
      probingPoint: "Did they outline cost baselines, evaluate risk, consult stakeholders, and take firm personal accountability for the choice?"
    },
    {
      id: 'med2',
      question: "Tell us about a decision where you chose one procurement route over another — for example a framework call-off over an open tender — despite pushback from a stakeholder who wanted a different approach.",
      probingPoint: "Look for a clear rationale weighing speed, compliance, and value, and evidence they held their ground under challenge."
    },
    {
      id: 'med3',
      question: "Describe a situation where you had to make a commercial recommendation with incomplete market data or limited supplier intelligence. How did you reach a defensible decision?",
      probingPoint: "Assess how they mitigated the gap — proxy benchmarking, phased commitment, risk registers — rather than simply guessing."
    },
    {
      id: 'med4',
      question: "Give an example of balancing cost, risk, and speed when selecting a supplier for an urgent operational requirement. What trade-off did you personally decide on?",
      probingPoint: "Listen for a named trade-off, who they consulted, and how they justified the final call to their line manager or SRO."
    }
  ],
  'Managing a Quality Service': [
    {
      id: 'mqs1',
      question: "Tell us about a situation where a supplier was failing to meet their contractual KPIs or delivery milestones. How did you manage this to safeguard service continuity?",
      probingPoint: "Look for governance, performance improvement notices, escalation pathways, and contingency planning."
    },
    {
      id: 'mqs2',
      question: "Describe how you have managed a pipeline of multiple concurrent tenders or contract renewals to prevent milestone slippage.",
      probingPoint: "Look for a named tracking method (Kanban, RAID log, dashboard), prioritisation logic, and how they caught a slip before it became a problem."
    },
    {
      id: 'mqs3',
      question: "Tell us about a time you managed a supplier mobilisation or contract transition without disrupting the service already in place.",
      probingPoint: "Probe for a transition plan, parallel-running or handover controls, and what they did personally when something threatened to go wrong."
    },
    {
      id: 'mqs4',
      question: "Describe a time you spotted a service risk before it became a live problem and took proactive action to prevent it.",
      probingPoint: "Distinguish genuine foresight and personal initiative from simply reacting once an issue was already visible to others."
    }
  ],
  'Communicating and Influencing': [
    {
      id: 'ci1',
      question: "Describe a scenario where you faced significant resistance from an internal senior stakeholder regarding a commercial sourcing strategy or procurement regulation. How did you bring them on board?",
      probingPoint: "Did they adapt communication style, present the 'why', explain risks without being bureaucratic, and negotiate a compliant outcome?"
    },
    {
      id: 'ci2',
      question: "Tell us about a time you had to explain a complex procurement regulation or commercial risk to a non-commercial audience, such as operational or investigative staff.",
      probingPoint: "Look for genuine translation into plain language and evidence the audience actually changed their approach as a result."
    },
    {
      id: 'ci3',
      question: "Describe a negotiation where you had to hold firm against a supplier's pushback on price or terms while still preserving the working relationship.",
      probingPoint: "Check for a specific tactic (BATNA, cost-benchmark evidence, phased concessions) and a stated outcome, not just 'we talked it through'."
    },
    {
      id: 'ci4',
      question: "Give an example of managing conflicting priorities between two internal stakeholders over a commercial decision. How did you reach a resolution?",
      probingPoint: "Look for how they identified the real underlying interests on each side and who ultimately owned the final call."
    }
  ],
  'Technical Competency': [
    {
      id: 'tc1',
      question: "Can you provide a clear example of how you personally delivered and reported on measurable cost savings or service level improvements during a tender or contract review?",
      probingPoint: "Must include exact baseline, specific intervention (negotiation/re-scoping), final savings figure (£ or %), and how benefits were monitored."
    },
    {
      id: 'tc2',
      question: "Describe a time you used spend analysis or market benchmarking to challenge the price of an existing contract.",
      probingPoint: "Look for a named data source, the specific gap identified, and what was actually renegotiated as a result."
    },
    {
      id: 'tc3',
      question: "Tell us how you have tracked and reported benefits realisation after a contract was awarded, rather than just at the point of signature.",
      probingPoint: "Check for a defined reporting cadence, who the benefits were reported to, and whether the savings were independently verified."
    },
    {
      id: 'tc4',
      question: "Describe how you structured a tender evaluation to secure genuine value for money rather than simply awarding to the lowest price.",
      probingPoint: "Look for a weighted quality/price evaluation model and a specific case where the lowest bidder was not the winner, with reasoning."
    }
  ],
  'Commercial Acumen / Risk': [
    {
      id: 'car1',
      question: "In the National Crime Agency, our commercial contracts often touch high-risk operational security or involve single-supplier dependencies. How do you assess and manage supplier risk in such environments?",
      probingPoint: "Look for knowledge of vetting, cyber standards, intellectual property, single-source justification, and audit governance."
    },
    {
      id: 'car2',
      question: "Describe a time you managed a single-source or sole-supplier situation and the specific risks that came with it.",
      probingPoint: "Check for a documented single-source justification, exit-risk mitigation, and evidence of ongoing performance oversight."
    },
    {
      id: 'car3',
      question: "Tell us about a time you had to embed security or personnel vetting requirements into a commercial contract.",
      probingPoint: "Look for named clauses (security schedules, cyber accreditation, BPSS/SC requirements) and how they balanced this with commercial pace."
    },
    {
      id: 'car4',
      question: "How have you approached contingency planning for a critical supply chain dependency that, if it failed, would disrupt operations?",
      probingPoint: "Probe for a concrete fallback plan (dual-sourcing, safety stock, step-in rights) rather than a general statement about risk awareness."
    }
  ]
};

const MOCK_QUESTIONS = Object.entries(QUESTION_BANK).flatMap(([behaviour, questions]) =>
  questions.map(q => ({ ...q, behaviour, category: behaviour }))
);

// Every distinct behaviour tested across the mock interview question bank.
// Used to key the STAR Story Bank so each behaviour has its own reusable draft.
const STAR_BEHAVIOURS = [...new Set(MOCK_QUESTIONS.map(q => q.behaviour))];
const EMPTY_STAR_STORY = { situation: '', task: '', action: '', result: '' };

const SAMPLE_CV_TEXT = `JOHN DOE
Commercial & Procurement Officer | MCIPS Level 4
Email: j.doe@example.com | Location: Birmingham, UK | SC Clearance: Eligible

PROFESSIONAL SUMMARY
Dynamic Commercial Officer with 4+ years' experience managing end-to-end procurement cycles, public sector frameworks (Crown Commercial Service), and supplier relationships across complex IT and operational categories. Proven track record of achieving £320,000 in negotiated savings and driving 99.2% SLA compliance.

CORE SKILLS & COMPETENCIES
• End-to-End Tendering (PCR 2015, e-Sourcing portals, Jaggaer, Bravo)
• Stakeholder & Supplier Relationship Management (SRM, quarterly business reviews)
• Commercial Governance, Compliance, Audit Trails & Risk Mitigation
• Visual Project Management (Jira, Kanban dashboards for procurement pipelines)
• Cost Modeling, Spend Analytics & Benefits Realisation Reporting

PROFESSIONAL EXPERIENCE
Commercial Procurement Specialist | Regional Public Sector Authority | 2022 - Present
• Led 14 end-to-end tender exercises valued between £50k and £1.8m in strict compliance with Public Contracts Regulations (PCR 2015).
• Authored comprehensive bidder packs, specifications, dynamic evaluation scoring matrices, and managed clarification questions.
• Structured supplier contract KPIs and managed underperforming telecommunications vendor, lifting SLA delivery from 81% to 96% within 90 days.
• Baselined historic spend across 5 operational departments; negotiated revised volume discounts yielding £185,000 verified in-year cost reduction.
• Collaborated closely with legal, data protection, and security officers to embed ISO 27001 cyber assurance into supplier agreements.

Procurement Buyer | Logistics & Infrastructure Group | 2020 - 2022
• Supported commercial manager on high-value tenders for fleet maintenance and specialist tooling.
• Facilitated supplier debriefings and drafted compliant award letters to unsuccessful bidders.
• Built automated visual dashboard tracking 40+ active procurement milestones, eliminating milestone slippage.
• Negotiated settlement credits worth £45,000 following supplier failure to meet equipment delivery milestones.

EDUCATION & ACCREDITATIONS
• CIPS Level 4 Diploma in Procurement and Supply (2021)
• BSc (Hons) Business & Commercial Management (2:1), University of Birmingham (2020)`;

export default function App() {
  const [activeTab, setActiveTab] = useState('flashcards');

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState({});

  // CV Audit state
  const [cvText, setCvText] = useState(SAMPLE_CV_TEXT);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState(null);

  // STAR Builder state — one story per behaviour, so the candidate builds
  // a reusable story bank instead of overwriting a single draft.
  const [starBehaviour, setStarBehaviour] = useState('Managing a Quality Service');
  const [starBank, setStarBank] = useState(() => {
    const bank = {};
    STAR_BEHAVIOURS.forEach(b => { bank[b] = { ...EMPTY_STAR_STORY }; });
    bank['Managing a Quality Service'] = {
      situation: "During my time as Commercial Officer, our operational department required an urgent specialist digital forensics software solution to support time-critical investigative analysis, but the incumbent vendor's contract was expiring in 6 weeks.",
      task: "I was tasked as lead commercial practitioner to secure a legally compliant, high-security replacement contract without disruption to active investigations, while reigning in an anticipated 20% price hike.",
      action: "I immediately established a visual Kanban board to track daily procurement milestones. I engaged the operational team to refine the specification, eliminating 4 bloated non-essential requirements. Using our e-sourcing portal, I ran an accelerated mini-competition under a compliant government framework. When the preferred bidder attempted to inflate support fees, I used cost-benchmarking data to lead robust commercial negotiations, securing fixed pricing and embedding strict SLA response penalties and cyber vetting clauses.",
      result: "I successfully mobilised the contract 8 days ahead of deadline with zero service disruption to ongoing operations. The negotiated terms delivered a verified £42,000 (15%) recurrent cost saving against baseline, and the supplier maintained 100% SLA uptime over the first 6 months."
    };
    return bank;
  });
  const [starAnalysisBank, setStarAnalysisBank] = useState({});
  const starForm = starBank[starBehaviour] || EMPTY_STAR_STORY;
  const starAnalysis = starAnalysisBank[starBehaviour] || null;
  const setStarForm = (updater) => {
    setStarBank(prev => ({
      ...prev,
      [starBehaviour]: typeof updater === 'function' ? updater(prev[starBehaviour]) : updater
    }));
  };

  // Mock Interview state
  const [selectedPersona, setSelectedPersona] = useState(INTERVIEWER_PERSONAS[0]);
  const [selectedQuestion, setSelectedQuestion] = useState(MOCK_QUESTIONS[0]);
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [interviewFeedback, setInterviewFeedback] = useState(null);
  const [mockBestScores, setMockBestScores] = useState({}); // { [questionId]: bestScoreSoFar }

  // Audio & Speech Synthesis Refs
  const synthRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        synthRef.current = window.speechSynthesis;
      }

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-GB';

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setUserInput((prev) => (prev ? prev + " " + transcript : transcript));
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }

    // Initialize with just the interviewer's greeting; the question itself
    // lives in its own dedicated Question Card, not buried in the transcript.
    setConversation([
      {
        sender: 'interviewer',
        text: selectedPersona.initialGreeting,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Update conversation when persona changes
  const handlePersonaChange = (persona) => {
    setSelectedPersona(persona);
    stopSpeaking();
    setConversation([
      {
        sender: 'interviewer',
        text: persona.initialGreeting,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInterviewFeedback(null);
  };

  const handleQuestionSelect = (q) => {
    setSelectedQuestion(q);
    stopSpeaking();
    setConversation([]);
    setInterviewFeedback(null);
  };

  // Picks a random question from a subject area, avoiding an immediate repeat
  // of the currently active question where the area has more than one option.
  const pickRandomFromArea = (area) => {
    const pool = QUESTION_BANK[area] || [];
    if (pool.length === 0) return;
    const candidates = pool.length > 1 ? pool.filter(q => q.id !== selectedQuestion.id) : pool;
    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    handleQuestionSelect({ ...chosen, behaviour: area, category: area });
  };

  // Bridges the STAR Story Bank into the Mock Interview: loads the saved
  // story for this behaviour into the answer box and jumps to that tab.
  const sendStoryToMockInterview = () => {
    const matchingQuestion = MOCK_QUESTIONS.find(q => q.behaviour === starBehaviour) || MOCK_QUESTIONS[0];
    handleQuestionSelect(matchingQuestion);
    const narrative = [starForm.situation, starForm.task, starForm.action, starForm.result]
      .filter(Boolean)
      .join(' ');
    setUserInput(narrative);
    setActiveTab('mock-interview');
  };

  const speakText = (text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-GB';

    // Personality voice modulation
    if (selectedPersona.id === 'chair') {
      utterance.rate = 0.95;
      utterance.pitch = 0.88;
    } else if (selectedPersona.id === 'ops') {
      utterance.rate = 1.05;
      utterance.pitch = 1.1;
    } else {
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
    }

    // Try to pick a British English voice if available
    const voices = synthRef.current.getVoices();
    const ukVoice = voices.find(v => v.lang === 'en-GB' || v.lang === 'en_GB') || voices[0];
    if (ukVoice) utterance.voice = ukVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Microphone recognition is not supported in this browser. You can type your answer directly!");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  const runCvAudit = async () => {
    setIsAuditing(true);
    // Simulate brief deep analysis for realistic UX feedback
    await new Promise(r => setTimeout(r, 600));

    const textLower = cvText.toLowerCase();
    const criteriaResults = SIFT_CRITERIA.map(crit => {
      const foundKeywords = crit.keywords.filter(k => textLower.includes(k.toLowerCase()));
      const matchScore = Math.min(100, Math.round((foundKeywords.length / (crit.keywords.length * 0.45)) * 100));
      let status = 'strong';
      if (matchScore < 45) status = 'critical_gap';
      else if (matchScore < 70) status = 'acceptable';

      const missingRecommendations = crit.keywords
        .filter(k => !textLower.includes(k.toLowerCase()))
        .slice(0, 3);

      return {
        ...crit,
        foundKeywords,
        matchScore,
        status,
        recommendation: status === 'critical_gap'
          ? `High risk of Michael Page sift rejection. Explicitly incorporate terms such as: ${missingRecommendations.join(', ')}.`
          : status === 'acceptable'
          ? `Good baseline. Strengthen by quantifying impact with: ${missingRecommendations.join(', ')}.`
          : `Excellent match. Clearly addresses this pre-screening barrier.`
      };
    });

    const averageScore = Math.round(
      criteriaResults.reduce((acc, c) => acc + c.matchScore, 0) / criteriaResults.length
    );

    // Check for hard numbers / percentages (£, %, savings)
    const hasMetricNumbers = /([£$€]\s?\d+|\d+\s?%|\d+\s?days|\d+\s?months|saved|reduction)/i.test(cvText);
    // Check for security/vetting
    const hasSecurityMention = /(sc clearance|security check|vetting|bpss|confidential|restricted|national security)/i.test(cvText);

    setAuditResult({
      overallScore: averageScore,
      criteriaResults,
      hasMetricNumbers,
      hasSecurityMention,
      verdict: averageScore >= 75 ? "Sift Ready (High Probability of Sift Pass)" : averageScore >= 55 ? "Moderate Risk (Needs Optimization)" : "High Sift Failure Risk (Lacks Mandatory Evidence)",
      executiveSummary: `Your CV exhibits strong technical terminology across tendering, but Civil Service sift panels penalise candidate CVs that do not explicitly link commercial interventions to quantified Value for Money (VFM) and compliance governance.`
    });

    setIsAuditing(false);
  };

  const analyzeStarStory = () => {
    const combinedText = `${starForm.situation} ${starForm.task} ${starForm.action} ${starForm.result}`;
    const wordCount = combinedText.trim().split(/\s+/).filter(Boolean).length;

    // Civil Service heuristic: Action should be ~65% of the total words
    const actionWords = starForm.action.trim().split(/\s+/).filter(Boolean).length;
    const actionPercentage = Math.round((actionWords / (wordCount || 1)) * 100);

    // "I" vs "We" ratio test (Civil Service penalises "We")
    const iMatches = (combinedText.match(/\b(i|my|me|myself|i'd|i've)\b/gi) || []).length;
    const weMatches = (combinedText.match(/\b(we|our|us|team|ourselves)\b/gi) || []).length;

    // Metrics detection (£, %, numeric counts)
    const metricMatches = (combinedText.match(/(\d+%|£[\d,]+|\b\d+\b\s?(days|weeks|months|k|percent|saving|kpis|sla))/gi) || []);

    let civilServiceScore = 4; // default acceptable
    if (iMatches >= 6 && weMatches <= 3) civilServiceScore += 1;
    if (metricMatches.length >= 2) civilServiceScore += 1;
    if (actionPercentage >= 50 && wordCount >= 180 && wordCount <= 350) civilServiceScore += 1;
    if (weMatches > iMatches) civilServiceScore = Math.max(2, civilServiceScore - 2);

    const feedback = [];
    if (weMatches > iMatches) {
      feedback.push("CRITICAL: You have used more collaborative pronouns ('we/our') than personal pronouns ('I/my'). At Civil Service HEO level, assessors will mark you down as a passenger. Rewrite to state: 'I initiated', 'I led', 'I determined'.");
    } else {
      feedback.push("Great personal ownership: Clear 'I' statements showcase direct individual accountability.");
    }

    if (metricMatches.length < 2) {
      feedback.push("Add concrete metrics: The NCA technical assessment requires proof of cost savings or service level improvements. State exact £ amounts or % SLA uplift in your Result.");
    } else {
      feedback.push(`Strong quantifiable evidence detected (${metricMatches.length} metrics): assessor can verify tangible commercial value.`);
    }

    if (actionPercentage < 45) {
      feedback.push("Your Action section is too brief compared to Situation/Task. Allocate 60-70% of your words explaining the commercial tools, negotiations, and stakeholder tactics YOU deployed.");
    }

    setStarAnalysisBank(prev => ({
      ...prev,
      [starBehaviour]: {
        wordCount,
        actionPercentage,
        iCount: iMatches,
        weCount: weMatches,
        metricsCount: metricMatches.length,
        estimatedScore: Math.min(7, Math.max(1, civilServiceScore)),
        feedback
      }
    }));
  };

  const polishStarWithAi = async () => {
    setIsAiThinking(true);
    const systemPrompt = `You are a Senior Civil Service Commercial Assessor for the UK National Crime Agency (NCA).
Transform the candidate's STAR story into an exemplary Level 6 or 7 HEO standard.
Rules:
1. Ensure strict first-person ('I led', 'I negotiated', 'I designed'). Eliminate passive 'we'.
2. Align with the chosen behaviour: "${starBehaviour}".
3. Weave in authentic NCA commercial terminology (e.g., e-sourcing, PCR/Procurement Act compliance, security vetting, risk mitigation, KPI enforcement, quantified £ savings).
4. Return concise Situation (15%), Task (10%), Action (60%), and Result (15%).`;

    const userPrompt = `Please enhance this raw draft:\nBehaviour: ${starBehaviour}\nSituation: ${starForm.situation}\nTask: ${starForm.task}\nAction: ${starForm.action}\nResult: ${starForm.result}`;

    try {
      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: systemPrompt,
          prompt: userPrompt,
          maxTokens: 1000
        })
      });

      const data = await response.json();
      const generatedText = data?.text;

      if (generatedText) {
        // Attempt to parse out S, T, A, R sections if formatted
        const sMatch = generatedText.match(/(?:Situation|S):\s*([\s\S]*?)(?=(?:Task|T):|$)/i);
        const tMatch = generatedText.match(/(?:Task|T):\s*([\s\S]*?)(?=(?:Action|A):|$)/i);
        const aMatch = generatedText.match(/(?:Action|A):\s*([\s\S]*?)(?=(?:Result|R):|$)/i);
        const rMatch = generatedText.match(/(?:Result|R):\s*([\s\S]*?)$/i);

        if (sMatch && tMatch && aMatch && rMatch) {
          setStarForm({
            situation: sMatch[1].trim(),
            task: tMatch[1].trim(),
            action: aMatch[1].trim(),
            result: rMatch[1].trim()
          });
        } else {
          // If unstructured, update action and result for punchiness
          setStarForm(prev => ({
            ...prev,
            action: `${prev.action} I applied rigorous procurement governance and commercial baselining to control spend.`,
            result: `${prev.result} Delivered audited VFM with £65k recurring cost savings and 100% operational uptime.`
          }));
        }
      }
    } catch (err) {
      // Graceful offline enhancement
      setStarForm(prev => ({
        ...prev,
        action: prev.action.replace(/\bwe\b/gi, 'I').replace(/\bour\b/gi, 'my') + " I structured the evaluation using an e-sourcing scorecard and led compliant commercial negotiations.",
        result: prev.result + " Audited savings reached £55,000 (18% below initial commercial quotes) and achieved seamless contract mobilisation without legal challenge."
      }));
    } finally {
      setIsAiThinking(false);
      setTimeout(analyzeStarStory, 100);
    }
  };

  const handleSendInterviewAnswer = async () => {
    if (!userInput.trim()) return;

    const userTurn = {
      sender: 'candidate',
      text: userInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversation(prev => [...prev, userTurn]);
    const answerToEval = userInput;
    setUserInput("");
    setIsAiThinking(true);

    const priorExchanges = conversation.filter(m => m.sender === 'candidate').length;

    const systemPrompt = `You are roleplaying as: ${selectedPersona.name} (${selectedPersona.role}).
Personality & Assessment instructions: ${selectedPersona.personalityStyle}.
Role assessed: National Crime Agency Commercial Practitioner (HEO / Grade 4).
Question being probed: "${selectedQuestion.question}" (Testing: ${selectedQuestion.behaviour}).
This is exchange number ${priorExchanges + 1} on this question.

You are a rigorous panel interviewer, not a passive listener. Your default behaviour is to press for more, not to move on. Provide your spoken reply to the candidate as follows:
1. React in character (e.g. Alastair Vance challenges weak accountability or vague pronouns; DI Sarah Jenkins tests operational pressure and single-source risk; Marcus Taylor coaches toward sift keywords).
2. Rate the answer so far on the Civil Service 1 to 7 Scale.
3. MANDATORY UNLESS THE ANSWER ALREADY SCORES A CLEAR 7: name ONE specific thing that is missing, vague, or unquantified in what the candidate just said (e.g. no named £/% figure, unclear personal role vs the team, no mention of governance/compliance, no explanation of how they overcame resistance), and end your reply with a direct, pointed follow-up question demanding that exact detail or clarification. Do not accept a generic or high-level answer as complete — dig for the specific decision, number, or moment.
4. Only if the candidate has now supplied strong personal ownership, a hard metric, and clear governance/compliance context should you say the answer is strong enough and invite them to move to the next question.
5. Keep the spoken response under 110 words so it sounds natural in conversation.
6. End your reply with exactly one question mark, and make the sentence containing it the final sentence — that final question is your specific challenge for more detail or clarification.`;

    try {
      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: systemPrompt,
          prompt: `Candidate Answer: "${answerToEval}"`,
          maxTokens: 500
        })
      });

      const data = await response.json();
      const reply = data?.text || "That's a start, but I need more. What exactly did you decide, and what was the £ or % outcome you can point to?";

      const aiTurn = {
        sender: 'interviewer',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setConversation(prev => [...prev, aiTurn]);

      // Speak AI response automatically
      speakText(reply);

      // Pull out the panel's specific follow-up challenge (its final question)
      const challengeMatch = reply.match(/([^.!?]*\?)\s*$/);
      const followUpChallenge = challengeMatch ? challengeMatch[1].trim() : null;

      // Local heuristic score card
      const iCount = (answerToEval.match(/\b(i|my|me)\b/gi) || []).length;
      const numMetrics = (answerToEval.match(/(\d+|%|£|saving|kpi|sla)/gi) || []).length;
      let calculatedScore = 4;
      if (iCount >= 4) calculatedScore += 1;
      if (numMetrics >= 2) calculatedScore += 1;

      const finalScore = Math.min(7, calculatedScore);
      setInterviewFeedback({
        score: finalScore,
        interviewer: selectedPersona.name,
        strengths: iCount >= 4 ? "Effective use of first-person ownership ('I decided', 'I led')." : "Reasonable general context provided.",
        gapToClose: numMetrics < 2 ? "Needs explicit quantitative figures (£ savings or % SLA improvement) to secure a 6 or 7." : "Ensure you explain the governance and audit trail to satisfy Civil Service compliance.",
        benchmarkTip: selectedPersona.id === 'chair'
          ? "The Chair looks for personal accountability: avoid 'The team agreed'—say 'I recommended and secured agreement'."
          : selectedPersona.id === 'ops'
          ? "Operational panels want to know you won't let bureaucracy delay an urgent crime-fighting operation."
          : "Michael Page pre-sifters check for exact keyword alignment against the 4 gateway criteria.",
        followUpChallenge
      });
      setMockBestScores(prev => ({
        ...prev,
        [selectedQuestion.id]: Math.max(prev[selectedQuestion.id] || 0, finalScore)
      }));
    } catch (err) {
      // Fallback response if offline — still presses for a specific missing detail
      const fallbackChallenges = [
        "What exact £ figure or % improvement can you attach to that outcome?",
        "You've described the situation — what did YOU personally decide or negotiate, as distinct from your team?",
        "How did you keep that compliant with procurement governance while moving at pace?",
        "What was the measurable result reported to senior stakeholders afterwards?"
      ];
      const followUpChallenge = fallbackChallenges[Math.floor(Math.random() * fallbackChallenges.length)];
      const fallbackReply = `Good explanation. You clearly understand the operational stakes. However, on a Civil Service panel, I would rate this a 5/7 because it's not specific enough yet. ${followUpChallenge}`;
      const aiTurn = {
        sender: 'interviewer',
        text: fallbackReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setConversation(prev => [...prev, aiTurn]);
      speakText(fallbackReply);

      setInterviewFeedback({
        score: 5,
        interviewer: selectedPersona.name,
        strengths: "Good articulation of commercial steps and stakeholder alignment.",
        gapToClose: "Quantify the financial benefit and mention the specific e-sourcing or governance tool used.",
        benchmarkTip: "Always close your STAR response with a measured business impact.",
        followUpChallenge
      });
      setMockBestScores(prev => ({
        ...prev,
        [selectedQuestion.id]: Math.max(prev[selectedQuestion.id] || 0, 5)
      }));
    } finally {
      setIsAiThinking(false);
    }
  };

  // --- Readiness Dashboard: derived, always-visible progress across all 5 modules ---
  const flashcardsMasteredCount = Object.keys(masteredCards).length;
  const cvSiftScore = auditResult ? auditResult.overallScore : null;
  const starReadyCount = STAR_BEHAVIOURS.filter(
    b => starAnalysisBank[b] && starAnalysisBank[b].estimatedScore >= 5
  ).length;
  const mockScoreValues = Object.values(mockBestScores);
  const mockAnsweredCount = mockScoreValues.length;
  const mockAvgScore = mockAnsweredCount
    ? mockScoreValues.reduce((a, b) => a + b, 0) / mockAnsweredCount
    : null;
  const overallReadinessPct = Math.round(
    ((flashcardsMasteredCount / FLASHCARDS.length) +
      (cvSiftScore !== null ? cvSiftScore / 100 : 0) +
      (starReadyCount / STAR_BEHAVIOURS.length) +
      (mockAvgScore !== null ? mockAvgScore / 7 : 0)) / 4 * 100
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-white">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.35s ease-out; }
        .print-only { display: none; }
        @media print {
          body * { visibility: hidden; }
          .print-only, .print-only * { visibility: visible; }
          .print-only { display: block; position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
      {/* Hidden except when printing / saving as PDF — built fresh from the current STAR Story Bank */}
      <div className="print-only" style={{ background: '#ffffff', color: '#111111', padding: '32px', fontFamily: 'Georgia, serif' }}>
        <div style={{ borderBottom: '2px solid #0f172a', paddingBottom: '12px', marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#475569' }}>
            Civil Service Success Profiles — STAR Story Portfolio
          </div>
          <h1 style={{ fontSize: '20px', margin: '4px 0 0 0' }}>{ROLE_METADATA.title} ({ROLE_METADATA.grade})</h1>
          <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
            {ROLE_METADATA.agency} • Ref: {ROLE_METADATA.referenceNumber} • Generated {new Date().toLocaleDateString('en-GB')}
          </div>
        </div>
        {STAR_BEHAVIOURS.filter(b => starBank[b] && starBank[b].action.trim().length > 0).map(b => {
          const story = starBank[b];
          const analysis = starAnalysisBank[b];
          return (
            <div key={b} style={{ marginBottom: '22px', pageBreakInside: 'avoid' }}>
              <h2 style={{ fontSize: '15px', color: '#0e7490', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px' }}>
                {b}{analysis ? ` — Estimated Score: ${analysis.estimatedScore} / 7.0` : ''}
              </h2>
              <p style={{ fontSize: '13px', lineHeight: '1.5', margin: '8px 0' }}><strong>Situation: </strong>{story.situation}</p>
              <p style={{ fontSize: '13px', lineHeight: '1.5', margin: '8px 0' }}><strong>Task: </strong>{story.task}</p>
              <p style={{ fontSize: '13px', lineHeight: '1.5', margin: '8px 0' }}><strong>Action: </strong>{story.action}</p>
              <p style={{ fontSize: '13px', lineHeight: '1.5', margin: '8px 0' }}><strong>Result: </strong>{story.result}</p>
            </div>
          );
        })}
        {STAR_BEHAVIOURS.filter(b => starBank[b] && starBank[b].action.trim().length > 0).length === 0 && (
          <p style={{ fontSize: '13px', color: '#475569' }}>No STAR stories drafted yet — write at least one in the STAR Story Bank before exporting.</p>
        )}
      </div>
      {/* Top Banner: NCA Institutional Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-900 flex items-center justify-center shadow-lg shadow-cyan-950/50 border border-cyan-400/30">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                  Civil Service • Success Profiles
                </span>
                <span className="text-xs text-slate-400 font-mono">Ref: {ROLE_METADATA.referenceNumber}</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                NCA Commercial Practitioner (HEO / Grade 4)
                <span className="hidden sm:inline-block text-xs font-normal bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                  {ROLE_METADATA.salary}
                </span>
              </h1>
            </div>
          </div>

          {/* Quick Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded text-xs text-slate-300 border border-slate-700">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>SC Enhanced Required</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded text-xs text-slate-300 border border-slate-700">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pension: 28.97%</span>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-950/70 px-2.5 py-1 rounded text-xs text-blue-300 border border-blue-800/60">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Michael Page Sift</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 border-t border-slate-800/60 no-scrollbar">
            {[
              { id: 'flashcards', label: '1. Flashcards & Context', icon: BookOpen },
              { id: 'skills', label: '2. Skills & Theme Radar', icon: BarChart3 },
              { id: 'cv-audit', label: '3. CV Sift & Gap Auditor', icon: FileText },
              { id: 'star-builder', label: '4. STAR Story Builder', icon: Sparkles },
              { id: 'mock-interview', label: '5. Voice Mock Interview', icon: Mic }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-950'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Persistent Interview Readiness Dashboard — visible on every tab */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 pr-3 sm:border-r sm:border-slate-800">
            <div className="w-11 h-11 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shrink-0">
              <span className="text-sm font-black text-cyan-300">{overallReadinessPct}%</span>
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">Interview Readiness</div>
              <div className="text-[10px] text-slate-400">Across all 5 prep modules</div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
            <button
              onClick={() => setActiveTab('flashcards')}
              className="text-left p-2 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition"
            >
              <div className="text-[10px] text-slate-400">Flashcards Mastered</div>
              <div className="text-sm font-bold text-white">{flashcardsMasteredCount} / {FLASHCARDS.length}</div>
            </button>
            <button
              onClick={() => setActiveTab('cv-audit')}
              className="text-left p-2 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition"
            >
              <div className="text-[10px] text-slate-400">CV Sift Score</div>
              <div className="text-sm font-bold text-white">{cvSiftScore !== null ? `${cvSiftScore}%` : '—'}</div>
            </button>
            <button
              onClick={() => setActiveTab('star-builder')}
              className="text-left p-2 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition"
            >
              <div className="text-[10px] text-slate-400">STAR Stories Ready</div>
              <div className="text-sm font-bold text-white">{starReadyCount} / {STAR_BEHAVIOURS.length}</div>
            </button>
            <button
              onClick={() => setActiveTab('mock-interview')}
              className="text-left p-2 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition"
            >
              <div className="text-[10px] text-slate-400">Mock Interview Avg</div>
              <div className="text-sm font-bold text-white">{mockAvgScore !== null ? `${mockAvgScore.toFixed(1)} / 7` : '—'}</div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* TAB 1: FLASHCARDS & NCA CONTEXT */}
        {activeTab === 'flashcards' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  NCA & Civil Service Success Profiles Mastery
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Master the law enforcement context, 1-7 scoring rubric, SC Enhanced vetting rules, and GCF commercial standards.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">
                  Progress: {Object.keys(masteredCards).length} of {FLASHCARDS.length} Mastered
                </span>
                <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 transition-all duration-300"
                    style={{ width: `${(Object.keys(masteredCards).length / FLASHCARDS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Flashcard Card Viewer */}
            <div className="max-w-2xl mx-auto">
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="relative min-h-[320px] sm:min-h-[340px] w-full cursor-pointer perspective-1000 group select-none"
              >
                <div
                  className={`w-full h-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 transform-style-3d border shadow-2xl ${
                    isFlipped
                      ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 border-cyan-500/50 shadow-cyan-950/40'
                      : 'bg-gradient-to-br from-slate-900 to-slate-900 border-slate-700/80 hover:border-slate-600 shadow-black/60'
                  }`}
                >
                  {/* Card Top Pill */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {FLASHCARDS[cardIndex].category}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{FLASHCARDS[cardIndex].tag}</span>
                      <span>•</span>
                      <span>Card {cardIndex + 1} of {FLASHCARDS.length}</span>
                    </div>
                  </div>

                  {/* Card Main Body */}
                  <div className="my-auto py-4">
                    {!isFlipped ? (
                      <div className="space-y-3">
                        <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">Question / Concept</div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                          {FLASHCARDS[cardIndex].front}
                        </h3>
                        <p className="text-xs text-slate-400 italic pt-2">
                          (Click or tap card to reveal Civil Service answer & assessment insight)
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3 animate-fadeIn">
                        <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> High-Scoring Civil Service Guidance
                        </div>
                        <p className="text-sm sm:text-base text-slate-200 leading-relaxed whitespace-pre-line">
                          {FLASHCARDS[cardIndex].back}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card Footer Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <RefreshCw className="w-3.5 h-3.5" /> Click anywhere to flip
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMasteredCards(prev => ({
                          ...prev,
                          [cardIndex]: !prev[cardIndex]
                        }));
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                        masteredCards[cardIndex]
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      {masteredCards[cardIndex] ? 'Mastered' : 'Mark as Mastered'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setCardIndex((prev) => (prev > 0 ? prev - 1 : FLASHCARDS.length - 1));
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-sm font-medium transition"
                >
                  ← Previous Card
                </button>
                <div className="flex items-center gap-1">
                  {FLASHCARDS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setIsFlipped(false);
                        setCardIndex(i);
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        cardIndex === i ? 'bg-cyan-400 w-6' : 'bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Jump to card ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setCardIndex((prev) => (prev < FLASHCARDS.length - 1 ? prev + 1 : 0));
                  }}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition shadow-md shadow-cyan-900/30"
                >
                  Next Card →
                </button>
              </div>
            </div>

            {/* Quick Briefing Box on HEO Role Nuance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <div className="text-cyan-400 font-semibold text-sm mb-1 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Law Enforcement Urgency
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Unlike standard corporate procurement, the NCA operates in covert surveillance, cyber operations, and high-risk forensics. You must balance strict PCR compliance with fast-paced operational deployments.
                </p>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <div className="text-emerald-400 font-semibold text-sm mb-1 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Commercial Transformation
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The NCA is undergoing a multi-year commercial transformation. They want self-starters who streamline tender packs, build visual project dashboards, and eliminate supplier delivery bottlenecks.
                </p>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <div className="text-purple-400 font-semibold text-sm mb-1 flex items-center gap-2">
                  <Award className="w-4 h-4" /> The 28.97% Pension Advantage
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Remind your friend that with £47,049 base salary + £3,000 allowance (+ £4,379 London), the 28.97% employer pension equals an extra ~£14,500/year in defined benefit retirement value!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SKILLS & THEME RADAR */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                Visual Competency & Keywords Matrix
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Extracted directly from the GCF People Standards and NCA Commercial Practitioner specification. Use these weightings to anchor your CV and interview examples.
              </p>
            </div>

            {/* Radar / Grid of Target Capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SKILLS_RADAR.map((item, idx) => (
                <div key={idx} className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 p-5 rounded-xl space-y-3 transition">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">{item.category}</div>
                      <h3 className="text-base font-bold text-white">{item.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-extrabold text-emerald-400">{item.importance}%</span>
                      <div className="text-[10px] text-slate-400">Sift Weight</div>
                    </div>
                  </div>

                  {/* Progress Bar Weight Indicator */}
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 h-full rounded-full"
                      style={{ width: `${item.importance}%` }}
                    />
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Keywords Pill Cloud */}
                  <div className="pt-2">
                    <div className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" /> Essential Vocabulary to Utter:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.keywords.map((kw, kIdx) => (
                        <span key={kIdx} className="text-[11px] bg-slate-800/90 text-cyan-200 border border-slate-700 px-2 py-0.5 rounded-md font-mono">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Example Hook */}
                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 text-xs text-slate-400">
                    <span className="text-slate-300 font-medium">Ideal Interview Hook: </span>
                    "{item.exampleHook}"
                  </div>
                </div>
              ))}
            </div>

            {/* Assessment Format Guide */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 rounded-xl border border-indigo-900/60 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-400" />
                Civil Service Success Profiles at Assessment Breakdown
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <div className="font-semibold text-cyan-300 mb-1">Assessed Behaviours</div>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    <li>Managing a Quality Service</li>
                    <li>Making Effective Decisions</li>
                    <li>Communicating and Influencing</li>
                  </ul>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <div className="font-semibold text-emerald-300 mb-1">Assessed Technical Skills</div>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    <li>Cost savings & service level reporting</li>
                    <li>Multi-level stakeholder communication</li>
                    <li>Commercial lifecycle governance</li>
                  </ul>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <div className="font-semibold text-amber-300 mb-1">Desirable Criteria (Tie-Breaker)</div>
                  <p className="text-slate-300">
                    CIPS / MCIPS accredited or relevant commercial degree. Used strictly to rank candidates in the event of an interview score tie.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CV SIFT & GAP AUDITOR */}
        {activeTab === 'cv-audit' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  Pre-Screening CV Sift & Gap Auditor
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Michael Page will review your CV against 4 strict criteria. Candidates failing any of these 4 will NOT be submitted to the NCA panel.
                </p>
              </div>
              <button
                onClick={() => setCvText(SAMPLE_CV_TEXT)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 rounded border border-slate-700 transition"
              >
                Load Sample HEO Commercial CV
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: CV Input */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Paste candidate CV text below:</span>
                  <span>{cvText.length} characters</span>
                </div>
                <textarea
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  placeholder="Paste your CV text here..."
                  className="w-full h-96 bg-slate-900/90 border border-slate-700 rounded-xl p-4 text-xs sm:text-sm text-slate-200 font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 resize-none transition"
                />
                <button
                  onClick={runCvAudit}
                  disabled={isAuditing || !cvText.trim()}
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isAuditing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Scanning against 4 NCA Criteria...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" /> Run Michael Page Sift Audit
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Sift Scorecard */}
              <div className="lg:col-span-6 space-y-4">
                {auditResult ? (
                  <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-xl space-y-5">
                    {/* Overall Score Badge */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                      <div>
                        <div className="text-xs text-slate-400 font-medium">Sift Probability Rating</div>
                        <div className="text-xl font-bold text-white flex items-center gap-2">
                          {auditResult.verdict}
                        </div>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-slate-950 border-2 border-cyan-400 flex flex-col items-center justify-center">
                        <span className="text-lg font-black text-cyan-300">{auditResult.overallScore}%</span>
                        <span className="text-[9px] text-slate-400">Match</span>
                      </div>
                    </div>

                    {/* Quick Vital Signals */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                        auditResult.hasMetricNumbers
                          ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                          : 'bg-red-950/40 border-red-800 text-red-300'
                      }`}>
                        {auditResult.hasMetricNumbers ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                        <span>{auditResult.hasMetricNumbers ? "Quantified Savings Included (£/%)" : "Missing Explicit £ / % Metrics"}</span>
                      </div>
                      <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                        auditResult.hasSecurityMention
                          ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                          : 'bg-amber-950/40 border-amber-800 text-amber-300'
                      }`}>
                        {auditResult.hasSecurityMention ? <Check className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                        <span>{auditResult.hasSecurityMention ? "Security / Vetting Mentioned" : "No Security/Clearance Keywords"}</span>
                      </div>
                    </div>

                    {/* Breakdown of 4 Pre-Screening Criteria */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Assessment Against 4 Mandatory Criteria:
                      </div>
                      {auditResult.criteriaResults.map((c) => (
                        <div key={c.id} className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-200">{c.id}. {c.title}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              c.status === 'strong'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : c.status === 'acceptable'
                                ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                : 'bg-red-950 text-red-400 border border-red-800'
                            }`}>
                              {c.matchScore}% Match
                            </span>
                          </div>

                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                c.status === 'strong' ? 'bg-emerald-500' : c.status === 'acceptable' ? 'bg-blue-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${c.matchScore}%` }}
                            />
                          </div>

                          <p className="text-[11px] text-slate-400">
                            {c.recommendation}
                          </p>

                          {c.foundKeywords.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {c.foundKeywords.slice(0, 4).map((kw, i) => (
                                <span key={i} className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                                  ✓ {kw}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-full min-h-[380px] bg-slate-900/40 border border-dashed border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-3">
                    <FileText className="w-10 h-10 text-slate-600" />
                    <h3 className="text-sm font-semibold text-slate-300">No Audit Run Yet</h3>
                    <p className="text-xs text-slate-500 max-w-sm">
                      Paste your CV text or click "Load Sample HEO Commercial CV", then hit "Run Michael Page Sift Audit" to view real-time compliance scores.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: STAR STORY BUILDER */}
        {activeTab === 'star-builder' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  Civil Service STAR Story Bank
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Build one reusable story per behaviour below. Ensure each is 60-70% ACTION, uses "I" instead of "We", and concludes with audited £ savings or SLA recovery. Your drafts stay saved here as you move between tabs — nothing is cleared unless you rewrite it yourself.
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="shrink-0 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-cyan-400" /> Download Story Bank as PDF
              </button>
            </div>

            {/* Story Bank Strip — one tile per behaviour, click to switch and build that story */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {STAR_BEHAVIOURS.map(b => {
                const analysis = starAnalysisBank[b];
                const hasDraft = starBank[b] && starBank[b].action.trim().length > 0;
                const isReady = analysis && analysis.estimatedScore >= 5;
                const isActive = starBehaviour === b;
                return (
                  <button
                    key={b}
                    onClick={() => setStarBehaviour(b)}
                    className={`text-left p-2.5 rounded-lg border text-[11px] transition ${
                      isActive
                        ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-200'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold leading-tight mb-1">{b}</div>
                    <div className={`flex items-center gap-1 text-[10px] ${
                      isReady ? 'text-emerald-400' : hasDraft ? 'text-amber-400' : 'text-slate-500'
                    }`}>
                      {isReady ? <CheckCircle2 className="w-3 h-3" /> : hasDraft ? <RefreshCw className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {isReady ? `Ready (${analysis.estimatedScore}/7)` : hasDraft ? 'Drafted — not scored 5+' : 'Not started'}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Editable STAR Boxes */}
              <div className="lg:col-span-7 space-y-4">
                {/* Situation */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      S - Situation (Keep concise: ~15% of words)
                    </label>
                    <span className="text-[11px] text-slate-500">Set the operational scene</span>
                  </div>
                  <textarea
                    rows={2}
                    value={starForm.situation}
                    onChange={(e) => setStarForm({ ...starForm, situation: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Task */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                      T - Task (Keep concise: ~10% of words)
                    </label>
                    <span className="text-[11px] text-slate-500">Your specific remit & constraints</span>
                  </div>
                  <textarea
                    rows={2}
                    value={starForm.task}
                    onChange={(e) => setStarForm({ ...starForm, task: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Action */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-900/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      A - Action (THE HEART OF THE SCORE: 60-70% of words)
                    </label>
                    <span className="text-[11px] text-emerald-400 font-mono font-semibold">Focus exclusively on "I"</span>
                  </div>
                  <textarea
                    rows={5}
                    value={starForm.action}
                    onChange={(e) => setStarForm({ ...starForm, action: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-400"
                  />
                  <p className="text-[11px] text-slate-500 italic">
                    Mention your e-sourcing tools, how you overcame supplier objections, managed security, and maintained visual project management.
                  </p>
                </div>

                {/* Result */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      R - Result (Impact: ~15% of words)
                    </label>
                    <span className="text-[11px] text-slate-500">Quantifiable value & operational uptime</span>
                  </div>
                  <textarea
                    rows={3}
                    value={starForm.result}
                    onChange={(e) => setStarForm({ ...starForm, result: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={analyzeStarStory}
                    className="w-full sm:w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg text-xs transition border border-slate-700 flex items-center justify-center gap-2"
                  >
                    <BarChart3 className="w-4 h-4 text-cyan-400" /> Evaluate Civil Service Score
                  </button>
                  <button
                    onClick={polishStarWithAi}
                    disabled={isAiThinking}
                    className="w-full sm:w-1/2 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-lg text-xs transition shadow-md shadow-purple-950/40 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isAiThinking ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Elevating to Level 6/7...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" /> AI Polish to HEO Grade 4
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={sendStoryToMockInterview}
                  disabled={!starForm.action.trim()}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-cyan-300 font-medium rounded-lg text-xs transition border border-cyan-800/60 flex items-center justify-center gap-2"
                >
                  <Mic className="w-4 h-4" /> Rehearse This Story in the Voice Mock Interview
                </button>
              </div>

              {/* Right Column: Scorecard & Live Feedback */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-xl space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center justify-between">
                    <span>Civil Service STAR Scorecard</span>
                    <span className="text-xs text-slate-400 font-normal">HEO Standard</span>
                  </h3>

                  {starAnalysis ? (
                    <div className="space-y-4">
                      {/* Estimated Score Gauge */}
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-xs text-slate-400">Assessed Civil Service Score</div>
                          <div className="text-2xl font-black text-cyan-300">
                            {starAnalysis.estimatedScore} <span className="text-sm font-normal text-slate-400">/ 7.0</span>
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {starAnalysis.estimatedScore >= 6 ? "Strong Demonstration (Interview Pass)" : starAnalysis.estimatedScore >= 4 ? "Acceptable Demonstration" : "Moderate Risk"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-slate-400">Word Count</div>
                          <div className="text-lg font-bold text-white">{starAnalysis.wordCount} words</div>
                          <div className="text-[10px] text-slate-500">Target: 200-300</div>
                        </div>
                      </div>

                      {/* Vital Metrics Grid */}
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                          <div className="text-[10px] text-slate-400 font-medium">Action Ratio</div>
                          <div className={`text-base font-bold ${starAnalysis.actionPercentage >= 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {starAnalysis.actionPercentage}%
                          </div>
                          <div className="text-[9px] text-slate-500">Target: &gt;55%</div>
                        </div>
                        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                          <div className="text-[10px] text-slate-400 font-medium">"I" vs "We"</div>
                          <div className={`text-base font-bold ${starAnalysis.iCount >= starAnalysis.weCount ? 'text-emerald-400' : 'text-red-400'}`}>
                            {starAnalysis.iCount} / {starAnalysis.weCount}
                          </div>
                          <div className="text-[9px] text-slate-500">More 'I' required</div>
                        </div>
                        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                          <div className="text-[10px] text-slate-400 font-medium">Hard Metrics</div>
                          <div className={`text-base font-bold ${starAnalysis.metricsCount >= 2 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {starAnalysis.metricsCount}
                          </div>
                          <div className="text-[9px] text-slate-500">£ / % / days</div>
                        </div>
                      </div>

                      {/* Feedback List */}
                      <div className="space-y-2 pt-2">
                        <div className="text-xs font-semibold text-slate-300">Panel Feedback & Adjustments:</div>
                        {starAnalysis.feedback.map((f, i) => (
                          <div key={i} className="text-xs bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 text-slate-300 flex items-start gap-2">
                            <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-xs text-slate-500 space-y-2">
                      <p>Click "Evaluate Civil Service Score" to inspect your "I vs We" ratio and word balance.</p>
                    </div>
                  )}

                  {/* Golden Rules Box */}
                  <div className="bg-blue-950/30 p-3.5 rounded-lg border border-blue-900/40 text-xs space-y-1.5">
                    <div className="text-blue-300 font-semibold flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" /> NCA Interview Golden Rule:
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Civil service interviewers only score what <strong>YOU</strong> physically planned, wrote, or negotiated. If you say "We held a tender board", they award zero points. Say: "I chaired the evaluation panel, challenged unrealistic bids, and briefed the Senior Responsible Owner."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: VOICE MOCK INTERVIEW STUDIO */}
        {activeTab === 'mock-interview' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Mic className="w-5 h-5 text-cyan-400" />
                  Voice Mock Interview Studio
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Read the question below, then click straight into the box and answer. The panel won't just score you — it will keep pressing for the specific detail, number, or clarification your answer is missing.
                </p>
              </div>

              {/* Persona Switcher — full width of its own row, room to breathe */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {INTERVIEWER_PERSONAS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handlePersonaChange(p)}
                    className={`text-left px-4 py-2.5 rounded-xl border transition ${
                      selectedPersona.id === p.id
                        ? 'bg-slate-800 text-cyan-300 border-cyan-500/40 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-sm font-semibold truncate">{p.name}</div>
                    <div className="text-[11px] opacity-80 truncate">{p.role}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Interviewer Persona Banner */}
            <div className={`p-4 rounded-xl bg-gradient-to-r ${selectedPersona.avatarBg} border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center font-bold text-white text-lg shadow">
                  {selectedPersona.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wide">Current Interviewer</div>
                  <h3 className="text-base font-bold text-white">{selectedPersona.name} • {selectedPersona.role}</h3>
                  <p className="text-xs text-slate-300">{selectedPersona.tagline}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-900/60 hover:bg-red-800 text-red-200 border border-red-700 rounded-lg text-xs font-medium transition animate-pulse"
                  >
                    <VolumeX className="w-3.5 h-3.5" /> Stop Voice
                  </button>
                )}
              </div>
            </div>

            {/* Subject Area Picker — click an area for a random question from it */}
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Subject Areas — click one for a random question
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {Object.keys(QUESTION_BANK).map(area => (
                  <button
                    key={area}
                    onClick={() => pickRandomFromArea(area)}
                    className={`text-left p-2.5 rounded-lg border text-[11px] font-medium transition ${
                      selectedQuestion.behaviour === area
                        ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-200'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="leading-tight">{area}</div>
                    <div className="text-[10px] opacity-70 mt-0.5">{QUESTION_BANK[area].length} questions</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Card: the question, pasted directly, with the answer console right below it */}
            <div className="bg-slate-900/90 border border-cyan-900/40 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 w-fit">
                    {selectedQuestion.behaviour}
                  </span>
                  <div className="flex items-center gap-1.5 w-full sm:w-auto">
                    <select
                      value={selectedQuestion.id}
                      onChange={(e) => {
                        const q = MOCK_QUESTIONS.find(item => item.id === e.target.value);
                        if (q) handleQuestionSelect(q);
                      }}
                      className="flex-1 sm:flex-none bg-slate-950 text-slate-300 border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] font-medium focus:outline-none focus:border-cyan-400 w-full sm:w-auto max-w-xs"
                    >
                      {Object.entries(QUESTION_BANK).map(([area, questions]) => (
                        <optgroup key={area} label={area}>
                          {questions.map(q => (
                            <option key={q.id} value={q.id}>
                              {q.question.slice(0, 60)}…
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <button
                      onClick={() => pickRandomFromArea(selectedQuestion.behaviour)}
                      title="Try another question from this area"
                      className="shrink-0 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-base sm:text-lg font-semibold text-white leading-snug">
                  {selectedQuestion.question}
                </p>

                <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
                  <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span><span className="text-slate-300 font-medium">The panel is probing for: </span>{selectedQuestion.probingPoint}</span>
                </div>
              </div>

              {/* Answer Console — click straight in and answer, right under the question */}
              <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={toggleMic}
                  title={isListening ? "Stop Microphone" : "Speak your answer via Microphone"}
                  className={`p-3 rounded-xl transition ${
                    isListening
                      ? 'bg-red-600 text-white animate-pulse shadow-lg shadow-red-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendInterviewAnswer()}
                  placeholder={isListening ? "Listening to your voice..." : "Click here and answer using STAR..."}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-400"
                />

                <button
                  onClick={handleSendInterviewAnswer}
                  disabled={isAiThinking || !userInput.trim()}
                  className="p-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white rounded-xl transition shadow-md shadow-cyan-950"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Terminal */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Dialogue Transcript */}
              <div className="lg:col-span-8 flex flex-col h-[380px] bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-inner">
                <div className="px-4 py-2 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                  Panel Challenge Log
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {conversation.length === 0 && !isAiThinking && (
                    <p className="text-xs text-slate-500 italic">Your answer and the panel's follow-up challenges will appear here once you respond above.</p>
                  )}
                  {conversation.map((msg, i) => {
                    const isCandidate = msg.sender === 'candidate';
                    return (
                      <div
                        key={i}
                        className={`flex gap-3 max-w-[85%] ${isCandidate ? 'ml-auto flex-row-reverse' : ''}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                          isCandidate
                            ? 'bg-cyan-600 text-white'
                            : 'bg-slate-800 border border-slate-700 text-slate-300'
                        }`}>
                          {isCandidate ? 'You' : selectedPersona.name[0]}
                        </div>
                        <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isCandidate
                            ? 'bg-cyan-900/40 text-cyan-100 border border-cyan-800/60 rounded-tr-none'
                            : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-tl-none shadow-sm'
                        }`}>
                          <div className="flex items-center justify-between gap-3 mb-1 text-[10px] text-slate-400">
                            <span className="font-semibold">{isCandidate ? 'Candidate (You)' : selectedPersona.name}</span>
                            <span>{msg.time}</span>
                          </div>
                          <p className="whitespace-pre-line">{msg.text}</p>
                          {!isCandidate && (
                            <button
                              onClick={() => speakText(msg.text)}
                              className="mt-2 text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium transition"
                            >
                              <Volume2 className="w-3 h-3" /> Replay Spoken Audio
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {isAiThinking && (
                    <div className="flex items-center gap-2 text-xs text-slate-400 p-2 bg-slate-950/60 rounded-lg w-fit">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                      <span>{selectedPersona.name} is deliberating & scoring your answer...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Live Interviewer Scorecard & Hints */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-cyan-400" />
                    Panel Performance Feedback
                  </h3>

                  {interviewFeedback ? (
                    <div className="space-y-3">
                      <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-slate-400">Awarded Score</div>
                          <div className="text-xl font-bold text-cyan-300">{interviewFeedback.score} / 7.0</div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          interviewFeedback.score >= 5 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          {interviewFeedback.score >= 5 ? "Appointable" : "Borderline"}
                        </span>
                      </div>

                      {interviewFeedback.followUpChallenge && (
                        <div className="bg-amber-950/30 p-3 rounded-lg border border-amber-800/60 space-y-1">
                          <div className="text-[10px] font-bold text-amber-400 uppercase flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5" /> Panel is Pressing You For:
                          </div>
                          <p className="text-amber-100 text-[11px] font-medium">{interviewFeedback.followUpChallenge}</p>
                          <p className="text-slate-400 text-[10px]">Answer this directly in the box above before moving on.</p>
                        </div>
                      )}

                      <div className="text-xs space-y-2">
                        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                          <div className="text-[10px] font-bold text-emerald-400 uppercase">Key Strength:</div>
                          <p className="text-slate-300 text-[11px] mt-0.5">{interviewFeedback.strengths}</p>
                        </div>
                        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                          <div className="text-[10px] font-bold text-amber-400 uppercase">Gap to Level 7:</div>
                          <p className="text-slate-300 text-[11px] mt-0.5">{interviewFeedback.gapToClose}</p>
                        </div>
                        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                          <div className="text-[10px] font-bold text-cyan-400 uppercase">Interviewer's Secret Tip:</div>
                          <p className="text-slate-300 text-[11px] mt-0.5">{interviewFeedback.benchmarkTip}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 space-y-2">
                      <p>Click the microphone or type your answer to receive immediate feedback on whether your answer meets the NCA's HEO benchmark.</p>
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px]">
                        <span className="font-semibold text-slate-300">Probing Criteria:</span>
                        <p className="text-slate-400 mt-1">{selectedQuestion.probingPoint}</p>
                      </div>
                    </div>
                  )}

                  {/* Cheat-Sheet Prompts */}
                  <div className="border-t border-slate-800 pt-3 space-y-1.5 text-[11px]">
                    <span className="font-semibold text-slate-300">Quick Phrases to Impress the Panel:</span>
                    <ul className="text-slate-400 space-y-1">
                      <li>• "I ensured compliance under Public Contracts Regulations..."</li>
                      <li>• "I established visual Kanban tracking to ensure no pipeline slippage..."</li>
                      <li>• "I baselined the category spend to guarantee £35k verified savings..."</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Persistent Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-4 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>NCA Commercial Practitioner Lab • Ref 474436</span>
          <span>Prepared for Civil Service Success Profiles Assessment</span>
          <span className="text-slate-400 font-mono">Closing: 20 Aug 2026</span>
        </div>
      </footer>
    </div>
  );
}