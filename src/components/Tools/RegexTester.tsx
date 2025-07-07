'use client';

import { useState, useEffect } from 'react';
import {
  Hash, Play, RotateCcw, AlertCircle, Sparkles,
  Eye, EyeOff, List, Type, Zap, ClipboardList
} from 'lucide-react';

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [stats, setStats] = useState({ patternLength: 0, stringLength: 0, matchesFound: 0, status: 'Empty' });

  const samplePattern = "\\b\\w{4}\\b";
  const sampleFlags = "g";
  const sampleTestString = "This text contains many four word items like test, code, slug, and more.";

  useEffect(() => {
    setStats(prev => ({
      ...prev,
      patternLength: pattern.length,
      stringLength: testString.length,
      matchesFound: matches?.length ?? 0,
      status: error ? 'Error' : (matches === null ? 'Ready' : (matches.length > 0 ? 'Matches Found' : 'No Match'))
    }));
  }, [pattern, testString, matches, error]);

  const handleTest = () => {
    try {
      setError(null);
      const regex = new RegExp(pattern, flags);
      const result = testString.match(regex);
      setMatches(result);
    } catch {
      setError('Invalid regex pattern or flags.');
      setMatches(null);
    }
  };

  const handleClear = () => {
    setPattern('');
    setFlags('g');
    setTestString('');
    setMatches(null);
    setError(null);
  };

  const handleLoadSample = () => {
    setPattern(samplePattern);
    setFlags(sampleFlags);
    setTestString(sampleTestString);
    setMatches(null);
    setError(null);
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                <Hash className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text">Regex Tester</h1>
                <p className="text-slate-400 mt-1">Test & debug regular expressions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">

              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/50 text-slate-300 hover:text-white transition-all duration-200"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1"><Type className="w-4 h-4 text-orange-400" /><span className="text-xs text-slate-400 uppercase">Pattern Length</span></div>
              <div className="text-lg font-semibold text-white">{stats.patternLength}</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1"><Zap className="w-4 h-4 text-yellow-400" /><span className="text-xs text-slate-400 uppercase">Test String Length</span></div>
              <div className="text-lg font-semibold text-white">{stats.stringLength}</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1"><ClipboardList className="w-4 h-4 text-emerald-400" /><span className="text-xs text-slate-400 uppercase">Matches Found</span></div>
              <div className="text-lg font-semibold text-white">{stats.matchesFound}</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1"><Sparkles className="w-4 h-4 text-purple-400" /><span className="text-xs text-slate-400 uppercase">Status</span></div>
              <div className="text-lg font-semibold text-white">{stats.status}</div>
            </div>
          </div>

          <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
            {/* Input Form */}
            <div className="space-y-6">
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    Regex Configuration
                  </h3>
                  <button
                    onClick={handleLoadSample}
                    className="px-3 py-1.5 text-xs bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white transition-all duration-200 border border-slate-600/50"
                  >
                    Load Sample
                  </button>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-slate-300 mb-2">Pattern</label>
                  <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="e.g. \\d+ or ^hello.*world$" className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white font-mono focus:outline-none" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-slate-300 mb-2">Flags</label>
                  <input type="text" value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="g, i, m, s, u, y" className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white font-mono focus:outline-none" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-slate-300 mb-2">Test String</label>
                  <textarea value={testString} onChange={(e) => setTestString(e.target.value)} placeholder="Enter text to test your regex pattern..." className="w-full h-32 bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white font-mono resize-none focus:outline-none" />
                </div>

                {error && <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3"><AlertCircle className="w-5 h-5 text-red-400" /><span className="text-red-300">{error}</span></div>}

                <div className="flex gap-4">
                  <button onClick={handleTest} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl shadow-lg">
                    <Play className="w-4 h-4" /> Test Regex
                  </button>
                  <button onClick={handleClear} className="flex items-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-xl text-red-400 font-semibold">
                    <RotateCcw className="w-4 h-4" /> Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* Preview */}
            {showPreview && (
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><List className="w-4 h-4 text-orange-400" /> Preview</h3>
                {matches === null ? <div className="text-slate-400">Run test to see results</div> : (
                  matches.length > 0 ? (
                    <div className="space-y-2">{matches.map((match, idx) => <div key={idx} className="bg-slate-900/50 border border-slate-700/30 p-3 rounded-lg font-mono text-white">{match}</div>)}</div>
                  ) : <div className="text-slate-400">No matches found</div>
                )}
              </div>
            )}
          </div>

          {/* Pro Tips */}
          <div className="mt-8 bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-yellow-400" /> Pro Tips</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="flex gap-2 items-start"><div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div><span>Use \b to match word boundaries precisely.</span></div>
              <div className="flex gap-2 items-start"><div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div><span>Use non-capturing groups (?:...) when you don&apos;t need to capture.</span></div>
              <div className="flex gap-2 items-start"><div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div><span>The &apos;g&apos; flag allows finding multiple matches instead of just first.</span></div>
              <div className="flex gap-2 items-start"><div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div><span>Escape special characters with double backslashes (\\).</span></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
