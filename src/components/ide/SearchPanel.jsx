import { useState } from "react";
import { files } from "./fileData";
export function SearchPanel({ onOpenFile, onClose, }) {
    const [query, setQuery] = useState("");
    const filtered = query.trim()
        ? files.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
        : files;
    return (<div className="w-full bg-ide-surface border-r border-ide-border flex flex-col">
      <div className="px-4 py-3 text-[11px] tracking-wider text-ide-text-dim font-semibold font-sans uppercase flex items-center justify-between">
        <span>Search</span>
        <button onClick={onClose} className="hover:text-ide-text text-[13px]">✕</button>
      </div>
      <div className="px-3 mb-2">
        <input type="text" autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search files..." className="w-full bg-ide-bg border border-ide-border rounded px-2 py-1.5 text-[12px] text-ide-text font-semibold placeholder:text-ide-text-dim placeholder:font-bold outline-none focus:border-ide-accent"/>
      </div>
      <div className="px-3 pb-1 text-[10px] text-ide-text-faint uppercase tracking-wider font-sans">
        {query.trim() ? "Results" : "Recent"}
      </div>
      <div className="flex flex-col">
        {filtered.map((file) => (<button key={file.id} onClick={() => {
                onOpenFile(file.id);
                onClose();
            }} className="pl-5 py-1.5 pr-4 flex items-center gap-2 text-left transition-colors text-[13px] text-ide-text-dim hover:bg-ide-hover hover:text-ide-text">
            <span className="text-[10px] font-bold font-mono shrink-0 w-5 text-center" style={{ color: file.languageColor }}>
              {file.icon}
            </span>
            <span className="truncate">{file.name}</span>
          </button>))}
        {filtered.length === 0 && (<div className="px-5 py-3 text-[12px] text-ide-text-faint">No files found</div>)}
      </div>
    </div>);
}
