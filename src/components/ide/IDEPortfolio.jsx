import { useState, useEffect, useCallback, useRef } from "react";
import { files, AboutContent, ProjectsContent, SkillsContent, ExperienceContent, EducationContent, AchievementsContent, ResumeContent } from "./fileData";
import { socialLinks, extensions } from "./portfolioData";
import { WelcomePage } from "./WelcomePage";
import { TerminalPanel, OutputPanel } from "./TerminalPanel";
import { SourceControlPanel } from "./SourceControlPanel";
import { ExtensionsPanel, ExtensionDetail } from "./ExtensionsPanel";
import { useIsMobile } from "../../hooks/use-mobile";

export function IDEPortfolio() {
    const isMobile = useIsMobile();
    const [activeFile, setActiveFile] = useState("welcome");
    const [openFiles, setOpenFiles] = useState([]);
    const [showBottomPanel, setShowBottomPanel] = useState(true);
    const [terminalSessionId, setTerminalSessionId] = useState(0);
    const [sidebarPanel, setSidebarPanel] = useState("explorer");
    const [sidebarWidth, setSidebarWidth] = useState(260);
    const [terminalHeight, setTerminalHeight] = useState(220);
    const [outputBlock, setOutputBlock] = useState(null);
    const [projectsPreview, setProjectsPreview] = useState(false);
    const [mobileBottomTab, setMobileBottomTab] = useState("terminal");
    const isDragging = useRef(false);
    const isTerminalDragging = useRef(false);
    const activeFileData = files.find((f) => f.id === activeFile);
    const activeExtensionId = activeFile.startsWith("ext:") ? activeFile.slice(4) : null;
    const openExtensionDetail = useCallback((extId) => {
        const tabId = `ext:${extId}`;
        setOpenFiles((prev) => (prev.includes(tabId) ? prev : [...prev, tabId]));
        setActiveFile(tabId);
        setShowBottomPanel(false);
        setSidebarPanel("extensions");
    }, []);
    const handleSetOutputBlock = useCallback((block) => {
        setOutputBlock(block);
        if (block) {
            setMobileBottomTab("output");
        }
    }, []);
    const fileContentMap = {
        about: <AboutContent />,
        education: <EducationContent />,
        projects: <ProjectsContent initialPreview={projectsPreview} key={projectsPreview ? "p" : "s"} onViewMoreExtension={openExtensionDetail}/>,
        skills: <SkillsContent />,
        experience: <ExperienceContent />,
        achievements: <AchievementsContent />,
        resume: <ResumeContent />,
    };
    const openFile = useCallback((id) => {
        setOpenFiles((prev) => (prev.includes(id) ? prev : [...prev, id]));
        setActiveFile(id);
    }, []);
    function closeFile(id, e) {
        e.stopPropagation();
        const newOpen = openFiles.filter((f) => f !== id);
        setOpenFiles(newOpen);
        if (activeFile === id) {
            setActiveFile(newOpen.length > 0 ? newOpen[newOpen.length - 1] : "welcome");
        }
    }
    const onMouseDown = useCallback(() => {
        isDragging.current = true;
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
    }, []);
    const onTerminalMouseDown = useCallback(() => {
        isTerminalDragging.current = true;
        document.body.style.cursor = "row-resize";
        document.body.style.userSelect = "none";
    }, []);
    useEffect(() => {
        const onMouseMove = (e) => {
            if (isDragging.current) {
                const newWidth = Math.min(400, Math.max(150, e.clientX - 48));
                setSidebarWidth(newWidth);
            }
            if (isTerminalDragging.current) {
                const newHeight = Math.min(400, Math.max(80, window.innerHeight - e.clientY - 26));
                setTerminalHeight(newHeight);
            }
        };
        const onMouseUp = () => {
            isDragging.current = false;
            isTerminalDragging.current = false;
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);
    useEffect(() => {
        const isTyping = (el) => {
            const t = el;
            if (!t)
                return false;
            const tag = t.tagName;
            return tag === "INPUT" || tag === "TEXTAREA" || t.isContentEditable;
        };
        const onKey = (e) => {
            const mod = e.ctrlKey || e.metaKey;
            if (mod && (e.key === "`" || e.code === "Backquote")) {
                e.preventDefault();
                const next = !showBottomPanel;
                if (next) {
                    setTerminalSessionId((value) => value + 1);
                    if (sidebarPanel === "scm" || sidebarPanel === "extensions") {
                        setSidebarPanel("explorer");
                    }
                }
                setShowBottomPanel(next);
                return;
            }
            if (e.altKey && (e.key.toLowerCase() === "w" || e.key.toLowerCase() === "c")) {
                if (isTyping(e.target))
                    return;
                e.preventDefault();
                if (activeFile && activeFile !== "welcome") {
                    setOpenFiles((prev) => {
                        const newOpen = prev.filter((f) => f !== activeFile);
                        setActiveFile(newOpen.length > 0 ? newOpen[newOpen.length - 1] : "welcome");
                        return newOpen;
                    });
                }
                return;
            }
            if (!mod || !e.shiftKey)
                return;
            if (isTyping(e.target))
                return;
            const key = e.key.toLowerCase();
            if (key === "e") {
                e.preventDefault();
                setSidebarPanel("explorer");
                setShowBottomPanel(true);
            }
            else if (key === "g") {
                e.preventDefault();
                setSidebarPanel("scm");
                setShowBottomPanel(false);
            }
            else if (key === "x") {
                e.preventDefault();
                setSidebarPanel("extensions");
                setShowBottomPanel(false);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [sidebarPanel, showBottomPanel, activeFile]);
    const handlePreviewProjects = useCallback(() => {
        setProjectsPreview(true);
        setOpenFiles((prev) => (prev.includes("projects") ? prev : [...prev, "projects"]));
        setActiveFile("projects");
    }, []);
    return (<div className="h-dvh w-full flex flex-col bg-ide-bg text-ide-text antialiased text-[13px] selection:bg-ide-accent/20 overflow-hidden font-mono">
      <div className="h-8 bg-ide-bg border-b border-ide-border flex items-center justify-center relative shrink-0 text-ide-text-dim text-[11px]">
        <div className="absolute left-3 sm:left-4 flex gap-1.5 sm:gap-2">
          <div className="size-2.5 sm:size-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"/>
          <div className="size-2.5 sm:size-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"/>
          <div className="size-2.5 sm:size-3 rounded-full bg-[#27c93f] border border-[#1aab29]"/>
        </div>
        <span className="font-sans font-medium text-[11px] sm:text-[12px] truncate px-16">Vatsal Chandrani — Portfolio</span>
      </div>

      <div className="flex flex-1 min-h-0">
        <div className="w-11 sm:w-12 bg-ide-panel flex flex-col items-center py-3 gap-4 sm:gap-5 shrink-0 text-ide-text-dim">
          <ActivityIcon active={sidebarPanel === "explorer"} onClick={() => {
            const next = sidebarPanel === "explorer" ? null : "explorer";
            setSidebarPanel(next);
            if (next === "explorer") {
                setTerminalSessionId((value) => value + 1);
                setShowBottomPanel(true);
            }
        }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </ActivityIcon>
          <ActivityIcon active={sidebarPanel === "extensions"} onClick={() => {
            if (sidebarPanel === "extensions") {
                setSidebarPanel("explorer");
                setTerminalSessionId((value) => value + 1);
                setShowBottomPanel(true);
            }
            else {
                setSidebarPanel("extensions");
                setShowBottomPanel(false);
            }
        }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
              <path d="M14 7h4a3 3 0 0 1 3 3v0"/>
              <path d="M10 17H6a3 3 0 0 1-3-3v0"/>
            </svg>
          </ActivityIcon>
          <ActivityIcon active={sidebarPanel === "scm"} onClick={() => {
            if (sidebarPanel === "scm") {
                setSidebarPanel("explorer");
                setTerminalSessionId((value) => value + 1);
                setShowBottomPanel(true);
            }
            else {
                setSidebarPanel("scm");
                setShowBottomPanel(false);
            }
        }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="18" cy="18" r="3"/>
              <circle cx="6" cy="6" r="3"/>
              <path d="M6 21V9a9 9 0 0 0 9 9"/>
            </svg>
          </ActivityIcon>
          <div className="mt-auto mb-2">
            <ActivityIcon onClick={() => {
              const next = !showBottomPanel;
              if (next) {
                setTerminalSessionId((value) => value + 1);
              }
              setShowBottomPanel(next);
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <polyline points="4 17 10 11 4 5"/>
                <line x1="12" y1="19" x2="20" y2="19"/>
              </svg>
            </ActivityIcon>
          </div>
        </div>

        {sidebarPanel && sidebarPanel !== "scm" && (<>
            {sidebarPanel === "explorer" ? (<div className="bg-ide-surface border-r border-ide-border flex-col shrink-0 hidden md:flex" style={{ width: sidebarWidth }}>
                <div className="px-4 py-3 text-[11px] tracking-wider text-ide-text-dim font-semibold font-sans uppercase">
                  Workspace · Codebase
                </div>
                <div className="flex items-center px-2 py-1 text-ide-text text-[11px] tracking-wide font-bold font-sans">
                  <span className="mr-1 text-[10px]">▼</span> VATSAL_CHANDRANI
                </div>
                <div className="flex flex-col mt-1">
                  {files.map((file) => (<button key={file.id} onClick={() => openFile(file.id)} className={`pl-7 py-1.5 pr-4 flex items-center gap-2 text-left transition-colors text-[13px] ${activeFile === file.id
                        ? "bg-ide-hover text-ide-text"
                        : "text-ide-text-dim hover:bg-ide-hover hover:text-ide-text"}`}>
                      <span className="text-[10px] font-bold font-mono shrink-0 w-5 text-center" style={{ color: file.languageColor }}>
                        {file.icon}
                      </span>
                      <span className="truncate">{file.name}</span>
                    </button>))}
                </div>
              </div>) : (<div className="hidden md:flex shrink-0" style={{ width: sidebarWidth }}>
                <ExtensionsPanel onOpenDetail={openExtensionDetail} activeId={activeExtensionId}/>
              </div>)}
            <div onMouseDown={onMouseDown} className="relative w-1.5 -mx-[2px] cursor-col-resize shrink-0 hidden md:block group z-10" role="separator" aria-orientation="vertical">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-ide-divider group-hover:bg-ide-accent group-active:bg-ide-accent transition-colors"/>
            </div>
          </>)}

        <div className="flex flex-1 flex-col min-w-0 min-h-0 bg-ide-bg">
          {sidebarPanel === "scm" ? (
            <SourceControlPanel />
          ) : isMobile && sidebarPanel === "extensions" && !activeFile.startsWith("ext:") ? (
            <div className="flex-1 min-h-0 overflow-auto">
              <ExtensionsPanel onOpenDetail={openExtensionDetail} activeId={activeExtensionId}/>
            </div>
          ) : (<>
          <div className="flex gap-1.5 overflow-x-auto border-b border-ide-border/50 px-2.5 py-1.5 md:hidden scrollbar-none touch-pan-x bg-ide-surface/40 shrink-0">
            {files.map((file) => (<button key={file.id} onClick={() => openFile(file.id)} className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-sans transition-colors flex items-center gap-1.5 ${activeFile === file.id
                    ? "border-ide-accent bg-ide-hover text-ide-text font-bold"
                    : "border-ide-border text-ide-text-dim hover:bg-ide-hover hover:text-ide-text"}`}>
                <span className="text-[9px] font-bold font-mono" style={{ color: file.languageColor }}>
                  {file.icon}
                </span>
                <span>{file.name}</span>
              </button>))}
          </div>

          <div className="h-9 bg-ide-tab flex overflow-x-auto shrink-0 scrollbar-none touch-pan-x">
            <button onClick={() => setActiveFile("welcome")} className={`px-3 flex items-center gap-2 min-w-[100px] sm:min-w-[120px] max-w-[180px] text-[12px] border-r border-ide-border transition-colors shrink-0 ${activeFile === "welcome"
                ? "bg-ide-tab-active border-t-2 border-t-ide-accent text-ide-text"
                : "text-ide-text-dim hover:bg-ide-hover border-t-2 border-t-transparent"}`}>
              <span className="text-[10px]">⚡</span>
              <span className="truncate">Welcome</span>
            </button>
            {openFiles.map((fId) => {
                const isExt = fId.startsWith("ext:");
                const ext = isExt ? extensions.find((e) => e.id === fId.slice(4)) : null;
                const f = !isExt ? files.find((x) => x.id === fId) : null;
                if (!isExt && !f)
                    return null;
                const isActive = fId === activeFile;
                const tabName = ext ? ext.name : f.name;
                const tabIcon = ext ? "★" : f.icon;
                const tabColor = ext ? "hsl(var(--ide-accent))" : f.languageColor;
                return (<button key={fId} onClick={() => {
                        setActiveFile(fId);
                        if (isExt)
                            setShowBottomPanel(false);
                    }} className={`group px-3 flex items-center gap-2 min-w-[100px] sm:min-w-[120px] max-w-[200px] text-[12px] border-r border-ide-border transition-colors shrink-0 ${isActive
                        ? "bg-ide-tab-active border-t-2 border-t-ide-accent text-ide-text"
                        : "text-ide-text-dim hover:bg-ide-hover border-t-2 border-t-transparent"}`}>
                  <span className="text-[10px] font-bold" style={{ color: tabColor }}>
                    {tabIcon}
                  </span>
                  <span className="truncate">{tabName}</span>
                  <span onClick={(e) => closeFile(fId, e)} className="ml-auto text-ide-text-faint hover:text-ide-text text-[10px] opacity-70 sm:opacity-0 group-hover:opacity-100 transition-opacity p-1" style={{ opacity: isActive ? 1 : undefined }}>
                    ✕
                  </span>
                </button>);
            })}
          </div>

          {activeFile !== "welcome" && !activeFile.startsWith("ext:") && activeFileData && (<div className="h-7 flex items-center px-3 sm:px-4 text-[11px] text-ide-text-dim border-b border-ide-border/50 shrink-0 gap-1.5 font-sans overflow-x-auto scrollbar-none">
              <span>vatsal_chandrani</span>
              <span className="text-ide-text-faint">›</span>
              <span style={{ color: activeFileData.languageColor }} className="text-[9px] font-bold font-mono">
                {activeFileData.icon}
              </span>
              <span className="truncate">{activeFileData.name}</span>
            </div>)}
          {activeFile.startsWith("ext:") && (<div className="h-7 flex items-center px-3 sm:px-4 text-[11px] text-ide-text-dim border-b border-ide-border/50 shrink-0 gap-1.5 font-sans overflow-x-auto scrollbar-none">
              <span>arsenal</span>
              <span className="text-ide-text-faint">›</span>
              <span className="text-ide-accent font-bold">★</span>
              <span className="truncate">{extensions.find((e) => e.id === activeFile.slice(4))?.name ?? "Item"}</span>
            </div>)}

          <div className={`flex-1 min-h-0 overflow-auto ${activeFile === "resume" || activeFile.startsWith("ext:") ? "" : "py-3 sm:py-4 px-2 sm:px-3"}`}>
            {activeFile === "welcome" ? (<WelcomePage onOpenFile={openFile}/>) : activeFile.startsWith("ext:") ? (<ExtensionDetail id={activeFile.slice(4)}/>) : (fileContentMap[activeFile])}
          </div>

          {showBottomPanel && (<>
              <div onMouseDown={onTerminalMouseDown} className="relative h-1.5 -my-[2px] cursor-row-resize shrink-0 group z-10" role="separator" aria-orientation="horizontal">
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-ide-divider group-hover:bg-ide-accent group-active:bg-ide-accent transition-colors"/>
              </div>
              <div className="bg-ide-bg flex flex-col shrink-0 relative min-h-0" style={{ height: terminalHeight }}>
                {/* Mobile Tab Switcher */}
                <div className="md:hidden flex items-center justify-between px-3 h-7 border-b border-ide-divider/60 shrink-0 font-sans bg-ide-surface/30">
                  <div className="flex gap-1">
                    <button onClick={() => setMobileBottomTab("terminal")} className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded transition-colors ${mobileBottomTab === "terminal" ? "bg-ide-hover text-ide-accent" : "text-ide-text-dim"}`}>
                      Terminal
                    </button>
                    <button onClick={() => setMobileBottomTab("output")} className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded transition-colors ${mobileBottomTab === "output" ? "bg-ide-hover text-ide-accent" : "text-ide-text-dim"}`}>
                      Output {outputBlock ? "●" : ""}
                    </button>
                  </div>
                  <button onClick={() => setShowBottomPanel(false)} className="text-ide-text-faint hover:text-ide-text text-[14px] leading-none" aria-label="Close panel">
                    ✕
                  </button>
                </div>

                {/* Mobile View */}
                <div className="md:hidden flex-1 min-h-0 flex flex-col">
                  {mobileBottomTab === "terminal" ? (
                    <TerminalPanel bootSequenceKey={terminalSessionId} onPreviewProjects={handlePreviewProjects} onOutput={handleSetOutputBlock} onOpenFile={openFile}/>
                  ) : (
                    <OutputPanel block={outputBlock}/>
                  )}
                </div>

                {/* Desktop View (Side by Side) */}
                <div className="hidden md:flex flex-1 min-h-0">
                  <div className="flex-1 flex flex-col min-w-0 min-h-0">
                    <div className="px-4 h-7 flex items-center text-[10px] uppercase tracking-wider text-ide-text font-sans border-b border-ide-divider/60 shrink-0 font-semibold">
                      Terminal
                    </div>
                    <TerminalPanel bootSequenceKey={terminalSessionId} onPreviewProjects={handlePreviewProjects} onOutput={handleSetOutputBlock} onOpenFile={openFile}/>
                  </div>
                  <div className="w-px bg-ide-divider shrink-0"/>
                  <div className="flex-1 flex flex-col min-w-0 min-h-0">
                    <div className="px-4 h-7 flex items-center justify-between text-[10px] uppercase tracking-wider text-ide-text font-sans border-b border-ide-divider/60 shrink-0 font-semibold">
                      <span>Output</span>
                      <button onClick={() => setShowBottomPanel(false)} className="text-ide-text-faint hover:text-ide-text text-[14px] leading-none" aria-label="Close panel">
                        ✕
                      </button>
                    </div>
                    <OutputPanel block={outputBlock}/>
                  </div>
                </div>
              </div>
              </>)}
          </>)}
        </div>
      </div>

      <div className="h-[26px] bg-ide-panel border-t border-ide-border text-ide-text-dim flex items-center justify-start sm:justify-center px-3 text-[11px] shrink-0 font-sans gap-1 overflow-x-auto scrollbar-none touch-pan-x">
        <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:bg-ide-hover hover:text-ide-text px-2 py-0.5 rounded transition-colors shrink-0">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#f5f5f5"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub
        </a>
        <a href={socialLinks.codolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:bg-ide-hover hover:text-ide-text px-2 py-0.5 rounded transition-colors shrink-0">
          <span className="text-[#22d3ee] font-bold text-[12px]">{"</>"}</span>
          Codolio
        </a>
        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:bg-ide-hover hover:text-ide-text px-2 py-0.5 rounded transition-colors">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          LinkedIn
        </a>
        <a href={socialLinks.codeforces} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:bg-ide-hover hover:text-ide-text px-2 py-0.5 rounded transition-colors">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="11" width="5" height="11" rx="1" fill="#1F8ACB"/>
            <rect x="9.5" y="6" width="5" height="16" rx="1" fill="#FFCA28"/>
            <rect x="17" y="2" width="5" height="20" rx="1" fill="#E53935"/>
          </svg>
          Codeforces
        </a>
        <a href={socialLinks.leetcode} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:bg-ide-hover hover:text-ide-text px-2 py-0.5 rounded transition-colors">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" fill="#FFA116"/>
          </svg>
          LeetCode
        </a>
      </div>
    </div>);
}
function ActivityIcon({ children, active, onClick, }) {
    return (<div onClick={onClick} className={`relative cursor-pointer p-1.5 rounded transition-colors ${active ? "text-ide-text" : "text-ide-text-dim hover:text-ide-text"}`}>
      {active && (<div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-6 bg-ide-accent rounded-r"/>)}
      {children}
    </div>);
}
