import { useState } from "react";
import { extensions } from "./portfolioData";

export function ExtensionsPanel({ onOpenDetail, activeId }) {
    const [query, setQuery] = useState("");
    const filtered = extensions.filter((e) => {
        const q = query.toLowerCase();
        return (!q ||
            e.name.toLowerCase().includes(q) ||
            e.tagline.toLowerCase().includes(q) ||
            e.tags.some((t) => t.toLowerCase().includes(q)));
    });

    const sections = {
        project: {
            title: "PROJECTS",
            items: filtered.filter((e) => e.kind === "project"),
        },
        idea: {
            title: "FUTURE IDEAS",
            items: filtered.filter((e) => e.kind === "idea"),
        },
        freelance: {
            title: "FREELANCE PROJECTS",
            items: filtered.filter((e) => e.kind === "freelance"),
        },
        business: {
            title: "BUSINESS IDEAS",
            items: filtered.filter((e) => e.kind === "business"),
        },
    };

    return (<div className="h-full w-full bg-ide-surface border-r border-ide-border flex flex-col">
      <div className="px-4 py-3 text-[11px] tracking-wider text-ide-text-dim font-bold font-sans uppercase">
        Arsenal · My Toolkit
      </div>
      <div className="px-3 pb-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search toolkit" className="w-full bg-ide-bg border border-ide-border rounded px-2 py-1.5 text-[12px] text-ide-text font-semibold placeholder:text-ide-text-dim placeholder:font-bold outline-none focus:border-ide-accent font-sans"/>
      </div>

      <div className="flex-1 overflow-y-auto">
        {Object.values(sections).map((section) => (
          <Section
            key={section.title}
            title={`${section.title} — ${section.items.length}`}
          >
            {section.items.map((e) => (
              <ExtCard
                key={e.id}
                ext={e}
                active={activeId === e.id}
                onClick={() => onOpenDetail(e.id)}
              />
            ))}
          </Section>
        ))}
      </div>
    </div>);
}

function Section({ title, children }) {
    return (<div className="mb-2">
      <div className="px-4 py-1 text-[10px] tracking-wider text-ide-text-dim font-bold font-sans uppercase">
        {title}
      </div>
      <div>{children}</div>
    </div>);
}

