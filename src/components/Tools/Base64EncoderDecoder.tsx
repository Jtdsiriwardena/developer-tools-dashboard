'use client';

import { useState } from 'react';
import { Eye, Play, RotateCcw, AlertCircle, List, EyeOff, Sparkles } from 'lucide-react';

export default function Base64EncoderDecoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  const handleConvert = () => {
    setError(null);
    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
      } else {
        const decoded = decodeURIComponent(escape(atob(input)));
        setOutput(decoded);
      }
    } catch {
      setError('Invalid input for the selected mode.');
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const handleLoadSample = () => {
    setMode('encode');
    setInput('Hello, World!');
    setOutput('');
    setError(null);
  };

  // Metrics
  const inputLength = input.length;
  const outputLength = output.length;
  const modeDisplay = mode === 'encode' ? 'Encoding' : 'Decoding';
  const validOutput = error ? 'Error' : (output ? 'Success' : 'N/A');

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/25">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300">
                  Base64 Encoder/Decoder
                </h1>
                <p className="text-slate-400 mt-1">Encode and decode Base64 easily</p>
              </div>
            </div>
            
            {/* Show/Hide Preview */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/50 text-slate-300 hover:text-white transition-all duration-200"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
          </div>
          </div>

          {/* Metrics */}
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center">
              <div className="text-sm text-slate-400">Mode</div>
              <div className="text-xl font-semibold text-white">{modeDisplay}</div>
            </div>
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center">
              <div className="text-sm text-slate-400">Input Length</div>
              <div className="text-xl font-semibold text-white">{inputLength}</div>
            </div>
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center">
              <div className="text-sm text-slate-400">Output Length</div>
              <div className="text-xl font-semibold text-white">{outputLength}</div>
            </div>
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center">
              <div className="text-sm text-slate-400">Result</div>
              <div className={`text-xl font-semibold ${validOutput === 'Success' ? 'text-emerald-400' : validOutput === 'Error' ? 'text-red-400' : 'text-slate-400'}`}>
                {validOutput}
              </div>
            </div>
          </div>

          

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            {/* Input Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  Base64 Configuration
                </h3>
                <button
              onClick={handleLoadSample}
              className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white transition-all duration-200 border border-slate-600/50"
            >
              Load Sample
            </button>
            </div>

                {/* Mode Selector */}
                <div className="mb-4">
                  <label className="block text-sm text-slate-300 mb-2">Mode</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-white">
                      <input
                        type="radio"
                        name="mode"
                        value="encode"
                        checked={mode === 'encode'}
                        onChange={() => setMode('encode')}
                        className="accent-pink-500"
                      />
                      Encode
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none text-white">
                      <input
                        type="radio"
                        name="mode"
                        value="decode"
                        checked={mode === 'decode'}
                        onChange={() => setMode('decode')}
                        className="accent-pink-500"
                      />
                      Decode
                    </label>
                  </div>
                </div>

                {/* Input */}
                <div className="mb-4">
                  <label className="block text-sm text-slate-300 mb-2">Input</label>
                  <textarea
                    className="w-full resize-none bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white font-mono focus:outline-none"
                    placeholder={mode === 'encode' ? 'Enter text to encode' : 'Enter Base64 string to decode'}
                    rows={6}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 mb-4">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-300">{error}</span>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleConvert}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold rounded-xl shadow-lg"
                  >
                    <Play className="w-4 h-4" /> Convert
                  </button>
                  <button
                    onClick={handleClear}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 font-semibold"
                  >
                    <RotateCcw className="w-4 h-4" /> Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* Output Preview */}
            {showPreview && (
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 flex flex-col">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <List className="w-4 h-4 text-pink-400" /> Preview
                </h3>
                <div className="flex-1 overflow-auto font-mono text-white whitespace-pre-wrap break-words select-text">
                  {!output && !error && (
                    <div className="text-slate-400 text-center select-none">
                      Convert text to see output preview
                    </div>
                  )}
                  {output && <pre>{output}</pre>}
                  {error && <div className="text-red-400 font-semibold text-center">{error}</div>}
                </div>
              </div>
            )}
          </div>

          {/* Pro Tips for Base64 */}
<div className="mt-10 bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
    <Sparkles className="w-4 h-4 text-yellow-400" /> Pro Tips
  </h3>
  <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
      <span>Base64 is ideal for encoding binary data into text format.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
      <span>Always validate input before decoding Base64 strings.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
      <span>Base64 encoding increases data size by ~33%.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
      <span>Encoding is useful for embedding small images or files into text formats like JSON or HTML.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
      <span>Do not use Base64 for secure encryption; it&apos;s simply encoding.</span>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}
