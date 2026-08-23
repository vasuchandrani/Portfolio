import { useEffect, useState } from "react";
import { personalInfo, socialLinks, achievements, skills, stats, shortcuts, tourSteps } from "./portfolioData";
import { files } from "./fileData";
import { FaGithub } from "react-icons/fa";
import { HiOutlineRocketLaunch } from "react-icons/hi2";

const TOUR_KEY = "vatsal-portfolio-tour-seen-v1";
const MOBILE_NOTICE_KEY = "vatsal-portfolio-mobile-notice-seen-v1";

function MobileExperienceDialog({ onContinue }) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[3px] font-sans p-4 animate-fade-in">
        <div className="w-full max-w-sm rounded-2xl border border-ide-accent/40 bg-ide-surface shadow-2xl shadow-black/70 overflow-hidden text-center p-6 relative">
          <div className="size-14 mx-auto mb-4 rounded-2xl bg-ide-accent/15 border border-ide-accent/30 flex items-center justify-center text-[28px]">
            💻
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-ide-accent/15 border border-ide-accent/30 text-ide-accent text-[11px] font-bold uppercase tracking-wider mb-2">
            Pro Tip
          </div>

          <h3 className="text-[19px] font-bold text-ide-text mb-2.5 leading-snug">
            Best Experienced on Desktop
          </h3>

          <p className="text-[13px] text-ide-text-dim font-medium leading-relaxed mb-6">
            For the most awesome and seamless developer experience — with interactive code editing, terminal commands, split views, and keyboard shortcuts — this portfolio is crafted for laptops and desktop screens.
            <br />
            <span className="text-ide-text block mt-2 font-semibold">
              You can still explore everything smoothly right here on mobile!
            </span>
          </p>

          <button
            onClick={onContinue}
            className="w-full py-2.5 px-4 rounded-xl bg-ide-accent hover:bg-ide-accent/90 text-white text-[13px] font-bold transition-all shadow-lg shadow-ide-accent/25 active:scale-[0.98]"
          >
            Continue on Mobile Phone →
          </button>
        </div>
      </div>
    );
}

