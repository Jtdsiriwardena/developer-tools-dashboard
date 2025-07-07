'use client';

import { useState, useEffect } from 'react';
import { Lock, Play, RotateCcw, AlertCircle, Eye, EyeOff, Type, Zap, Sparkles, ClipboardList, ShieldCheck } from 'lucide-react';

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [showPreview, setShowPreview] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    length: 0,
    complexity: 'Weak',
    charset: 0
  });

  useEffect(() => {
    let charsetCount = 0;
    if (includeUpper) charsetCount++;
    if (includeLower) charsetCount++;
    if (includeNumbers) charsetCount++;
    if (includeSymbols) charsetCount++;

    let complexity = 'Weak';
    if (charsetCount >= 3 && length >= 12) complexity = 'Strong';
    else if (charsetCount >= 2 && length >= 8) complexity = 'Moderate';

    setStats({
      length,
      complexity,
      charset: charsetCount
    });
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  const generatePassword = () => {
    setError(null);
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?/';

    let characters = '';
    if (includeUpper) characters += upper;
    if (includeLower) characters += lower;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    if (!characters) {
      setError('Please select at least one character set.');
      return;
    }

    let generated = '';
    for (let i = 0; i < length; i++) {
      const randIndex = Math.floor(Math.random() * characters.length);
      generated += characters[randIndex];
    }
    setPassword(generated);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
    }
  };

  const clearAll = () => {
    setLength(16);
    setIncludeUpper(true);
    setIncludeLower(true);
    setIncludeNumbers(true);
    setIncludeSymbols(true);
    setPassword('');
    setError(null);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25">
                <Lock className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-300">
                  Password Generator
                </h1>
                <p className="text-slate-400 mt-1">Generate secure passwords</p>
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
                <Type className="w-4 h-4 text-red-400" />
                <span className="text-xs text-slate-400 uppercase">Length</span>
              </div>
              <div className="text-lg font-semibold text-white">{stats.length}</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-slate-400 uppercase">Charset</span>
              </div>
              <div className="text-lg font-semibold text-white">{stats.charset} sets</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-slate-400 uppercase">Strength</span>
              </div>
              <div className="text-lg font-semibold text-white">{stats.complexity}</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400 uppercase">Status</span>
              </div>
              <div className="text-lg font-semibold text-white">{password ? 'Generated' : 'Empty'}</div>
            </div>
          </div>

          <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
            <div className="space-y-6">
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                  <Lock className="w-4 h-4 text-red-400" /> Settings
                </h3>

                <div className="mb-4">
                  <label className="block text-sm text-slate-300 mb-2">Password Length: {length}</label>
                  <input
                    type="range"
                    min="4"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="mb-4 grid grid-cols-2 gap-2 text-slate-300">
                  <label className="flex gap-2 items-center">
                    <input type="checkbox" checked={includeUpper} onChange={() => setIncludeUpper(!includeUpper)} />
                    Uppercase
                  </label>
                  <label className="flex gap-2 items-center">
                    <input type="checkbox" checked={includeLower} onChange={() => setIncludeLower(!includeLower)} />
                    Lowercase
                  </label>
                  <label className="flex gap-2 items-center">
                    <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
                    Numbers
                  </label>
                  <label className="flex gap-2 items-center">
                    <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
                    Symbols
                  </label>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 mb-4">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-300 font-medium">{error}</span>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={generatePassword}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg"
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
                  <ClipboardList className="w-4 h-4 text-red-400" /> Generated Password
                </h3>

                {password ? (
                  <div className="flex flex-col gap-4">
                    <div className="border border-slate-700/50 rounded-lg bg-slate-900/50 p-4 text-white font-mono break-all">{password}</div>
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl"
                    >
                      Copy to Clipboard
                    </button>
                  </div>
                ) : (
                  <div className="text-slate-400 text-center">No password generated yet.</div>
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
      <span>Use a mix of uppercase, lowercase, numbers, and symbols for strong passwords.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
      <span>Longer passwords are generally more secure than shorter ones.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
      <span>Avoid using easily guessable patterns or common words.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
      <span>Regularly update your passwords and avoid reuse across sites.</span>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}
