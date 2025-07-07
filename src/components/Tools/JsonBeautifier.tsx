'use client';

import { useState, useEffect } from 'react';
import { 
  Code, 
  Copy, 
  Download, 
  Upload, 
  Wand2, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Sparkles,
  Zap,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2
} from 'lucide-react';

export default function JsonBeautifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ size: 0, lines: 0, objects: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  // Sample JSON for demonstration
  const sampleJson = `{"name":"John Doe","age":30,"city":"New York","hobbies":["reading","coding","traveling"],"address":{"street":"123 Main St","zipCode":"10001"},"isActive":true}`;

  // Update stats when input changes
  useEffect(() => {
    if (input) {
      try {
        const parsed = JSON.parse(input);
        const jsonString = JSON.stringify(parsed);
        setStats({
          size: new Blob([jsonString]).size,
          lines: input.split('\n').length,
          objects: (jsonString.match(/{/g) || []).length
        });
      } catch {
        setStats({ size: input.length, lines: input.split('\n').length, objects: 0 });
      }
    } else {
      setStats({ size: 0, lines: 0, objects: 0 });
    }
  }, [input]);

  const handleBeautify = async () => {
    if (!input.trim()) {
      setError('Please enter some JSON to beautify');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time for smooth animation
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setOutput(pretty);
      setError(null);
    } catch {
      setError('Invalid JSON format. Please check your syntax and try again.');
      setOutput('');
    }
    
    setIsProcessing(false);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
    setStats({ size: 0, lines: 0, objects: 0 });
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (output) {
      const blob = new Blob([output], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'beautified.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleLoadSample = () => {
    setInput(sampleJson);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex-1 overflow-auto">
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <Code className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text">
                  JSON Beautifier
                </h1>
                <p className="text-slate-400 mt-1">Format and validate your JSON with precision</p>
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
              
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/50 text-slate-300 hover:text-white transition-all duration-200"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wide">Size</span>
              </div>
              <div className="text-lg font-semibold text-white">{formatBytes(stats.size)}</div>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wide">Lines</span>
              </div>
              <div className="text-lg font-semibold text-white">{stats.lines.toLocaleString()}</div>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <Code className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wide">Objects</span>
              </div>
              <div className="text-lg font-semibold text-white">{stats.objects}</div>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wide">Status</span>
              </div>
              <div className="text-lg font-semibold text-white">
                {error ? 'Invalid' : input ? 'Ready' : 'Empty'}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Input Section */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-blue-400" />
                Input JSON
              </h3>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLoadSample}
                  className="px-3 py-1.5 text-xs bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white transition-all duration-200 border border-slate-600/50"
                >
                  Load Sample
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here..."
                className="w-full h-64 bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 font-mono text-sm resize-none"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Output Section */}
          {showPreview && (
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Beautified JSON
                </h3>
                
                {output && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white transition-all duration-200 border border-slate-600/50"
                    >
                      {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white transition-all duration-200 border border-slate-600/50"
                    >
                      <Download className="w-3 h-3" />
                      Download
                    </button>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                {output ? (
                  <textarea
                    value={output}
                    readOnly
                    className="w-full h-64 bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-white font-mono text-sm resize-none focus:outline-none"
                  />
                ) : (
                  <div className="h-64 flex items-center justify-center text-slate-500 border border-slate-700/50 rounded-xl bg-slate-900/30">
                    <div className="text-center">
                      <Code className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Beautified JSON will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBeautify}
              disabled={isProcessing}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-slate-600 disabled:to-slate-700 rounded-xl text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Beautify JSON
                </>
              )}
            </button>
            
            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 hover:border-red-500/70 rounded-xl text-red-400 hover:text-red-300 font-semibold transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {/* Success Indicator */}
          {output && !error && (
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-400">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">JSON successfully beautified!</span>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            Pro Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Use the sample JSON to test the beautifier functionality</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Copy the beautified JSON directly to your clipboard</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Download the formatted JSON as a .json file</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Toggle fullscreen mode for better workspace visibility</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}