function OnboardingTour({ onClose }) {
    const [step, setStep] = useState(0);
    const isLast = step === tourSteps.length - 1;
    const s = tourSteps[step];
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] font-sans p-3">
      <div className="w-full max-w-md rounded-xl border border-ide-border bg-ide-surface shadow-2xl shadow-black/40 overflow-hidden">
        <div className="px-5 pt-5 pb-2 flex items-center gap-2">
          {tourSteps.map((_, i) => (<span key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-ide-accent" : "bg-ide-border"}`}/>))}
        </div>
        <div className="px-5 sm:px-6 pt-3 pb-5 sm:pb-6">
          <div className="text-[11px] uppercase tracking-wider text-ide-text-dim font-bold mb-2">
            Step {step + 1} of {tourSteps.length}
          </div>
          <h3 className="text-[17px] sm:text-[18px] font-bold text-ide-text mb-3">{s.title}</h3>
          {s.title === "⌨️ Shortcuts" ? (
            <div className="space-y-1.5 text-[12px] sm:text-[13px] text-ide-text font-medium">
              {shortcuts.map((sc) => (
                <div key={sc.keys} className="flex items-center gap-2 flex-wrap">
                  <kbd className="font-mono bg-ide-bg px-1.5 py-0.5 rounded border border-ide-border text-ide-accent text-[11px] font-bold">{sc.keys}</kbd>
                  <span className="text-ide-text-dim">→</span>
                  <span>{sc.label}</span>
                </div>
              ))}
              <div className="pt-1 text-ide-accent font-semibold">Have a great exploration! :)</div>
            </div>
          ) : (
            <p className="text-[13px] text-ide-text font-medium leading-relaxed">
              {s.body}
            </p>
          )}
        </div>
        <div className="px-5 py-3.5 border-t border-ide-border bg-ide-bg/40 flex items-center justify-between gap-3">
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
    const [showMobileNotice, setShowMobileNotice] = useState(false);
    const [showTour, setShowTour] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined")
            return;
        try {
            const isMobile = window.innerWidth < 768;
            if (isMobile && !localStorage.getItem(MOBILE_NOTICE_KEY)) {
                setShowMobileNotice(true);
            } else if (!localStorage.getItem(TOUR_KEY)) {
                setShowTour(true);
            }
        }
        catch {
            setShowTour(true);
        }
    }, []);

    const handleContinueMobile = () => {
        setShowMobileNotice(false);
        try {
            localStorage.setItem(MOBILE_NOTICE_KEY, "1");
        } catch {}
        try {
            if (!localStorage.getItem(TOUR_KEY)) {
                setShowTour(true);
            }
        } catch {
            setShowTour(true);
        }
    };

    const closeTour = () => {
        setShowTour(false);
        try {
            localStorage.setItem(TOUR_KEY, "1");
        }
        catch {
        }
    };
    
    const quickLinks = files
        .filter((f) => f.id !== "resume")
        .map((f) => ({
            label: f.name,
            id: f.id,
            icon: f.icon,
            color: f.languageColor,
        }));

    return (<div className="flex-1 overflow-auto font-sans">
      {showMobileNotice && <MobileExperienceDialog onContinue={handleContinueMobile} />}
      {showTour && <OnboardingTour onClose={closeTour}/>}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="size-2 rounded-full bg-term-green animate-pulse"/>
            <span className="text-[11px] uppercase tracking-wider text-term-green font-semibold">
              Open to opportunities
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ide-text mb-2 tracking-tight">
            Hi, I'm <span className="text-ide-accent">{personalInfo.name.split(" ")[0]}</span>.
          </h1>
          <p className="text-ide-text text-[15px] sm:text-[16px] font-semibold mb-1">{personalInfo.role}</p>
          {personalInfo.founder && (
            <div className="mb-1.5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-ide-accent/10 border border-ide-accent/30 text-ide-accent text-[12px] font-semibold font-sans">
                {personalInfo.founder}
              </span>
            </div>
          )}
          <p className="text-ide-text-dim text-[12px] sm:text-[13px] font-semibold leading-relaxed">
            {personalInfo.degree} · {personalInfo.university} · {personalInfo.location}
          </p>

          <div className="flex flex-wrap gap-2 mt-4 sm:mt-5">
            <a href={`mailto:${personalInfo.email}`} className="px-3 py-1.5 rounded-md bg-ide-accent text-white text-[12px] font-medium hover:opacity-90 transition-opacity">
              ✉ Email Me
            </a>
            <button onClick={() => onOpenFile("resume")} className="px-3 py-1.5 rounded-md border border-ide-border text-ide-text text-[12px] font-medium hover:bg-ide-hover transition-colors">
              📄 View Resume
            </button>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md border border-ide-border text-ide-text text-[12px] font-medium hover:bg-ide-hover transition-colors flex items-center gap-1"
            >
              <FaGithub />
              GitHub
            </a>

            <a
              href={socialLinks.codolio}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md border border-ide-border text-ide-text text-[12px] font-medium hover:bg-ide-hover transition-colors flex items-center gap-1"
            >
              <HiOutlineRocketLaunch />
              Codolio
            </a>
            <button onClick={() => setShowTour(true)} className="px-3 py-1.5 rounded-md border border-ide-accent/50 text-ide-accent text-[12px] font-bold hover:bg-ide-accent/10 transition-colors">
              ▶ Replay tour
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-8 sm:mb-10">
          {stats.map((s) => (<div key={s.label} className="rounded-lg border border-ide-border bg-ide-surface px-3.5 py-2.5 sm:px-4 sm:py-3">
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-ide-text-dim font-bold">
                {s.label}
              </div>
              <div className="text-lg sm:text-xl font-bold text-ide-text mt-0.5 font-mono">
                {s.value}
              </div>
            </div>))}
        </div>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 mb-8 sm:mb-10">
          <div>
            <h2 className="text-[11px] font-bold text-ide-text-dim uppercase tracking-wider mb-3">
              Start
            </h2>
            <div className="grid grid-cols-1 gap-1.5">
              {quickLinks.map((link) => (<button key={link.id} onClick={() => onOpenFile(link.id)} className="flex items-center gap-3 px-3 py-2 rounded border border-ide-border text-left hover:bg-ide-hover hover:border-ide-accent/40 transition-colors text-ide-text font-semibold hover:text-ide-text text-[12.5px] sm:text-[13px] group">
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
                  <span className="text-ide-text text-[12.5px] sm:text-[13px] font-bold">{a.platform}</span>
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
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
            ...skills.experties.languages,
            ...skills.backend.frameworks,
            ...skills.backend.databases,
        ].map((t) => (<span key={t} className="text-[10.5px] sm:text-[11px] px-2.5 py-1 rounded-full bg-ide-surface border border-ide-border text-ide-text font-mono font-bold">
                {t}
              </span>))}
          </div>
        </div>

        <div className="rounded-lg border border-ide-border bg-ide-surface px-4 sm:px-5 py-3.5 sm:py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[11px] font-bold text-ide-text-dim uppercase tracking-wider">
              Keyboard shortcuts
            </h2>
            <span className="text-[10px] font-bold text-ide-text-faint uppercase tracking-wider">
              power-user mode
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {shortcuts.map((s) => (<div key={s.keys} className="flex items-center justify-between gap-2 text-[12px]">
                <span className="text-ide-text font-semibold truncate">{s.label}</span>
                <kbd className="font-mono font-bold text-[10.5px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded border border-ide-border bg-ide-bg text-ide-accent shrink-0">
                  {s.keys}
                </kbd>
              </div>))}
          </div>
        </div>
      </div>
    </div>);
}
