import React, { useState, useEffect } from 'react';
import { generateLLMsTxt } from './services/geminiService';
import { ResultViewer } from './components/ResultViewer';
import { ImplementationGuide } from './components/ImplementationGuide';
import { GenerationResult, GenerationStatus } from './types';
import { Globe, ArrowRight, AlertCircle, Loader2, Command, Hash, Sun, Moon, Timer, Cpu, Database } from 'lucide-react';

const LOADING_MESSAGES = [
  "Initializing Senior GEO Architect Agent...",
  "Phase 1: Deep Reconnaissance (site: crawl)...",
  "Phase 2: Mapping Product Ontology...",
  "Phase 3: Deep-Linking Documentation...",
  "Phase 4: Extracting Full Blog Archive...",
  "Phase 5: Verifying Semantic Integrity...",
  "Phase 6: Maximizing Contextual Density...",
  "Finalizing Master LLMs.txt..."
];

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [progress, setProgress] = useState(0);

  // Initialize theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Timer Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (status === GenerationStatus.LOADING) {
      const startTime = Date.now();
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 100);
    } else if (status === GenerationStatus.IDLE) {
      setElapsedTime(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  // Progress Bar Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (status === GenerationStatus.LOADING) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          // Slow down as we get closer to 95%
          if (prev >= 95) return 95;
          // Variable increment to look organic, calibrated for ~45-60s
          const increment = Math.random() * 1.5;
          return Math.min(prev + increment, 95);
        });
      }, 500);
    } else if (status === GenerationStatus.SUCCESS) {
      setProgress(100);
    } else if (status === GenerationStatus.IDLE) {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  // Cycle loading messages
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (status === GenerationStatus.LOADING) {
      interval = setInterval(() => {
        setLoadingMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 4000);
    } else {
      setLoadingMsgIndex(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setStatus(GenerationStatus.LOADING);
    setError(null);
    setResult(null);
    setElapsedTime(0);
    setProgress(0);

    try {
      let targetUrl = url;
      if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = 'https://' + targetUrl;
      }

      const data = await generateLLMsTxt(targetUrl);
      setResult(data);
      setStatus(GenerationStatus.SUCCESS);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setStatus(GenerationStatus.ERROR);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="min-h-screen bg-mosaic-bg bg-mosaic-grid text-slate-900 dark:text-white p-4 md:p-6 lg:p-8 flex flex-col items-center transition-colors duration-300">

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-mosaic-tile border border-mosaic-border text-slate-500 hover:text-brand-500 shadow-lg transition-all"
        title="Toggle Theme"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Main Mosaic Container */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min">

        {/* Title Tile - Spans 8 cols */}
        <div className="col-span-1 md:col-span-8 bg-mosaic-tile border border-mosaic-border p-6 md:p-8 rounded-sm relative overflow-hidden group transition-colors duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
            <Hash className="w-32 h-32 text-brand-500" />
          </div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-brand-600 dark:text-brand-400 tracking-widest">
                  A product by <a href="https://system2.co" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-500 transition-colors">system2.co</a>
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white mb-2">
                LLMs.txt <span className="text-slate-400 dark:text-slate-500">Architect</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
                Enterprise-grade Generative Engine Optimization (GEO). Creates exhaustive, verified knowledge maps for AI agents.
              </p>
            </div>
          </div>
        </div>

        {/* System Status Tile - Spans 4 cols */}
        <div className="col-span-1 md:col-span-4 bg-mosaic-tile border border-mosaic-border p-6 rounded-sm flex flex-col justify-between relative overflow-hidden h-full min-h-[160px] transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent dark:from-brand-900/10"></div>

          <div className="relative z-10 w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">System Status</span>
              </div>
              <div className="flex items-center gap-2">
                {status === GenerationStatus.LOADING && (
                  <span className="font-mono text-xs text-brand-500 animate-pulse">{formatTime(elapsedTime)}</span>
                )}
                <div className={`w-2 h-2 rounded-full ${status === GenerationStatus.LOADING ? 'bg-brand-500 animate-pulse' : status === GenerationStatus.SUCCESS ? 'bg-green-500' : 'bg-slate-400 dark:bg-slate-600'}`}></div>
              </div>
            </div>

            {/* Dynamic Status Content */}
            <div className="space-y-4">
              {status === GenerationStatus.IDLE && (
                <div className="text-slate-500 dark:text-slate-400 text-sm font-mono">Ready for deep analysis...</div>
              )}

              {status === GenerationStatus.LOADING && (
                <div className="space-y-3">
                  <div className="text-slate-900 dark:text-white text-lg font-bold animate-pulse leading-tight">
                    {LOADING_MESSAGES[loadingMsgIndex]}
                  </div>
                  {/* Progress Bar Container */}
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-brand-500 transition-all duration-500 ease-out rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-brand-600 dark:text-brand-400 uppercase">
                    <span>Est. Time: ~30-60s (Deep Search Active)</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold">{Math.round(progress)}%</span>
                    </div>
                  </div>
                </div>
              )}

              {status === GenerationStatus.SUCCESS && result?.usageMetadata && (
                <div className="space-y-3">
                  <div className="text-slate-900 dark:text-white text-sm font-semibold flex items-center gap-2">
                    <Database className="w-4 h-4 text-green-600 dark:text-green-500" />
                    <span>Generation Complete in {formatTime(elapsedTime)}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded-sm border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] text-slate-500 font-mono uppercase mb-1">Input</div>
                      <div className="text-xs font-mono text-slate-700 dark:text-white">{result.usageMetadata.promptTokenCount.toLocaleString()}</div>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded-sm border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] text-slate-500 font-mono uppercase mb-1">Output</div>
                      <div className="text-xs font-mono text-brand-600 dark:text-brand-300">{result.usageMetadata.candidatesTokenCount.toLocaleString()}</div>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded-sm border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] text-slate-500 font-mono uppercase mb-1">Total</div>
                      <div className="text-xs font-mono text-slate-700 dark:text-white font-bold">{result.usageMetadata.totalTokenCount.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              )}

              {status === GenerationStatus.ERROR && (
                <div className="text-red-500 dark:text-red-400 text-sm font-mono">Process Failed</div>
              )}
            </div>
          </div>
        </div>

        {/* Input Tile - Spans 12 cols */}
        <div className="col-span-1 md:col-span-12 bg-mosaic-tile border border-mosaic-border p-1 rounded-sm flex flex-col justify-center transition-colors duration-300">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row w-full h-full gap-1">
            <div className="flex-1 bg-slate-100 dark:bg-black/30 flex items-center px-4 py-4 md:py-4 border border-transparent focus-within:border-brand-500/50 transition-colors rounded-sm">
              <Command className="w-5 h-5 text-slate-400 dark:text-slate-500 mr-3" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter target URL (e.g., www.example.com)"
                className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 font-mono text-sm md:text-base"
                disabled={status === GenerationStatus.LOADING}
              />
            </div>
            <button
              type="submit"
              disabled={status === GenerationStatus.LOADING || !url}
              className={`
                px-8 py-4 md:py-0 font-medium text-white transition-all duration-200 flex items-center justify-center space-x-2 rounded-sm uppercase tracking-wider text-sm
                ${status === GenerationStatus.LOADING || !url
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                  : 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-900/20'
                }
              `}
            >
              {status === GenerationStatus.LOADING ? (
                <Loader2 className="w-5 h-5 animate-spin text-slate-500" />
              ) : (
                <>
                  <span>Generate</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error Display */}
        {status === GenerationStatus.ERROR && (
          <div className="col-span-1 md:col-span-12 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 p-4 rounded-sm flex items-center gap-3 text-red-600 dark:text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span className="font-mono text-sm">{error}</span>
          </div>
        )}

        {/* Result Viewer - Takes Full Width when active */}
        {status === GenerationStatus.SUCCESS && result && (
          <div className="col-span-1 md:col-span-12 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3">
                <ResultViewer result={result} />
              </div>
              <div className="lg:col-span-1 flex flex-col gap-4">
                <ImplementationGuide />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Keyframe for progress bar */}
      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

// Helper component icon
const CheckCircle: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default App;