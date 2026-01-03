import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Code2, Eye, Terminal, Download } from 'lucide-react';
import { GenerationResult } from '../types';
import ReactMarkdown from 'react-markdown';

interface ResultViewerProps {
  result: GenerationResult;
}

export const ResultViewer: React.FC<ResultViewerProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'raw' | 'preview'>('raw');

  const handleCopy = () => {
    navigator.clipboard.writeText(result.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([result.content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "llms.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const sources = result.groundingMetadata?.groundingChunks?.filter(c => c.web).map(c => c.web) || [];

  return (
    <div className="w-full h-full bg-mosaic-tile border border-mosaic-border rounded-sm flex flex-col transition-colors duration-300">
      
      {/* Mosaic Header */}
      <div className="flex items-center justify-between p-3 border-b border-mosaic-border bg-slate-50 dark:bg-slate-900/50 transition-colors">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1 bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-900/50 rounded-sm transition-colors">
             <Terminal className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
             <span className="text-xs font-mono text-brand-600 dark:text-brand-400 uppercase tracking-wider">Output_Buffer</span>
           </div>
           
           <div className="flex rounded-sm bg-slate-200 dark:bg-slate-950 border border-mosaic-border p-0.5 transition-colors">
             <button
               onClick={() => setViewMode('raw')}
               className={`px-3 py-1 rounded-[1px] text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 transition-all ${viewMode === 'raw' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
             >
               <Code2 className="w-3 h-3" /> Raw
             </button>
             <button
               onClick={() => setViewMode('preview')}
               className={`px-3 py-1 rounded-[1px] text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 transition-all ${viewMode === 'preview' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
             >
               <Eye className="w-3 h-3" /> View
             </button>
           </div>
        </div>

        <div className="flex items-center gap-2">
            <button
            onClick={handleDownload}
            className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-wider bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-sm transition-colors"
            title="Download .txt"
            >
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline">Download</span>
            </button>
            <button
            onClick={handleCopy}
            className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-wider bg-brand-600 hover:bg-brand-500 text-white px-3 py-1.5 rounded-sm transition-colors"
            >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="relative flex-1 bg-white dark:bg-black/20 min-h-[600px] flex flex-col transition-colors duration-300">
          {viewMode === 'raw' ? (
            <div className="relative flex-1 flex flex-col">
               <textarea 
                  className="flex-1 w-full bg-transparent text-slate-800 dark:text-slate-300 font-mono text-sm p-6 resize-none focus:outline-none custom-scrollbar leading-relaxed"
                  value={result.content}
                  readOnly
                  spellCheck={false}
               />
               <div className="px-4 py-2 bg-slate-100 dark:bg-slate-950 border-t border-mosaic-border flex justify-between items-center text-[10px] font-mono text-slate-500 dark:text-slate-600 uppercase transition-colors">
                 <span>UTF-8 / Markdown</span>
                 <span>Ln {result.content.split('\n').length}, Col 0</span>
               </div>
            </div>
          ) : (
            <div className="flex-1 p-8 prose dark:prose-invert prose-slate prose-sm md:prose-base max-w-none font-sans custom-scrollbar overflow-y-auto max-h-[700px]">
              <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-200 dark:border-slate-800" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-lg font-semibold text-brand-700 dark:text-brand-200 mt-8 mb-4 flex items-center gap-2 before:content-['#'] before:text-brand-500/50" {...props} />,
                  a: ({node, ...props}) => <span className="text-brand-600 dark:text-brand-400 underline underline-offset-4 decoration-brand-400/30">{props.children}</span>,
                  ul: ({node, ...props}) => <ul className="space-y-2 ml-4 text-slate-700 dark:text-slate-300" {...props} />,
                  li: ({node, ...props}) => <li className="pl-1 marker:text-brand-500" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-brand-500 pl-4 py-2 my-4 bg-slate-100 dark:bg-slate-900/30 italic text-slate-600 dark:text-slate-400" {...props} />,
                  code: ({node, ...props}) => <code className="bg-slate-100 dark:bg-slate-950 text-brand-700 dark:text-brand-300 px-1.5 py-0.5 rounded-sm text-xs font-mono border border-slate-200 dark:border-slate-800" {...props} />
                }}
              >
                {result.content}
              </ReactMarkdown>
            </div>
          )}
      </div>

      {/* Sites Referred Footer */}
      {sources.length > 0 && (
        <div className="border-t border-mosaic-border bg-slate-50 dark:bg-slate-950/50 p-4 transition-colors">
          <div className="text-[10px] font-mono uppercase text-slate-500 mb-3 tracking-widest">Sites Referred (Verification)</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sources.map((source, idx) => (
              source && (
                <a 
                  key={idx} 
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-500/50 transition-colors group shadow-sm dark:shadow-none"
                >
                  <ExternalLink className="w-3 h-3 text-slate-400 dark:text-slate-600 group-hover:text-brand-500 dark:group-hover:text-brand-400" />
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400 truncate group-hover:text-slate-900 dark:group-hover:text-slate-200">
                     {source.title || source.uri}
                  </span>
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};