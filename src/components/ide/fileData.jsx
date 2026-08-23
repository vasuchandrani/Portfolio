import { useState } from "react";
import { personalInfo, education, skills, projects, experience, achievements, } from "./portfolioData";
export const files = [
    {
        id: "about",
        name: "About.cpp",
        language: "C++",
        languageLabel: "CPP",
        languageColor: "#649ad2",
        icon: "C++",
        content: null,
    },
    {
        id: "education",
        name: "Education.c",
        language: "C",
        languageLabel: "C",
        languageColor: "#555555",
        icon: "C",
        content: null,
    },
    {
        id: "projects",
        name: "Projects.md",
        language: "Markdown",
        languageLabel: "MD",
        languageColor: "#858585",
        icon: "MD",
        content: null,
    },
    {
        id: "skills",
        name: "Skills.js",
        language: "JavaScript",
        languageLabel: "JS",
        languageColor: "#f7df1e",
        icon: "JS",
        content: null,
    },
    {
        id: "experience",
        name: "Experience.java",
        language: "Java",
        languageLabel: "JAVA",
        languageColor: "#f89820",
        icon: "JV",
        content: null,
    },
    {
        id: "achievements",
        name: "Achievements.sql",
        language: "SQL",
        languageLabel: "SQL",
        languageColor: "#e38c00",
        icon: "SQL",
        content: null,
    },
    {
        id: "resume",
        name: "Resume",
        language: "PDF",
        languageLabel: "PDF",
        languageColor: "#e74c3c",
        icon: "PDF",
        content: null,
    },
];
export function ResumeContent() {
    return (<div className="relative h-full w-full flex flex-col">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-ide-border bg-ide-surface/40 flex-wrap gap-2">
        <div className="text-[12px] text-ide-text-dim font-sans">
          📄 Resume — {personalInfo.name}
        </div>
        <div className="flex items-center gap-2">
          <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 text-[11px] rounded border border-ide-border bg-ide-surface hover:bg-ide-hover hover:text-ide-text text-ide-text-dim transition-colors font-sans">
            ↗ Open PDF
          </a>
          <a href="/Resume.pdf" download="Vatsal_Chandrani_Resume.pdf" className="px-3 py-1 text-[11px] rounded border border-ide-accent/40 bg-ide-accent/15 text-ide-accent hover:bg-ide-accent/25 transition-colors font-sans font-semibold">
            ⬇ Download
          </a>
        </div>
      </div>
      <div className="flex-1 w-full bg-white relative">
        <iframe src="/Resume.pdf#toolbar=0&navpanes=0" title="Resume" className="w-full h-full border-0"/>
      </div>
    </div>);
}
export function AboutContent() {
  let lineNum = 1;
    return (<div className="whitespace-pre font-mono text-[12px] sm:text-[13px] leading-[1.65] overflow-x-auto">
      <Line n={lineNum++}><Comment>#include &lt;bits/stdc++.h&gt;</Comment></Line>
      <Line n={lineNum++}><Kw>using namespace</Kw> <Tp>std</Tp>;</Line>
      <Line n={lineNum++}><br /></Line>
      <Line n={lineNum++}><Kw>class</Kw> <Tp>Profile</Tp> {"{"}</Line>
      <Line n={lineNum++}>{"public:"}</Line>
      <Line n={lineNum++}>{"  "}<Tp>string</Tp> <Vr>name</Vr> = <Str>"{personalInfo.name}"</Str>;</Line>
      <Line n={lineNum++}>{"  "}<Tp>string</Tp> <Vr>role</Vr> = <Str>"{personalInfo.role}"</Str>;</Line>
      {personalInfo.founder && (
        <Line n={lineNum++}>{"  "}<Tp>string</Tp> <Vr>founder</Vr> = <Str>"{personalInfo.founder}"</Str>;</Line>
      )}
      <Line n={lineNum++}>{"  "}<Tp>string</Tp> <Vr>degree</Vr> = <Str>"{personalInfo.degree}"</Str>;</Line>
      <Line n={lineNum++}>{"  "}<Tp>string</Tp> <Vr>university</Vr> = <Str>"{personalInfo.university}"</Str>;</Line>
      <Line n={lineNum++}><br /></Line>
      <Line n={lineNum++}>{"  "}<Tp>double</Tp> <Vr>cpi</Vr> = <Num>{personalInfo.cpi}</Num>;</Line>
      <Line n={lineNum++}>{"  "}<Tp>string</Tp> <Vr>location</Vr> = <Str>"{personalInfo.location}"</Str>;</Line>
      <Line n={lineNum++}>{"  "}<Tp>string</Tp> <Vr>focus</Vr> = <Str>"{personalInfo.focus}"</Str>;</Line>
      <Line n={lineNum++}><br /></Line>
      <Line n={lineNum++}>{"  "}<Tp>vector</Tp>&lt;<Tp>string</Tp>&gt; <Fn>interests</Fn>() {"{"}</Line>
      <Line n={lineNum++}>{"    "}<Kw>return</Kw> {"{"}{(personalInfo.interests || []).map((interest, i) => (
        <span key={i}><Str>"{interest}"</Str>{i < personalInfo.interests.length - 1 ? ", " : ""}</span>
      ))}{"}"};</Line>
      <Line n={lineNum++}>{"  }"}</Line>
      <Line n={lineNum++}>{"};"}</Line>
      <Line n={lineNum++}><br /></Line>
      <Line n={lineNum++}><Tp>int</Tp> <Fn>main</Fn>() {"{"}</Line>
      <Line n={lineNum++}>{"  "}<Tp>Profile</Tp> <Vr>vatsal</Vr>;</Line>
      <Line n={lineNum++}>{"  "}<Tp>cout</Tp> &lt;&lt; <Str>"{personalInfo.focus}"</Str> &lt;&lt; <Str>"\\n"</Str>;</Line>
      <Line n={lineNum++}>{"  "}<Kw>return</Kw> <Num>0</Num>;</Line>
      <Line n={lineNum++}>{"}"}</Line>
    </div>);
}
export function EducationContent() {
  let lineNum = 1;
  let lineCounter = 38;
    return (<div className="whitespace-pre font-mono text-[12px] sm:text-[13px] leading-[1.65] overflow-x-auto">
      <Line n={lineNum++}><Comment>#include &lt;stdio.h&gt;</Comment></Line>
      <Line n={lineNum++}><Comment>#include &lt;string.h&gt;</Comment></Line>
      <Line n={lineNum++}><br /></Line>
      <Line n={lineNum++}><Kw>typedef struct</Kw> {"{"}</Line>
      <Line n={lineNum++}>{"  "}<Tp>char</Tp> <Vr>institution</Vr>[<Num>100</Num>];</Line>
      <Line n={lineNum++}>{"  "}<Tp>char</Tp> <Vr>degree</Vr>[<Num>100</Num>];</Line>
      <Line n={lineNum++}>{"  "}<Tp>char</Tp> <Vr>score</Vr>[<Num>50</Num>];</Line>
      <Line n={lineNum++}>{"  "}<Tp>char</Tp> <Vr>period</Vr>[<Num>30</Num>];</Line>
      <Line n={lineNum++}>{"  "}<Tp>char</Tp> <Vr>location</Vr>[<Num>50</Num>];</Line>
      <Line n={lineNum++}>{"}"} <Tp>Education</Tp>;</Line>
      <Line n={lineNum++}><br /></Line>
      <Line n={lineNum++}><Tp>int</Tp> <Fn>main</Fn>() {"{"}</Line>
      <Line n={lineNum++}><br /></Line>
      {education.map((edu, i) => {
            const base = lineNum + i * 8;
            return (<span key={i}>
            <Line n={base}>{"  "}<Tp>Education</Tp> <Vr>edu{i + 1}</Vr> = {"{"}</Line>
            <Line n={base + 1}>{"    "}<Str>"{edu.institution}"</Str>,</Line>
            <Line n={base + 2}>{"    "}<Str>"{edu.degree}"</Str>,</Line>
            <Line n={base + 3}>{"    "}<Str>"{edu.score}"</Str>,</Line>
            <Line n={base + 4}>{"    "}<Str>"{edu.period}"</Str>,</Line>
            <Line n={base + 5}>{"    "}<Str>"{edu.location}"</Str></Line>
            <Line n={base + 6}>{"  };"}</Line>
            <Line n={base + 7}><br /></Line>
          </span>);
      })}
      <Line n={lineCounter++}>{"  "}<Kw>for</Kw> (<Tp>int</Tp> <Vr>i</Vr> = <Num>0</Num>; <Vr>i</Vr> &lt; <Num>{education.length}</Num>; <Vr>i</Vr>++) {"{"}</Line>
      <Line n={lineCounter++}>{"    "}<Fn>printf</Fn>(<Str>"%s — %s\\n"</Str>, <Vr>edu</Vr>[<Vr>i</Vr>].<Vr>institution</Vr>, <Vr>edu</Vr>[<Vr>i</Vr>].<Vr>score</Vr>);</Line>
      <Line n={lineCounter++}>{"  }"}</Line>
      <Line n={lineCounter++}><br /></Line>
      <Line n={lineCounter++}>{"  "}<Kw>return</Kw> <Num>0</Num>;</Line>
      <Line n={lineCounter++}>{"}"}</Line>
    </div>);
}
const projectExtMap = {
    CampusConnect: "ext-campusconnect",
    CollegeBook: "collegebook",
    CampusGrid: "ext-campusgrid",
    "Financial Early Warning System": "ext-early-anomaly-detection",
    "AI Powered Meet Summarizer": "ext-ai-meet-summarizer",
    BidVault: "ext-bidvault",
    Bidvault: "ext-bidvault",
};
export function ProjectsContent({ initialPreview = false, onViewMoreExtension, } = {}) {
    const [preview, setPreview] = useState(initialPreview);
    if (preview) {
        return (<div className="relative p-3 sm:p-4 font-sans text-[13px] leading-relaxed">
        <button onClick={() => setPreview(false)} className="absolute top-2 right-2.5 sm:right-3 z-10 px-2.5 py-1 text-[11px] rounded border border-ide-border bg-ide-surface/90 backdrop-blur text-ide-text-dim hover:bg-ide-hover hover:text-ide-text transition-colors shadow-sm">
          ← Source
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-ide-text mb-4 sm:mb-6">Projects</h1>
        {projects.map((p) => {
                const extId = projectExtMap[p.name];
                return (<div key={p.name} className="mb-4 sm:mb-6 p-3.5 sm:p-4 rounded-lg border border-ide-border bg-ide-surface">
              <h2 className="text-[16px] sm:text-lg font-semibold text-syn-function mb-1">{p.emoji} {p.name}</h2>
              <p className="text-ide-text-dim text-[11.5px] sm:text-[12px] mb-2">{p.stack.join(" · ")}</p>
              <p className="text-ide-text text-[12.5px] sm:text-[13px] mb-3 leading-relaxed">{p.description}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-syn-variable underline underline-offset-2 hover:text-ide-accent transition-colors text-[12px]">📂 GitHub Repo</a>
                {extId && onViewMoreExtension && (<button onClick={() => onViewMoreExtension(extId)} className="ml-auto px-2.5 py-1 text-[11px] rounded border border-ide-accent/40 bg-ide-accent/10 text-ide-accent hover:bg-ide-accent/20 transition-colors font-sans font-medium">
                    View More →
                  </button>)}
              </div>
            </div>);
            })}
      </div>);
    }
    let lineNum = 1;
    return (<div className="relative whitespace-pre font-mono text-[12px] sm:text-[13px] leading-[1.65] overflow-x-auto">
      <button onClick={() => setPreview(true)} className="absolute top-1 right-2.5 sm:right-3 z-10 px-2.5 py-1 text-[11px] rounded border border-ide-border bg-ide-surface/90 backdrop-blur text-ide-text-dim hover:bg-ide-hover hover:text-ide-text transition-colors font-sans shadow-sm">
        👁 Preview
      </button>
      <Line n={lineNum++}><span className="text-syn-keyword font-bold"># Projects</span></Line>
      {projects.map((p) => (<span key={p.name}>
          <Line n={lineNum++}><br /></Line>
          <Line n={lineNum++}><span className="text-syn-keyword font-bold">## {p.emoji} {p.name}</span></Line>
          <Line n={lineNum++}><br /></Line>
          <Line n={lineNum++}><span className="text-ide-text-dim">**Stack:** {p.stack.join(", ")}</span></Line>
          <Line n={lineNum++}><br /></Line>
          <Line n={lineNum++}><span className="text-ide-text">{p.description}</span></Line>
          <Line n={lineNum++}><br /></Line>
          <Line n={lineNum++}><span className="text-ide-text">- 📂 GitHub: </span><a href={p.github} target="_blank" rel="noopener noreferrer" className="text-syn-variable underline underline-offset-2 hover:text-ide-accent transition-colors">{p.github.replace("https://", "")}</a></Line>
          <Line n={lineNum++}><br /></Line>
          <Line n={lineNum++}><span className="text-ide-text-dim">---</span></Line>
        </span>))}
    </div>);
}
export function SkillsContent() {
  let lineNum = 1;
    return (<div className="whitespace-pre font-mono text-[12px] sm:text-[13px] leading-[1.65] overflow-x-auto">
      <Line n={lineNum++}><br /></Line>
      <Line n={lineNum++}><Kw>const</Kw> <Vr>developer</Vr> = <Str>"{personalInfo.name}"</Str>;</Line>
      <Line n={lineNum++}><Kw>const</Kw> <Vr>specialization</Vr> = <Str>"{skills.specialization || "DSA & Backend Engineering"}"</Str>;</Line>
      <Line n={lineNum++}><br /></Line>
      <Line n={lineNum++}><Kw>const</Kw> <Vr>experties</Vr> = {"{"}</Line>
      <Line n={lineNum++}>{"  "}<Vr>languages</Vr>: [{skills.experties.languages.map((s, i) => <span key={i}><Str>"{s}"</Str>{i < skills.experties.languages.length - 1 ? ", " : ""}</span>)}],</Line>
      <Line n={lineNum++}>{"  "}<Vr>web_stack</Vr>: [{skills.experties.web_stack.map((s, i) => <span key={i}><Str>"{s}"</Str>{i < skills.experties.web_stack.length - 1 ? ", " : ""}</span>)}],</Line>
      <Line n={lineNum++}>{"};"}</Line>
      <Line n={lineNum++}><br /></Line>

      <Line n={lineNum++}><Kw>const</Kw> <Vr>coursework</Vr> = {"{"}</Line>
      <Line n={lineNum++}>{"  "}<Vr>concepts</Vr>: [{skills.coursework.map((s, i) => <span key={i}><Str>"{s}"</Str>{i < skills.coursework.length - 1 ? ", " : ""}</span>)}]</Line>
      <Line n={lineNum++}>{"};"}</Line>
      <Line n={lineNum++}><br /></Line>


      <Line n={lineNum++}><Kw>const</Kw> <Vr>core_concepts</Vr> = {"{"}</Line>
      <Line n={lineNum++}>{"  "}<Vr>concepts</Vr>: [{skills.core_concepts.map((s, i) => <span key={i}><Str>"{s}"</Str>{i < skills.core_concepts.length - 1 ? ", " : ""}</span>)}]</Line>
      <Line n={lineNum++}>{"};"}</Line>
      <Line n={lineNum++}><br /></Line>

      <Line n={lineNum++}><Kw>const</Kw> <Vr>backend</Vr> = {"{"}</Line>
      <Line n={lineNum++}>{"  "}<Vr>frameworks</Vr>: [{skills.backend.frameworks.map((s, i) => <span key={i}><Str>"{s}"</Str>{i < skills.backend.frameworks.length - 1 ? ", " : ""}</span>)}],</Line>
      <Line n={lineNum++}>{"  "}<Vr>databases</Vr>: [{skills.backend.databases.map((s, i) => <span key={i}><Str>"{s}"</Str>{i < skills.backend.databases.length - 1 ? ", " : ""}</span>)}],</Line>
      <Line n={lineNum++}>{"  "}<Vr>tools</Vr>: [{skills.backend.tools.map((s, i) => <span key={i}><Str>"{s}"</Str>{i < skills.backend.tools.length - 1 ? ", " : ""}</span>)}],</Line>
      <Line n={lineNum++}>{"};"}</Line>
      <Line n={lineNum++}><br /></Line>

      <Line n={lineNum++}><Kw>const</Kw> <Vr>soft_skills</Vr> = {"{"}</Line>
      <Line n={lineNum++}>{"  "}<Vr>skills</Vr>: [{skills.soft_skills.map((s, i) => <span key={i}><Str>"{s}"</Str>{i < skills.soft_skills.length - 1 ? ", " : ""}</span>)}]</Line>
      <Line n={lineNum++}>{"};"}</Line>
      <Line n={lineNum++}><br /></Line>


      <Line n={lineNum++}><Kw>export default</Kw> {"{"} <Vr>languages</Vr>, <Vr>core_concepts</Vr>, <Vr>backend</Vr>, <Vr>soft_skills</Vr>, <Vr>coursework</Vr> {"}"};</Line>
    </div>);
}
export function ExperienceContent() {
  let lineNum = 1;  
    return (<div className="whitespace-pre font-mono text-[12px] sm:text-[13px] leading-[1.65] overflow-x-auto">
      <Line n={lineNum++}><Kw>package</Kw> <Vr>career</Vr>;</Line>
      <Line n={lineNum++}><br /></Line>
      <Line n={lineNum++}><Kw>public class</Kw> <Tp>Experience</Tp> {"{"}</Line>
      <Line n={lineNum++}>{"  "}<Tp>String</Tp> <Vr>role</Vr>;</Line>
      <Line n={lineNum++}>{"  "}<Tp>String</Tp> <Vr>organization</Vr>;</Line>
      <Line n={lineNum++}>{"  "}<Tp>String</Tp> <Vr>period</Vr>;</Line>
      <Line n={lineNum++}>{"  "}<Tp>String</Tp>[] <Vr>highlights</Vr>;</Line>
      <Line n={lineNum++}>{"}"}</Line>
      <Line n={lineNum++}><br /></Line>
      <Line n={lineNum++}><Kw>class</Kw> <Tp>Timeline</Tp> {"{"}</Line>
      <Line n={lineNum++}>{"  "}<Tp>Experience</Tp>[] <Fn>getTimeline</Fn>() {"{"}</Line>
      <Line n={lineNum++}>{"    "}<Kw>return new</Kw> <Tp>Experience</Tp>[] {"{"}</Line>
      {experience.map((exp, i) => (<span key={i}>
          <Line n={lineNum++}>{"      "}<Comment> // {exp.role} — {exp.organization}</Comment></Line>
          <Line n={lineNum++}>{"      "}<Comment> // {exp.period} @ {exp.institution}</Comment></Line>
          {exp.highlights.map((h, j) => (<Line key={j} n={lineNum++}>{"      "}<Comment> // • {h}</Comment></Line>
            ))}
        </span>))}
      <Line n={lineNum++}>{"    "}{"}"};</Line>
      <Line n={lineNum++}>{"  }"}</Line>
      <Line n={lineNum++}>{"}"}</Line>
    </div>);
}
export function AchievementsContent() {
  let lineNum = 1;
    return (<div className="whitespace-pre font-mono text-[12px] sm:text-[13px] leading-[1.65] overflow-x-auto">
      <Line n={lineNum++}><Kw>CREATE TABLE</Kw> <Tp>achievements</Tp> (</Line>
      <Line n={lineNum++}>{"  "}<Vr>id</Vr>        <Tp>SERIAL</Tp> <Kw>PRIMARY KEY</Kw>,</Line>
      <Line n={lineNum++}>{"  "}<Vr>platform</Vr>  <Tp>VARCHAR</Tp>(<Num>50</Num>) <Kw>NOT NULL</Kw>,</Line>
      <Line n={lineNum++}>{"  "}<Vr>rating</Vr>    <Tp>INT</Tp>,</Line>
      <Line n={lineNum++}>{"  "}<Vr>detail</Vr>    <Tp>TEXT</Tp>,</Line>
      <Line n={lineNum++}>{"  "}<Vr>profile</Vr>   <Tp>VARCHAR</Tp>(<Num>100</Num>),</Line>
      <Line n={lineNum++}>{"  "}<Vr>url</Vr>       <Tp>TEXT</Tp></Line>
      <Line n={lineNum++}>);</Line>
      <Line n={lineNum++}><br /></Line>
      <Line n={lineNum++}><Kw>INSERT INTO</Kw> <Tp>achievements</Tp> (<Vr>platform</Vr>, <Vr>rating</Vr>, <Vr>detail</Vr>, <Vr>profile</Vr>, <Vr>url</Vr>)</Line>
      <Line n={lineNum++}><Kw>VALUES</Kw></Line>
      {achievements.map((a, i) => (<Line key={i} n={lineNum++}>{"  "}(<Str>'{a.platform}'</Str>, <Num>{a.detail.match(/\d+/)?.[0]}</Num>, <Str>'{a.detail}'</Str>, <Str>'{a.id}'</Str>, <Str>'{a.url}'</Str>){i < achievements.length - 1 ? "," : ";"}</Line>))}
      <Line n={lineNum++}><br /></Line>
      <Line n={lineNum++}><Comment>-- Query: Show all achievements ordered by rating</Comment></Line>
      <Line n={lineNum++}><Kw>SELECT</Kw> <Vr>platform</Vr>, <Vr>rating</Vr>, <Vr>detail</Vr>, <Vr>url</Vr></Line>
      <Line n={lineNum++}><Kw>FROM</Kw> <Tp>achievements</Tp></Line>
      <Line n={lineNum++}><Kw>ORDER BY</Kw> <Vr>rating</Vr> <Kw>DESC</Kw>;</Line>
    </div>);
}
export function Line({ n, children }) {
    return (<div className="flex">
      <span className="w-10 shrink-0 text-right pr-4 text-ide-text-faint select-none tabular-nums text-[12px]">
        {n}
      </span>
      <span className="flex-1">{children}</span>
    </div>);
}
function Kw({ children }) {
    return <span className="text-syn-keyword">{children}</span>;
}
function Fn({ children }) {
    return <span className="text-syn-function">{children}</span>;
}
function Str({ children }) {
    return <span className="text-syn-string">{children}</span>;
}
function Vr({ children }) {
    return <span className="text-syn-variable">{children}</span>;
}
function Tp({ children }) {
    return <span className="text-syn-type">{children}</span>;
}
function Comment({ children }) {
    return <span className="text-syn-comment italic">{children}</span>;
}
function Num({ children }) {
    return <span className="text-syn-number">{children}</span>;
}
