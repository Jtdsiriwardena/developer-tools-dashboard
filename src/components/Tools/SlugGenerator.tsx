'use client';

import { useState, useEffect } from 'react';
import { 
  Link, 
  Copy, 
  Download, 
  Wand2, 
  Trash2, 
  CheckCircle, 
  Type,
  Sparkles,
  Zap,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Hash,
  Globe,
  Settings
} from 'lucide-react';
import slugify from 'slugify';

export default function SlugGenerator() {
  const [text, setText] = useState('');
  const [slug, setSlug] = useState('');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [stats, setStats] = useState({ chars: 0, words: 0, slugLength: 0 });
  const [options, setOptions] = useState({
    lower: true,
    strict: true,
    replacement: '-'
  });

  // Sample text for demonstration
  const sampleText = "Hello World! This is a Sample Text for URL Slug Generation & Testing 123";

  // Update stats when text or slug changes
  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    setStats({
      chars: text.length,
      words: words,
      slugLength: slug.length
    });
  }, [text, slug]);

  const generateSlug = async () => {
    if (!text.trim()) {
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time for smooth animation
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      const result = slugify(text, {
        lower: options.lower,
        strict: options.strict,
        replacement: options.replacement
      });
      setSlug(result);
    } catch (error) {
      console.error('Error generating slug:', error);
    }
    
    setIsProcessing(false);
  };

  const handleClear = () => {
    setText('');
    setSlug('');
    setStats({ chars: 0, words: 0, slugLength: 0 });
  };

  const handleCopy = async () => {
    if (slug) {
      await navigator.clipboard.writeText(slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (slug) {
      const content = `Original Text: ${text}\nGenerated Slug: ${slug}\nGenerated on: ${new Date().toLocaleString()}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'slug-generation.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleLoadSample = () => {
    setText(sampleText);
  };

  const previewUrl = slug ? `https://example.com/${slug}` : 'https://example.com/your-slug-here';

  return (
    <div className="flex-1 overflow-auto">
      <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Link className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text">
                    Slug Generator
                  </h1>
                  <p className="text-slate-400 mt-1">Transform text into SEO-friendly URL slugs</p>
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
                  <Type className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-slate-400 uppercase tracking-wide">Characters</span>
                </div>
                <div className="text-lg font-semibold text-white">{stats.chars.toLocaleString()}</div>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-slate-400 uppercase tracking-wide">Words</span>
                </div>
                <div className="text-lg font-semibold text-white">{stats.words.toLocaleString()}</div>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center gap-2 mb-1">
                  <Hash className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-slate-400 uppercase tracking-wide">Slug Length</span>
                </div>
                <div className="text-lg font-semibold text-white">{stats.slugLength}</div>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-slate-400 uppercase tracking-wide">Status</span>
                </div>
                <div className="text-lg font-semibold text-white">
                  {slug ? 'Generated' : text ? 'Ready' : 'Empty'}
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
                  <Type className="w-4 h-4 text-blue-400" />
                  Input Text
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
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your text to convert into a URL slug..."
                  className="w-full h-32 bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm resize-none"
                  spellCheck={false}
                />
                
                {/* Options */}
                <div className="mt-4 p-4 bg-slate-900/30 rounded-xl border border-slate-700/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-300">Generation Options</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-2 text-sm text-slate-300">
                      <input
                        type="checkbox"
                        checked={options.lower}
                        onChange={(e) => setOptions(prev => ({ ...prev, lower: e.target.checked }))}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500/20"
                      />
                      Lowercase
                    </label>
                    
                    <label className="flex items-center gap-2 text-sm text-slate-300">
                      <input
                        type="checkbox"
                        checked={options.strict}
                        onChange={(e) => setOptions(prev => ({ ...prev, strict: e.target.checked }))}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500/20"
                      />
                      Strict Mode
                    </label>
                  </div>
                  
                  <div className="mt-3">
                    <label className="block text-sm text-slate-300 mb-1">Replacement Character</label>
                    <select
                      value={options.replacement}
                      onChange={(e) => setOptions(prev => ({ ...prev, replacement: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500/50"
                    >
                      <option value="-">Hyphen (-)</option>
                      <option value="_">Underscore (_)</option>
                      <option value=".">Dot (.)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Output Section */}
            {showPreview && (
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Hash className="w-4 h-4 text-purple-400" />
                    Generated Slug
                  </h3>
                  
                  {slug && (
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
                  {slug ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Generated Slug</label>
                        <input
                          value={slug}
                          readOnly
                          className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-white font-mono text-sm focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label className=" text-sm text-slate-400 mb-2 flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          URL Preview
                        </label>
                        <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                          <div className="text-slate-300 font-mono text-sm break-all">
                            {previewUrl}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 flex items-center justify-center text-slate-500 border border-slate-700/50 rounded-xl bg-slate-900/30">
                      <div className="text-center">
                        <Hash className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Generated slug will appear here</p>
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
                onClick={generateSlug}
                disabled={isProcessing || !text.trim()}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Generate Slug
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

            {/* Success Indicator */}
            {slug && (
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Slug generated successfully!</span>
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
                <span>Lowercase slugs are more SEO-friendly and consistent</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Strict mode removes special characters for cleaner URLs</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Hyphens are preferred over underscores for URL slugs</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Keep slugs concise but descriptive for better SEO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}