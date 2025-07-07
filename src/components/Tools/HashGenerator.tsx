'use client';

import { useState, useEffect } from 'react';
import { Hash, Play, RotateCcw, AlertCircle, Eye, EyeOff, ClipboardList, Type, TerminalSquare, CheckCircle, Shield, Sparkles } from 'lucide-react';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<'MD5' | 'SHA1' | 'SHA256' | 'SHA512'>('SHA256');
  const [hash, setHash] = useState('');
  const [showPreview, setShowPreview] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [stats, setStats] = useState({
    length: 0,
    algorithm: 'SHA256',
    status: 'Waiting'
  });

  useEffect(() => {
    setStats({
      length: input.length,
      algorithm,
      status: hash ? 'Generated' : 'Waiting'
    });
  }, [input, algorithm, hash]);

  const generateHash = async () => {
    try {
      setError(null);
      if (!input) {
        setError('Input text is required.');
        return;
      }

      const inputBytes = new TextEncoder().encode(input);

      if (algorithm === 'MD5') {
        const md5 = (await import('crypto-js/md5')).default;
        setHash(md5(input).toString());
      } else {
        const algoMap: Record<string, string> = {
          SHA1: 'SHA-1',
          SHA256: 'SHA-256',
          SHA512: 'SHA-512',
        };
        const algoName = algoMap[algorithm];

        if (!algoName) {
          setHash('Unsupported algorithm');
          return;
        }

        const hashBuffer = await crypto.subtle.digest(algoName, inputBytes);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setHash(hashHex);
      }
    } catch {
      setHash('Error generating hash.');
    }
  };

  const copyToClipboard = () => {
    if (hash) {
      navigator.clipboard.writeText(hash);
    }
  };

  const clearAll = () => {
    setInput('');
    setAlgorithm('SHA256');
    setHash('');
    setError(null);
  };

  const loadSample = () => {
    setInput('The quick brown fox jumps over the lazy dog');
    setAlgorithm('SHA256');
    setHash('');
    setError(null);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Hash className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">
                  Hash Generator
                </h1>
                <p className="text-slate-400 mt-1">Generate various hashes</p>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <Type className="w-4 h-4 text-indigo-400" />
                <span className="text-xs text-slate-400 uppercase">Input Length</span>
              </div>
              <div className="text-lg font-semibold text-white">{stats.length} chars</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <TerminalSquare className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-slate-400 uppercase">Algorithm</span>
              </div>
              <div className="text-lg font-semibold text-white">{stats.algorithm}</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-teal-400" />
                <span className="text-xs text-slate-400 uppercase">Status</span>
              </div>
              <div className="text-lg font-semibold text-white">{stats.status}</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-xs text-slate-400 uppercase">Output</span>
              </div>
              <div className="text-lg font-semibold text-white">{hash ? 'Available' : 'Empty'}</div>
            </div>
          </div>

          <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
            <div className="space-y-6">
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Hash className="w-4 h-4 text-indigo-400" /> Hash Settings
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
                    rows={4}
                    className="w-full rounded-lg p-3 border border-slate-700/50 bg-slate-900/50 text-white"
                    placeholder="Enter text to hash..."
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-slate-300 mb-2">Algorithm</label>
                  <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value as never)}
                    className="w-full rounded-lg p-3 border border-slate-700/50 bg-slate-900/50 text-white"
                  >
                    <option value="MD5">MD5</option>
                    <option value="SHA1">SHA1</option>
                    <option value="SHA256">SHA256</option>
                    <option value="SHA512">SHA512</option>
                  </select>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 mb-4">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-300 font-medium">{error}</span>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={generateHash}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg"
                  >
                    <Play className="w-4 h-4" /> Generate
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
                  <ClipboardList className="w-4 h-4 text-indigo-400" /> Hash Output
                </h3>

                {hash ? (
                  <div className="flex flex-col gap-4">
                    <div className="border border-slate-700/50 rounded-lg bg-slate-900/50 p-4 text-white font-mono break-all">{hash}</div>
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl"
                    >
                      Copy to Clipboard
                    </button>
                  </div>
                ) : (
                  <div className="text-slate-400 text-center">No hash generated yet.</div>
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
      <span>Choose a strong hashing algorithm like SHA-256 or SHA-512 for security.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
      <span>MD5 and SHA1 are faster but not recommended for secure applications.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
      <span>Use hashing to verify data integrity and passwords securely.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
      <span>Always salt passwords before hashing to prevent rainbow table attacks.</span>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}
