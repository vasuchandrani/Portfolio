import { useEffect, useState } from "react";
import { personalInfo, socialLinks, achievements, skills } from "./portfolioData";
const TOUR_KEY = "vatsal-portfolio-tour-seen-v1";
const tourSteps = [
    {
        title: "Hello friend, welcome to my portfolio :)",
        body: "This isn't a regular site — it's a working code editor. Files, terminal, timeline, projects panel… all real. Let me give you a small tour.",
    },
    {
        title: "📁 Workspace · Codebase",
        body: "First icon in the left sidebar is file explorer. Open any code file to explore me ;).",
    },
    {
        title: "🧩 Arsenal · My Toolkit",
        body: "Projects & ideas are weapons for an engineer, The second icon opens my weapons, all projects and future ideas as installable cards. Click any one for the full detail page.",
    },
    {
        title: "🌿 Chronicles · My Journey",
        body: "The Third icon opens my life's timeline — every learning, experience, achievement and joy, laid out as a visual log.",
    },
    {
        title: "💻 An interactive Terminal",
        body: "Here in the terminal, you can run commands and execute codes. Type help to see all commands.",
    },
    {
        title: "⌨️ Shortcuts",
        body: "{ Ctrl + ` }  -  Toggle terminal | { Ctrl+Shift+E } -  Open Workspace | { Ctrl+Shift+G } - Open Chronicles | { Ctrl+Shift+X } - Open Arsenal",
    },
];
function OnboardingTour({ onClose }) {
    const [step, setStep] = useState(0);
    const isLast = step === tourSteps.length - 1;
    const s = tourSteps[step];
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-[1.5px] font-sans">
      <div className="w-[92%] max-w-md rounded-xl border border-ide-border bg-ide-surface shadow-2xl shadow-black/40 overflow-hidden">
        <div className="px-5 pt-5 pb-2 flex items-center gap-2">
          {tourSteps.map((_, i) => (<span key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-ide-accent" : "bg-ide-border"}`}/>))}
        </div>
        <div className="px-6 pt-3 pb-6">
          <div className="text-[11px] uppercase tracking-wider text-ide-text-dim font-bold mb-2">
            Step {step + 1} of {tourSteps.length}
          </div>
          <h3 className="text-[18px] font-bold text-ide-text mb-3">{s.title}</h3>
          <p className="text-[13px] text-ide-text font-medium leading-relaxed">{s.body}</p>
        </div>
        <div className="px-5 py-4 border-t border-ide-border bg-ide-bg/40 flex items-center justify-between gap-3">
          <button onClick={onClose} className="text-[12px] font-semibold text-ide-text-dim hover:text-ide-text transition-colors">
            Skip tour
          </button>
          <div className="flex gap-2">
            {step > 0 && (<button onClick={() => setStep((n) => n - 1)} className="px-3 py-1.5 rounded-md border border-ide-border text-ide-text text-[12px] font-semibold hover:bg-ide-hover transition-colors">
                Back
              </button>)}
            <button onClick={() => (isLast ? onClose() : setStep((n) => n + 1))} className="px-4 py-1.5 rounded-md bg-ide-accent text-white text-[12px] font-bold hover:opacity-90 transition-opacity">
              {isLast ? "Got it" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>);
}
export function WelcomePage({ onOpenFile }) {
    const [showTour, setShowTour] = useState(false);
    useEffect(() => {
        if (typeof window === "undefined")
            return;
        try {
            if (!localStorage.getItem(TOUR_KEY))
                setShowTour(true);
        }
        catch {
            setShowTour(true);
        }
    }, []);
    const closeTour = () => {
        setShowTour(false);
        try {
            localStorage.setItem(TOUR_KEY, "1");
        }
        catch {
        }
    };
    const quickLinks = [
        { label: "About.cpp", id: "about", icon: "C++", color: "#649ad2" },
        { label: "Education.c", id: "education", icon: "C", color: "#555555" },
        { label: "Projects.md", id: "projects", icon: "MD", color: "#858585" },
        { label: "Skills.js", id: "skills", icon: "JS", color: "#f7df1e" },
        { label: "Experience.java", id: "experience", icon: "JV", color: "#f89820" },
        { label: "Achievements.sql", id: "achievements", icon: "SQL", color: "#e38c00" },
    ];
    const stats = [
        { label: "CPI", value: personalInfo.cpi.toString() },
        { label: "Problems", value: "900+" },
        { label: "CF Rating", value: "1183" },
        { label: "LC Rating", value: "1630" },
    ];
    const shortcuts = [
        { keys: "Ctrl + `", label: "Toggle terminal" },
        { keys: "Ctrl + Shift + E", label: "Workspace · Codebase" },
        { keys: "Ctrl + Shift + X", label: "Arsenal · Toolkit" },
        { keys: "Ctrl + Shift + G", label: "Chronicles · Journey" },
    ];
    return (<div className="flex-1 overflow-auto font-sans">
      {showTour && <OnboardingTour onClose={closeTour}/>}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="size-2 rounded-full bg-term-green animate-pulse"/>
            <span className="text-[11px] uppercase tracking-wider text-term-green font-semibold">
              Open to opportunities
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-ide-text mb-2 tracking-tight">
            Hi, I'm <span className="text-ide-accent">{personalInfo.name.split(" ")[0]}</span>.
          </h1>
          <p className="text-ide-text text-[16px] font-semibold mb-1">{personalInfo.role}</p>
          <p className="text-ide-text-dim text-[13px] font-semibold">
            {personalInfo.degree} · {personalInfo.university} · {personalInfo.location}
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            <a href={`mailto:${personalInfo.email}`} className="px-3 py-1.5 rounded-md bg-ide-accent text-white text-[12px] font-medium hover:opacity-90 transition-opacity">
              ✉ Email Me
            </a>
            <button onClick={() => onOpenFile("resume")} className="px-3 py-1.5 rounded-md border border-ide-border text-ide-text text-[12px] font-medium hover:bg-ide-hover transition-colors">
              📄 View Resume
            </button>
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-md border border-ide-border text-ide-text text-[12px] font-medium hover:bg-ide-hover transition-colors">
              ⌥ GitHub
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-md border border-ide-border text-ide-text text-[12px] font-medium hover:bg-ide-hover transition-colors">
              in LinkedIn
            </a>
            <button onClick={() => setShowTour(true)} className="px-3 py-1.5 rounded-md border border-ide-accent/50 text-ide-accent text-[12px] font-bold hover:bg-ide-accent/10 transition-colors">
              ▶ Replay tour
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {stats.map((s) => (<div key={s.label} className="rounded-lg border border-ide-border bg-ide-surface px-4 py-3">
              <div className="text-[11px] uppercase tracking-wider text-ide-text-dim font-bold">
                {s.label}
              </div>
              <div className="text-xl font-bold text-ide-text mt-0.5 font-mono">
                {s.value}
              </div>
            </div>))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div>
            <h2 className="text-[11px] font-bold text-ide-text-dim uppercase tracking-wider mb-3">
              Start
            </h2>
            <div className="grid grid-cols-1 gap-1.5">
              {quickLinks.map((link) => (<button key={link.id} onClick={() => onOpenFile(link.id)} className="flex items-center gap-3 px-3 py-2 rounded border border-ide-border text-left hover:bg-ide-hover hover:border-ide-accent/40 transition-colors text-ide-text font-semibold hover:text-ide-text text-[13px] group">
                  <span className="text-[10px] font-bold font-mono shrink-0 w-8 text-center py-1 rounded bg-ide-bg" style={{ color: link.color }}>
                    {link.icon}
                  </span>
                  <span className="flex-1">{link.label}</span>
                  <span className="text-ide-text-faint group-hover:text-ide-accent transition-colors">→</span>
                </button>))}
            </div>
          </div>

          <div>
            <h2 className="text-[11px] font-bold text-ide-text-dim uppercase tracking-wider mb-3">
              Competitive Programming
            </h2>
            <div className="space-y-1.5">
              {achievements.map((a) => (<a key={a.platform} href={a.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-3 py-2 rounded border border-ide-border hover:bg-ide-hover hover:border-ide-accent/40 transition-colors group">
                  <span className="text-ide-text text-[13px] font-bold">{a.platform}</span>
                  <span className="text-ide-text-dim text-[11px] font-semibold group-hover:text-ide-text transition-colors">
                    {a.detail}
                  </span>
                </a>))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-[11px] font-bold text-ide-text-dim uppercase tracking-wider mb-3">
            Tech I work with
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
            ...skills.experties.languages,
            ...skills.backend.frameworks,
            ...skills.backend.databases,
        ].map((t) => (<span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-ide-surface border border-ide-border text-ide-text font-mono font-bold">
                {t}
              </span>))}
          </div>
        </div>

        <div className="rounded-lg border border-ide-border bg-ide-surface px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[11px] font-bold text-ide-text-dim uppercase tracking-wider">
              Keyboard shortcuts
            </h2>
            <span className="text-[10px] font-bold text-ide-text-faint uppercase tracking-wider">
              power-user mode
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {shortcuts.map((s) => (<div key={s.keys} className="flex items-center justify-between gap-3 text-[12px]">
                <span className="text-ide-text font-semibold">{s.label}</span>
                <kbd className="font-mono font-bold text-[11px] px-2 py-0.5 rounded border border-ide-border bg-ide-bg text-ide-accent">
                  {s.keys}
                </kbd>
              </div>))}
          </div>
        </div>
      </div>
    </div>);
}
