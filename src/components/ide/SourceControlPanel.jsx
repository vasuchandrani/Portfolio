import { journey, personalInfo } from "./portfolioData";
const typeMeta = {
    milestone: {
        label: "milestone",
        dot: "bg-ide-accent",
        ring: "border-ide-accent",
        chip: "bg-ide-accent/15 text-ide-accent border-ide-accent/30",
    },
    project: {
        label: "project",
        dot: "bg-term-cyan",
        ring: "border-term-cyan",
        chip: "bg-term-cyan/15 text-term-cyan border-term-cyan/30",
    },
    achievement: {
        label: "achievement",
        dot: "bg-term-amber",
        ring: "border-term-amber",
        chip: "bg-term-amber/15 text-term-amber border-term-amber/30",
    },
    learning: {
        label: "learning",
        dot: "bg-term-green",
        ring: "border-term-green",
        chip: "bg-term-green/15 text-term-green border-term-green/30",
    },
    start: {
        label: "start",
        dot: "bg-ide-text-dim",
        ring: "border-ide-text-dim",
        chip: "bg-ide-text-dim/15 text-ide-text-dim border-ide-text-dim/30",
    },
};
export function SourceControlPanel() {
    return (<div className="h-full w-full overflow-auto bg-ide-bg text-ide-text font-mono">
      <div className="border-b border-ide-border bg-ide-surface px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-ide-accent">
            <circle cx="18" cy="18" r="3"/>
            <circle cx="6" cy="6" r="3"/>
            <path d="M6 21V9a9 9 0 0 0 9 9"/>
          </svg>
          <div>
            <h2 className="text-[14px] font-bold font-sans text-ide-text">
              Chronicles · My Journey — git log --author="{personalInfo.name}"
            </h2>
            <p className="text-[11px] text-ide-text-dim font-sans font-semibold mt-0.5">
              <span className="inline-flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-green-500"></span>
                main
              </span>
              <span className="mx-2 text-ide-text-faint">•</span>
              {journey.length} entries
              <span className="mx-2 text-ide-text-faint">•</span>
              All of the experiences, project-ideas, achievements, and learnings that have shaped my journey.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-5">
        {journey.map((j, i) => {
            const m = typeMeta[j.type] ?? typeMeta.start;
            return (<div key={j.hash} className="relative pl-9 pb-6 last:pb-2">
              {i < journey.length - 1 && (<div className="absolute left-[13px] top-7 bottom-0 w-px bg-ide-divider"/>)}
              <div className={`absolute left-0 top-1.5 size-[26px] rounded-full bg-ide-surface border-2 ${m.ring} flex items-center justify-center`}>
                <div className={`size-2.5 rounded-full ${m.dot}`}/>
              </div>

              <div className="bg-ide-surface border border-ide-border rounded-md p-4 hover:border-ide-accent/50 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                  <h3 className="text-[13px] font-bold text-ide-text font-sans leading-snug">
                    {j.title}
                  </h3>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] px-2 py-0.5 rounded border font-sans uppercase tracking-wider font-bold ${m.chip}`}>
                      {m.label}
                    </span>
                    <code className="text-[11px] px-2 py-0.5 rounded bg-ide-bg border border-ide-border text-ide-accent font-mono font-bold">
                      {j.hash}
                    </code>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-ide-text-dim font-sans font-semibold mb-3">
                  <div className="size-4 rounded-full bg-ide-accent/20 flex items-center justify-center text-[9px] font-bold text-ide-accent">
                    {personalInfo.name.charAt(0)}
                  </div>
                  <span className="font-bold">{personalInfo.name}</span>
                  <span className="text-ide-text-faint">•</span>
                  <span>{j.period}</span>
                </div>
                <ul className="space-y-1">
                  {j.details.map((d, idx) => (<li key={idx} className="text-[12px] text-ide-text font-sans font-medium leading-relaxed flex gap-2">
                      <span className="text-ide-text-faint">›</span>
                      <span>{d}</span>
                    </li>))}
                </ul>
              </div>
            </div>);
        })}
      </div>
    </div>);
}
