import React from 'react';
import { FolderTree, FileText, Server, Bot, ListOrdered } from 'lucide-react';

export const ImplementationGuide: React.FC = () => {
  return (
    <div className="h-full w-full bg-mosaic-tile rounded-sm border border-mosaic-border p-5 flex flex-col transition-colors duration-300 overflow-y-auto custom-scrollbar">
      
      <div className="flex items-center gap-2 mb-4 border-b border-mosaic-border pb-2 shrink-0">
         <Server className="w-4 h-4 text-brand-600 dark:text-brand-400" />
         <h4 className="font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Implementation</h4>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        {/* Infographic */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-sm border border-dashed border-slate-300 dark:border-slate-700 p-4 font-mono text-sm shrink-0">
           <div className="flex items-center gap-2 text-slate-400 mb-2">
              <FolderTree className="w-4 h-4" />
              <span>project-root/</span>
           </div>
           <div className="pl-6 flex flex-col gap-2 border-l border-slate-200 dark:border-slate-700 ml-2">
              <div className="flex items-center gap-2 text-slate-500">
                 <FileText className="w-3.5 h-3.5" />
                 <span>index.html</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                 <FileText className="w-3.5 h-3.5" />
                 <span>robots.txt</span>
              </div>
              <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 py-1 px-2 -ml-2 rounded w-fit animate-pulse">
                 <FileText className="w-3.5 h-3.5" />
                 <span className="font-bold">llms.txt</span>
                 <span className="text-[10px] ml-2 opacity-70">&lt;-- ADD HERE</span>
              </div>
           </div>
        </div>

        {/* Deployment Steps */}
        <div className="space-y-3 shrink-0">
           <h5 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-brand-500" />
              Deployment Steps
           </h5>
           <ul className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 list-decimal pl-4 space-y-2">
              <li>
                <strong>Download</strong> the generated file using the button above.
              </li>
              <li>
                <strong>Upload</strong> the <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-brand-600 dark:text-brand-400 font-mono text-[10px]">llms.txt</code> file to your website's root directory (e.g., <code className="font-mono text-[10px]">public/</code> or <code className="font-mono text-[10px]">static/</code>).
              </li>
              <li>
                <strong>Verify</strong> accessibility by visiting <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-700 dark:text-slate-300 font-mono text-[10px]">yourdomain.com/llms.txt</code> in a browser.
              </li>
           </ul>
        </div>

        {/* Value Prop */}
        <div className="space-y-3 shrink-0">
           <h5 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Bot className="w-4 h-4 text-brand-500" />
              Why this improves GEO
           </h5>
           <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              By adding this file to your root directory, you provide AI agents (like ChatGPT, Claude, and Gemini) with a structured, hallucination-free map of your content. This drastically improves how your website is cited and referenced in AI-generated answers.
           </p>
        </div>
      </div>
    </div>
  );
};