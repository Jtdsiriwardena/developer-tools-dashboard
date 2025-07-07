'use client';

import { useState, useEffect } from 'react';
import { Link as LinkIcon, Play, RotateCcw, AlertCircle, Eye, EyeOff, ClipboardList, Type, ScanText, CheckCircle, Sparkles} from 'lucide-react';

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [stats, setStats] = useState({
    inputLength: 0,
    encodedLength: 0,
    decodedLength: 0
  });

  useEffect(() => {
    setStats({
      inputLength: input.length,
      encodedLength: encoded.length,
      decodedLength: decoded.length
    });
  }, [input, encoded, decoded]);

  const handleEncode = () => {
    try {
      const result = encodeURIComponent(input);
      setEncoded(result);
      setDecoded('');
      setError(null);
    } catch {
      setError('Failed to encode input.');
    }
  };

  const handleDecode = () => {
    try {
      const result = decodeURIComponent(input);
      setDecoded(result);
      setEncoded('');
      setError(null);
    } catch {
      setError('Failed to decode input. Invalid URL encoding.');
    }
  };

  const clearAll = () => {
    setInput('');
    setEncoded('');
    setDecoded('');
    setError(null);
  };

  const loadSample = () => {
    setInput('https://example.com/search?q=hello world&lang=en');
    setEncoded('');
    setDecoded('');
    setError(null);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/25">
                <LinkIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
                  URL Encoder/Decoder
                </h1>
                <p className="text-slate-400 mt-1">Encode and decode URLs</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg border border-slate-600/50 hover:bg-slate-600/50"
              >
                {showPreview ? <EyeOff className="w-4 h-4 inline" /> : <Eye className="w-4 h-4 inline" />}
                {showPreview ? ' Hide Preview' : ' Show Preview'}
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <Type className="w-4 h-4 text-teal-400" />
                <span className="text-xs text-slate-400 uppercase">Input Length</span>
              </div>
              <div className="text-lg font-semibold text-white">{stats.inputLength} chars</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <ScanText className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-slate-400 uppercase">Encoded Length</span>
              </div>
              <div className="text-lg font-semibold text-white">{stats.encodedLength} chars</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-xs text-slate-400 uppercase">Decoded Length</span>
              </div>
              <div className="text-lg font-semibold text-white">{stats.decodedLength} chars</div>
            </div>
          </div>

          <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
            <div className="space-y-6">
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-teal-400" /> URL Tools
                  </h3>
                  <button
                    onClick={loadSample}
                    className="px-3 py-1.5 text-xs bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white border border-slate-600/50"
                  >
                    Load Sample
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-slate-300 mb-2">Input Text</label>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg p-3 border border-slate-700/50 bg-slate-900/50 text-white"
                    placeholder="Enter text or URL here..."
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 mb-4">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-300 font-medium">{error}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleEncode}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-xl shadow-lg"
                  >
                    <Play className="w-4 h-4" /> Encode
                  </button>

                  <button
                    onClick={handleDecode}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-xl shadow-lg"
                  >
                    <Play className="w-4 h-4" /> Decode
                  </button>

                  <button
                    onClick={clearAll}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-700/50 text-slate-300 font-semibold rounded-xl border border-slate-600/50 hover:bg-slate-600/50"
                  >
                    <RotateCcw className="w-4 h-4" /> Clear
                  </button>
                </div>

              </div>
            </div>

            {showPreview && (
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-teal-400" /> Output
                </h3>

                {encoded && (
                  <div className="mb-6">
                    <label className="block text-sm text-slate-300 mb-2">Encoded</label>
                    <div className="border border-slate-700/50 rounded-lg bg-slate-900/50 p-4 text-white font-mono break-all">{encoded}</div>
                  </div>
                )}

                {decoded && (
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Decoded</label>
                    <div className="border border-slate-700/50 rounded-lg bg-slate-900/50 p-4 text-white font-mono break-all">{decoded}</div>
                  </div>
                )}

                {(!encoded && !decoded) && (
                  <div className="text-slate-400 text-center">No output generated yet.</div>
                )}
              </div>
            )}
          </div>
          {/* Pro Tips */}
<div className="mt-8 bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
    <Sparkles className="w-4 h-4 text-yellow-400" /> Pro Tips
  </h3>
  <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
      <span>Use encodeURIComponent to safely encode URL components.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
      <span>Decode only valid encoded strings to avoid errors.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
      <span>Always handle exceptions for malformed input during decode.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
      <span>Use clear button to reset all fields easily during testing.</span>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}
