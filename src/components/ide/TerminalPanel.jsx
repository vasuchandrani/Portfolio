import { useEffect, useRef, useState } from "react";
import { files } from "./fileData";
import { terminalBootLines, personalInfo, education, skills, projects, experience, achievements, socialLinks } from "./portfolioData";
const fileCommands = {
    "about.cpp": { fileId: "about", cmds: [["g++", "about.cpp", "-o", "about"], ["./about"]] },
    "education.c": { fileId: "education", cmds: [["gcc", "education.c", "-o", "education"], ["./education"]] },
    "projects.md": { fileId: "projects", cmds: [["preview", "projects.md"]] },
    "skills.js": { fileId: "skills", cmds: [["node", "skills.js"]] },
    "experience.java": { fileId: "experience", cmds: [["javac", "experience.java"], ["java", "experience"]] },
    "achievements.sql": { fileId: "achievements", cmds: [["psql", "achievements.sql"]] },
    resume: { fileId: "resume", cmds: [["show", "resume"]] },
};
const helpRows = [
    { file: "About.cpp", cmd: "g++ about.cpp -o about  &&  ./about" },
    { file: "Education.c", cmd: "gcc education.c -o education  &&  ./education" },
    { file: "Projects.md", cmd: "preview projects.md" },
    { file: "Skills.js", cmd: "node skills.js" },
    { file: "Experience.java", cmd: "javac experience.java  &&  java experience" },
    { file: "Achievements.sql", cmd: "psql achievements.sql" },
    { file: "Resume", cmd: "show resume" },
];
function buildOutput(fileId) {
    switch (fileId) {
        case "about":
            return {
                title: "Output: ./about",
                fileId,
                lines: [
                    `╔══════════════════════════════════════════╗`,
                    `   ${personalInfo.name}`,
                    `   ${personalInfo.role}`,
                    `╚══════════════════════════════════════════╝`,
                    ``,
                    `Degree     : ${personalInfo.degree}`,
                    `University : ${personalInfo.university}`,
                    `CPI        : ${personalInfo.cpi}`,
                    `Location   : ${personalInfo.location}`,
                    `Focus      : ${personalInfo.focus}`,
                    ``,
                    `Email      : ${personalInfo.email}`,
                    `Phone      : ${personalInfo.phone}`,
                    ``,
                    `Mission: Building awesome tech experiences.`,
                    ``,
                    `[Process exited with code 0]`,
                ],
            };
        case "education":
            return {
                title: "Output: ./education",
                fileId,
                lines: [
                    `── Education Timeline ──`,
                    ``,
                    ...education.flatMap((e) => [
                        `• ${e.institution}`,
                        `   ${e.degree}`,
                        `   ${e.score}   |   ${e.period}   |   ${e.location}`,
                        ``,
                    ]),
                    `[Process exited with code 0]`,
                ],
            };
        case "skills":
            return {
                title: "Output: node skills.js",
                fileId,
                lines: [
                    `── Experties ──`,
                    `  Languages  : ${skills.experties.languages.join(", ")}`,
                    `  Web Stack  : ${skills.experties.web_stack.join(", ")}`,
                    ``,
                    `── Soft Skills ──`,
                    `  Skills : ${skills.soft_skills.join(", ")}`,
                    ``,
                    `── Core Concepts ──`,
                    `  Concepts : ${skills.core_concepts.join(", ")}`,
                    ``,
                    `── Coursework ──`,
                    `  Courses : ${skills.coursework.join(", ")}`,
                    ``,
                    `── Backend ──`,
                    `  Frameworks : ${skills.backend.frameworks.join(", ")}`,
                    `  Databases  : ${skills.backend.databases.join(", ")}`,
                    `  Tools      : ${skills.backend.tools.join(", ")}`,
                    ``,
                    `[node exited 0]`,
                ],
            };
        case "experience":
            return {
                title: "Output: java experience",
                fileId,
                lines: [
                    `── Experience ──`,
                    ``,
                    ...experience.flatMap((e) => [
                        `▸ ${e.role} — ${e.organization}`,
                        `   ${e.institution}   |   ${e.period}`,
                        ...e.highlights.map((h) => `   • ${h}`),
                        ``,
                    ]),
                    `[Process exited with code 0]`,
                ],
            };
        case "achievements":
            return {
                title: "Output: psql achievements.sql",
                fileId,
                lines: [
                    ` platform    | rating | detail`,
                    `-------------+--------+----------------------------------------`,
                    ...achievements.map((a) => {
                        const rating = a.detail.match(/\d+/)?.[0] ?? "—";
                        return ` ${a.platform.padEnd(11)} | ${rating.padEnd(6)} | ${a.detail}`;
                    }),
                    `(${achievements.length} rows)`,
                    ``,
                    `Profile links:`,
                    ...achievements.map((a) => `  ${a.platform.padEnd(11)} → ${a.url}`),
                    `  GitHub      → ${socialLinks.github}`,
                    `  LinkedIn    → ${socialLinks.linkedin}`,
                ],
            };
        case "projects":
            return {
                title: "Projects (rendered preview opened in editor)",
                fileId,
                lines: projects.map((p) => `• ${p.emoji} ${p.name} — ${p.github}`),
            };
        default:
            return null;
    }
}
export function TerminalPanel({ onPreviewProjects, onOutput, onOpenFile, bootSequenceKey }) {
    const [lines, setLines] = useState([]);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([]);
    const [hIdx, setHIdx] = useState(-1);
    const [compiled, setCompiled] = useState({});
    const scrollRef = useRef(null);
    const inputRef = useRef(null);
    useEffect(() => {
        setLines([]);
        setInput("");
        setHistory([]);
        setHIdx(-1);
        setCompiled({});
        let i = 0;
        const interval = setInterval(() => {
            if (i >= terminalBootLines.length) {
                clearInterval(interval);
                setLines((prev) => [
                    ...prev,
                    { kind: "hint", text: "" },
                    { kind: "hint", text: "💡 Tip: type `help` to see runnable commands." },
                ]);
                return;
            }
            const t = terminalBootLines[i];
            setLines((prev) => [...prev, { kind: "boot", text: t }]);
            i += 1;
        }, 180);
        return () => clearInterval(interval);
    }, [bootSequenceKey]);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);
    function push(l) {
        setLines((prev) => prev.concat(Array.isArray(l) ? l : [l]));
    }
    function pushHelp() {
        const rows = [
            { kind: "head", text: "Available commands" },
            { kind: "info", text: "─────────────────────────────────────────────────────" },
        ];
        helpRows.forEach((r) => {
            rows.push({ kind: "info", text: `  ${r.file.padEnd(18)}  →  ${r.cmd}` });
        });
        rows.push({ kind: "info", text: "─────────────────────────────────────────────────────" });
        rows.push({ kind: "info", text: "  help     show this list" });
        rows.push({ kind: "info", text: "  clear    clear the terminal" });
        push(rows);
    }
    function runOutput(fileId, runMessage) {
        const block = buildOutput(fileId);
        if (block)
            onOutput(block);
        push({ kind: "ok", text: runMessage });
        if (fileId !== "projects")
            onOpenFile(fileId);
    }
    function handleCommand(raw) {
        const trimmed = raw.trim();
        push({ kind: "prompt", text: trimmed });
        if (!trimmed)
            return;
        setHistory((h) => [...h, trimmed]);
        setHIdx(-1);
        const parts = trimmed.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const rest = parts.slice(1).map((s) => s.toLowerCase());
        if (cmd === "clear" || cmd === "cls") {
            setLines([]);
            return;
        }
        if (cmd === "help") {
            pushHelp();
            return;
        }
        if (cmd === "run" && rest[0]) {
            const target = rest[0].replace(/\.[a-z]+$/i, "");
            const file = files.find((f) => f.id === target);
            if (file) {
                if (file.id === "projects") {
                    onPreviewProjects();
                    runOutput("projects", "view preview in editor");
                    return;
                }
                runOutput(file.id, "show the details in output tab");
                return;
            }
            push({ kind: "err", text: `run: unknown file "${rest[0]}"` });
            return;
        }
        if (cmd === "g++") {
            if (rest.includes("about.cpp")) {
                setCompiled((c) => ({ ...c, about: true }));
                push({ kind: "ok", text: "✓ Compiled about.cpp → ./about" });
                push({ kind: "info", text: "Run `./about` to execute." });
                return;
            }
            push({ kind: "err", text: "g++: file not found. Try: g++ about.cpp -o about" });
            return;
        }
        if (cmd === "gcc") {
            if (rest.includes("education.c")) {
                setCompiled((c) => ({ ...c, education: true }));
                push({ kind: "ok", text: "✓ Compiled education.c → ./education" });
                push({ kind: "info", text: "Run `./education` to execute." });
                return;
            }
            push({ kind: "err", text: "gcc: file not found. Try: gcc education.c -o education" });
            return;
        }
        if (cmd === "javac") {
            if (rest.includes("experience.java")) {
                setCompiled((c) => ({ ...c, experience: true }));
                push({ kind: "ok", text: "✓ Compiled Experience.java → Experience.class" });
                push({ kind: "info", text: "Run `java experience` to execute." });
                return;
            }
            push({ kind: "err", text: "javac: file not found. Try: javac experience.java" });
            return;
        }
        if (cmd === "./about") {
            if (!compiled.about) {
                push({ kind: "err", text: "bash: ./about: No such file or directory" });
                push({ kind: "info", text: "Hint: compile first with `g++ about.cpp -o about`, then run `./about`." });
                return;
            }
            runOutput("about", "show the details in output tab");
            return;
        }
        if (cmd === "./education") {
            if (!compiled.education) {
                push({ kind: "err", text: "bash: ./education: No such file or directory" });
                push({ kind: "info", text: "Hint: compile first with `gcc education.c -o education`, then run `./education`." });
                return;
            }
            runOutput("education", "show the details in output tab");
            return;
        }
        if (cmd === "node" && rest[0] === "skills.js") {
            runOutput("skills", "show the details in output tab");
            return;
        }
        if (cmd === "java" && rest[0] === "experience") {
            if (!compiled.experience) {
                push({ kind: "err", text: "Error: Could not find or load main class experience" });
                push({ kind: "info", text: "Hint: compile first with `javac experience.java`, then run `java experience`." });
                return;
            }
            runOutput("experience", "show the details in output tab");
            return;
        }
        if (cmd === "psql" && (rest[0] === "achievements.sql" || rest[0] === "achievement.sql")) {
            runOutput("achievements", "show the details in output tab");
            return;
        }
        if (cmd === "preview" && rest[0] === "projects.md") {
            onPreviewProjects();
            runOutput("projects", "view preview in editor");
            return;
        }
        if (cmd === "show" && rest[0] === "resume") {
            onOpenFile("resume");
            onOutput({
                title: "Output: show resume",
                fileId: "resume",
                lines: [
                    "📄 Opened Resume in editor.",
                    "",
                    "Use the ⬇ Download PDF button in the editor to save the file.",
                    `Direct link: /Resume.pdf`,
                ],
            });
            push({ kind: "ok", text: "resume opened in editor — see preview above" });
            return;
        }
        push({ kind: "err", text: `command not found: ${trimmed}` });
        push({ kind: "info", text: "You can run the following commands only — type `help` for the full list." });
        pushHelp();
    }
    function onKeyDown(e) {
        if (e.key === "Enter") {
            handleCommand(input);
            setInput("");
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (history.length === 0)
                return;
            const next = hIdx < 0 ? history.length - 1 : Math.max(0, hIdx - 1);
            setHIdx(next);
            setInput(history[next]);
        }
        else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (hIdx < 0)
                return;
            const next = hIdx + 1;
            if (next >= history.length) {
                setHIdx(-1);
                setInput("");
            }
            else {
                setHIdx(next);
                setInput(history[next]);
            }
        }
    }
    return (<div className="flex-1 flex flex-col min-w-0 min-h-0 cursor-text" onClick={() => inputRef.current?.focus()}>
      <div ref={scrollRef} className="flex-1 min-h-0 px-4 pb-2 overflow-y-auto text-[12px] leading-relaxed">
        {lines.map((l, i) => {
            if (l.kind === "prompt") {
                return (<div key={i}>
                <Prompt />
                <span className="text-ide-text font-semibold">{l.text}</span>
              </div>);
            }
            if (l.kind === "ok")
                return <div key={i} className="text-term-green font-semibold">{l.text || "\u00a0"}</div>;
            if (l.kind === "err")
                return <div key={i} className="text-[#ff6b6b] font-semibold">{l.text || "\u00a0"}</div>;
            if (l.kind === "hint")
                return <div key={i} className="text-term-amber font-semibold">{l.text || "\u00a0"}</div>;
            if (l.kind === "head")
                return <div key={i} className="text-term-cyan font-bold mt-1">{l.text}</div>;
            if (l.kind === "info")
                return <div key={i} className="text-ide-text font-semibold whitespace-pre">{l.text || "\u00a0"}</div>;
            if (l.kind === "boot") {
                if (l.text.startsWith("vatsal@")) {
                    return (<div key={i}>
                  <span className="text-term-green font-semibold">vatsal@dev-machine</span>
                  <span className="text-ide-text-dim">:</span>
                  <span className="text-term-cyan font-semibold">~/portfolio</span>
                                    <span className="text-term-amber">$ </span>
                  <span className="text-ide-text font-semibold">{l.text.split("$ ")[1] ?? ""}</span>
                </div>);
                }
                if (l.text.startsWith("✓"))
                    return <div key={i} className="text-term-green font-semibold">{l.text}</div>;
                if (l.text.startsWith("📊") || l.text.startsWith("🏗️") || l.text.startsWith("🎯"))
                    return <div key={i} className="text-term-amber font-semibold">{l.text}</div>;
                return <div key={i} className="text-ide-text font-semibold">{l.text || "\u00a0"}</div>;
            }
            return <div key={i} className="text-ide-text font-semibold">{l.text || "\u00a0"}</div>;
        })}
        <div className="flex items-center gap-1">
          <Prompt />
          <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKeyDown} spellCheck={false} autoCapitalize="off" autoCorrect="off" placeholder="stuck?? type help" className="flex-1 bg-transparent border-0 outline-none text-ide-text font-semibold text-[12px] font-mono placeholder:text-ide-text-dim placeholder:font-bold placeholder:not-italic" aria-label="Terminal input"/>
        </div>
      </div>
    </div>);
}
function Prompt() {
    return (<>
      <span className="text-term-green font-semibold">vatsal@dev-machine</span>
      <span className="text-ide-text-dim">:</span>
      <span className="text-term-cyan font-semibold">~/portfolio</span>
            <span className="text-term-amber font-semibold">$ </span>
    </>);
}
export function OutputPanel({ block }) {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current)
            ref.current.scrollTop = 0;
    }, [block]);
    if (!block) {
        return (<div className="flex-1 min-h-0 px-4 py-3 text-[12px] text-ide-text-dim font-bold overflow-y-auto">
        No output yet. Run a file in the terminal to see results here.
      </div>);
    }
    return (<div ref={ref} className="flex-1 min-h-0 px-4 py-2 overflow-y-auto text-[12px] leading-relaxed font-mono">
      <div className="text-ide-text-dim mb-2 text-[11px] uppercase tracking-wider font-sans font-bold">{block.title}</div>
      {block.lines.map((l, i) => (<div key={i} className="text-ide-text font-semibold whitespace-pre">{l || "\u00a0"}</div>))}
    </div>);
}