function ExtCard({ ext, active, onClick, }) {

  const kindStyles = {
        project: {
            background: "linear-gradient(135deg, hsl(var(--ide-accent) / 0.25), hsl(var(--ide-accent) / 0.05))",
            color: "hsl(var(--ide-accent))",
        },

        idea: {
            background: "linear-gradient(135deg, rgba(245,158,11,0.25), rgba(245,158,11,0.05))",
            color: "#f59e0b",
        },

        business: {
            background: "linear-gradient(135deg, rgba(34,197,94,0.25), rgba(34,197,94,0.05))",
            color: "#22c55e",
        },

        freelance: {
            background: "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(168,85,247,0.05))",
            color: "#a855f7",
        },
    };

    const style = kindStyles[ext.kind] || kindStyles.project;

    return (
    <button onClick={onClick} className={`w-full text-left px-3 py-2.5 flex gap-3 border-b border-ide-border/50 transition-colors ${active ? "bg-ide-hover" : "hover:bg-ide-hover"}`}>
      <div 
        className="size-10 shrink-0 rounded-md flex items-center justify-center font-bold text-[14px] font-mono" 
        style={style}>
          
        {ext.name.charAt(0)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold text-ide-text font-sans truncate">{ext.name}</span>
          <span className="text-[10px] text-ide-text-dim font-mono font-bold">v{ext.version}</span>
        </div>
        <div className="text-[11px] text-ide-text-dim font-sans font-semibold truncate mt-0.5">{ext.tagline}</div>
        <div className="text-[10px] text-ide-text-dim font-sans font-semibold mt-0.5">
          {ext.publisher} · {ext.status}
        </div>
      </div>
    </button>);
}

export function ExtensionDetail({ id }) {
    const ext = extensions.find((e) => e.id === id);
    if (!ext) {
        return (<div className="p-8 text-ide-text-dim font-sans">Extension not found.</div>);
    }
    const kindStyles = {
      project: {
        badge: "bg-ide-accent/15 text-ide-accent",
        iconBg:
          "linear-gradient(135deg, hsl(var(--ide-accent) / 0.3), hsl(var(--ide-accent) / 0.05))",
        iconColor: "hsl(var(--ide-accent))",
        label: "Project",
      },

      idea: {
        badge: "bg-amber-500/15 text-amber-500",
        iconBg:
          "linear-gradient(135deg, rgba(245,158,11,0.3), rgba(245,158,11,0.05))",
        iconColor: "#f59e0b",
        label: "Future Idea",
      },

      business: {
        badge: "bg-green-500/15 text-green-500",
        iconBg:
          "linear-gradient(135deg, rgba(34,197,94,0.3), rgba(34,197,94,0.05))",
        iconColor: "#22c55e",
        label: "Business Idea",
      },

      freelance: {
        badge: "bg-purple-500/15 text-purple-500",
        iconBg:
          "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(168,85,247,0.05))",
        iconColor: "#a855f7",
        label: "Freelance Project",
      },
    };

    const style = kindStyles[ext.kind] || kindStyles.project;
    return (<div className="h-full w-full overflow-auto bg-ide-bg text-ide-text font-sans">
      <div className="border-b border-ide-border bg-ide-surface px-8 py-6">
        <div className="flex items-start gap-5">
          <div className="size-20 shrink-0 rounded-xl flex items-center justify-center font-bold text-[36px] font-mono" 
            style={{
              background: style.iconBg,
              color: style.iconColor,
            }}>
            {ext.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-[22px] font-bold text-ide-text">{ext.name}</h1>
              <span className="text-[11px] px-2 py-0.5 rounded border border-ide-border text-ide-text-dim font-mono">
                v{ext.version}
              </span>
              <span
              className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-semibold ${style.badge}`}
            >
              {style.label}
            </span>
            </div>
            <p className="text-[13px] text-ide-text font-semibold mt-1">{ext.tagline}</p>
            <p className="text-[11px] text-ide-text-dim font-semibold mt-1">
              {ext.publisher} · {ext.status}
            </p>

            <div className="flex gap-2 mt-4 flex-wrap">
              {ext.download && (<a href={ext.download} target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 rounded bg-ide-accent text-white text-[12px] font-semibold hover:opacity-90 transition-opacity">
                  ⬇ Download
                </a>)}
              {ext.repo && (<a href={ext.repo} target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 rounded border border-ide-border text-ide-text text-[12px] font-medium hover:bg-ide-hover transition-colors">
                  📂 Repository
                </a>)}
              {ext.demo && (<a href={ext.demo} target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 rounded border border-ide-border text-ide-text text-[12px] font-medium hover:bg-ide-hover transition-colors">
                  ▶ {ext.kind === "project" ? "View Deployment" : "View Prototype"}
                </a>)}
              {(ext.kind === "idea" || ext.kind === "business" || ext.kind === "freelance") &&
                !ext.repo &&
                !ext.demo && (
                  <span className="px-4 py-1.5 rounded border border-dashed border-amber-500/60 text-amber-400 text-[12px] font-bold">
                    Coming Soon
                  </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 max-w-4xl">
        <Section2 title="Details">
          <p className="text-[13px] text-ide-text leading-relaxed font-medium">{ext.description}</p>
        </Section2>

        <Section2 title="Features">
          <ul className="space-y-2">
            {ext.features.map((f, i) => (<li key={i} className="flex gap-2 text-[13px] text-ide-text leading-relaxed font-medium">
                <span className="text-ide-accent shrink-0">✓</span>
                <span>{f}</span>
              </li>))}
          </ul>
        </Section2>

        <Section2 title="Categories & Tags">
          <div className="flex flex-wrap gap-2">
            {ext.tags.map((t) => (<span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-ide-surface border border-ide-border text-ide-text font-mono font-bold">
                {t}
              </span>))}
          </div>
        </Section2>

        <Section2 title="Resources">
          <div className="text-[12px] text-ide-text space-y-1 font-mono font-semibold">
            {ext.repo && <div>Repository · <a href={ext.repo} target="_blank" rel="noopener noreferrer" className="text-syn-variable hover:text-ide-accent underline underline-offset-2">{ext.repo}</a></div>}
            {!ext.repo && !ext.download && <div className="italic">Resources will appear here once the project starts.</div>}
          </div>
        </Section2>
      </div>
    </div>);
}

function Section2({ title, children }) {
    return (<section className="mb-6">
      <h2 className="text-[11px] font-bold uppercase tracking-wider text-ide-text-dim mb-2 border-b border-ide-border pb-1">
        {title}
      </h2>
      {children}
    </section>);
}
