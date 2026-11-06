// Edit your content here. Everything on the page is built from these lists.

window.PORTFOLIO = {
  education: [
    { name: 'Education', unit: 'degree', items: [
      { meta: 'Spring 2027', title: 'San José State University', sub: 'B.S. Computer Science' }
    ]},
    { name: 'Fellowships', unit: 'fellowship', items: [
      { meta: 'Mar 2026 – Present', title: 'Cornell Tech AI/ML Fellow', sub: 'Break Through Tech' }
    ]},
    { name: 'Certifications', unit: 'certification', items: [
      { meta: '2026', title: 'Machine Learning Foundations', sub: 'Cornell University' }
    ]}
  ],

  jobs: [
    { dates: 'Sept 2026 – Present', role: 'ML Engineer, AI Studio', org: 'KPMG · Break Through Tech AI Studio', line: 'Building a RAG-based LLM agent that turns arXiv research into business insights for KPMG consultants.' },
    { dates: 'Mar 2026 – Present', role: 'AI/ML Fellow', org: 'Cornell Tech · Break Through Tech', line: 'Selected from 4,300+ applicants for a year-long fellowship in applied ML.' },
    { dates: 'Sept 2026 – Present', role: 'Technical Project Lead', org: 'AI Valley · Responsible Computing Club, SJSU', line: "Scope and deliver client-facing technical solutions; leading front-end and UI/UX for AI Valley's website." },
    { dates: 'Aug 2026 – Present', role: 'Lab Instructor, CS 46B', org: 'San José State University', line: 'Teach weekly 3-hour data structures labs for 30 students, guiding live debugging.' },
    { dates: 'June – Aug 2026', role: 'Teaching Assistant, CS 122', org: 'San José State University', line: 'Evaluated weekly Advanced Python assignments and turned learning gaps into course improvements.' }
  ],

  // Each project shows as a metallic "swatch" card. place = where it happened.
  projects: [
    {
      "title": "Proxy",
      "place": "Y Combinator Hackathon",
      "code": "01 · Hackathon · Oct 2026",
      "desc": "A safety net for AI shopping agents. When an agent buys something, Proxy reads the confirmation email and Stripe charge, compares them to what the user actually asked for, and flags anything that doesn’t match. The user gets an iMessage alert via Inkbox to approve or cancel, and mismatched charges are reversed before the refund window closes.",
      "tech": ["TypeScript", "MCP", "Stripe API", "Inkbox", "Vitest"],
      "github": "https://github.com/karan6705/proxy",
      "photos": [
        { "src": "assets/projects/proxy-1.png", "caption": "Landing screen" },
        { "src": "assets/projects/proxy-2.png", "caption": "iMessage approval flow" },
        { "src": "assets/projects/proxy-3.png", "caption": "Screenshot 3 caption" }
      ]
    },
    {
      "title": "Research Intelligence Agent",
      "place": "KPMG · AI Studio",
      "code": "02 · ML · Sept 2026",
      "desc": "A RAG-based LLM agent that translates arXiv research into business insights. Papers are embedded with Sentence Transformers into ChromaDB and evaluated on Recall@k and MRR, with scope aligned biweekly with a KPMG AI Architect.",
      "tech": ["Python", "RAG", "Sentence Transformers", "ChromaDB"],
      "github": "https://github.com/Break-Through-Tech/KPMG-1G-ai-research-intelligence-agent-for-business-insight-translation"
    },
    {
      "title": "Verdict",
      "place": "HackHayward",
      "code": "03 · Hackathon · Mar 2026",
      "desc": "An AI platform that generates VC-style memos with market sizing in 60 seconds. I scoped the MVP and sequenced workstreams to ship in 24 hours, orchestrating 6 parallel LLM calls and an 8-dimension viability score.",
      "tech": ["Next.js 15", "TypeScript", "Perplexity API", "Vercel"],
      "github": "https://github.com/skhadder/Validate-IQ",
      "photos": [
        { "src": "assets/projects/verdict-1.png", "caption": "Verdict, built for builders. Venture-grade diligence in 60 seconds." },
        { "src": "assets/projects/verdict-2.png", "caption": "Every memo breaks down market size, competitors, risks and who'll pay, so founders can defend an idea in the room." },
        { "src": "assets/projects/verdict-3.png", "caption": "The workspace, where memos are created, saved and revisited." }
      ]
    },
    {
      "title": "Preoperative Assessment Tool",
      "place": "NorthBay Health",
      "code": "04 · Healthcare · Jan 2026",
      "desc": "Automates pre-op orders across 50+ protocols for a hospital with 800+ monthly procedures. Weekly stakeholder feedback shaped the logic, standardizing clinical workflows hospital-wide.",
      "tech": ["JavaScript", "HTML", "Tailwind CSS"],
      "github": "https://github.com/skhadder/pre-anesthesia-testing"
    },
    {
      "title": "Chore Assignment System",
      "place": "Resident Communities",
      "code": "05 · Product · Dec 2025",
      "desc": "Reduced scheduling overhead by 95% for 51 residents by owning end-to-end delivery, then scaled it to 200+ residents across multiple communities.",
      "tech": ["Next.js", "TypeScript", "Firebase", "Vercel"],
      "github": "https://github.com/skhadder/chores-app"
    }
  ],
  skills: [
    { name: 'Languages', unit: 'languages', items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C', 'C++', 'HTML', 'CSS'] },
    { name: 'Frameworks', unit: 'frameworks', items: ['React', 'Next.js', 'Node.js', 'FastAPI', 'Tailwind CSS', 'Pandas', 'NumPy'] },
    { name: 'Developer Tools', unit: 'tools', items: ['Git', 'GitHub', 'Linux', 'MySQL', 'Firebase', 'Supabase', 'MongoDB', 'Vercel', 'VS Code', 'Cursor', 'Claude Code', 'Wireshark'] },
    { name: 'PM & Process', unit: 'practices', items: ['Agile/Scrum', 'Kanban', 'JIRA', 'SDLC', 'Roadmap planning', 'Stakeholder communication', 'System design (UML)'] }
  ]
};
