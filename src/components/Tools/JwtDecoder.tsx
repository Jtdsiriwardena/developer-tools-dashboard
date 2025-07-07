'use client';

import { useState, useEffect } from 'react';
import { Shield, Play, RotateCcw, AlertCircle, List, Type, Zap, Sparkles, ClipboardList, Eye, EyeOff } from 'lucide-react';

// Helper function to decode Base64Url
function base64UrlDecode(str: string) {
  try {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
      str += '=';
    }
    const decoded = atob(str);
    return decodeURIComponent(
      decoded
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    return null;
  }
}

export default function JwtDecoder() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState<string | null>(null);
  const [payload, setPayload] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [stats, setStats] = useState({
    tokenLength: 0,
    payloadSize: 0,
    expStatus: 'Unknown',
    timeLeft: '-',
  });

  // Sample JWT (dummy, unsigned, for demo purpose)
  const sampleToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxOTk5OTk5OTk5fQ.' +
    'dummy-signature';

  useEffect(() => {
    setStats((prev) => ({
      ...prev,
      tokenLength: token.length,
      payloadSize: payload ? payload.length : 0,
    }));

    if (payload) {
      try {
        const obj = JSON.parse(payload);
        const exp = obj.exp;
        if (exp) {
          const now = Math.floor(Date.now() / 1000);
          if (exp < now) {
            setStats((prev) => ({ ...prev, expStatus: 'Expired', timeLeft: '-' }));
          } else {
            const left = exp - now;
            setStats((prev) => ({ ...prev, expStatus: 'Valid', timeLeft: `${left}s` }));
          }
        } else {
          setStats((prev) => ({ ...prev, expStatus: 'No Exp', timeLeft: '-' }));
        }
      } catch {
        setStats((prev) => ({ ...prev, expStatus: 'Error', timeLeft: '-' }));
      }
    } else {
      setStats((prev) => ({ ...prev, expStatus: 'Unknown', timeLeft: '-' }));
    }
  }, [token, payload]);

  const decodeToken = () => {
    setError(null);
    setHeader(null);
    setPayload(null);

    if (!token) {
      setError('Please enter a JWT token.');
      return;
    }

    const parts = token.replace(/\s/g, '').split('.');
    if (parts.length !== 3) {
      setError('Invalid JWT format. Token must have 3 parts separated by dots.');
      return;
    }

    const [headerB64, payloadB64] = parts;

    const decodedHeader = base64UrlDecode(headerB64);
    const decodedPayload = base64UrlDecode(payloadB64);

    if (!decodedHeader || !decodedPayload) {
      setError('Failed to decode JWT parts. Invalid Base64 encoding.');
      return;
    }

    try {
      setHeader(JSON.stringify(JSON.parse(decodedHeader), null, 2));
      setPayload(JSON.stringify(JSON.parse(decodedPayload), null, 2));
    } catch {
      setError('Failed to parse JWT JSON.');
    }
  };

  const clearAll = () => {
    setToken('');
    setHeader(null);
    setPayload(null);
    setError(null);
  };

  const loadSample = () => {
    setToken(sampleToken);
    setHeader(null);
    setPayload(null);
    setError(null);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">
                  JWT Decoder
                </h1>
                <p className="text-slate-400 mt-1">Decode JWT tokens</p>
              </div>
            </div>

            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/50 text-slate-300 hover:text-white transition-all duration-200"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <Type className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-slate-400 uppercase">Token Length</span>
              </div>
              <div className="text-lg font-semibold text-white">{stats.tokenLength}</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-slate-400 uppercase">Payload Size</span>
              </div>
              <div className="text-lg font-semibold text-white">{stats.payloadSize}</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <ClipboardList className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400 uppercase">Expiration</span>
              </div>
              <div className="text-lg font-semibold text-white">{stats.expStatus}</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-slate-400 uppercase">Time Left</span>
              </div>
              <div className="text-lg font-semibold text-white">{stats.timeLeft}</div>
            </div>
          </div>

          {/* Form */}
          <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
            <div className="space-y-6">
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-400" /> JWT Token
                  </h3>

                  <button
                    onClick={loadSample}
                    className="px-3 py-1.5 text-xs bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white border border-slate-600/50"
                  >
                    Load Sample
                  </button>
                </div>

                <textarea
                  id="token"
                  rows={6}
                  className="w-full resize-none bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                  placeholder="Paste your JWT token here"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />

                {error && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-300 font-medium">{error}</span>
                  </div>
                )}

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={decodeToken}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg"
                  >
                    <Play className="w-4 h-4" /> Decode
                  </button>
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-700/50 text-slate-300 font-semibold rounded-xl hover:bg-slate-600/50 border border-slate-600/50"
                  >
                    <RotateCcw className="w-4 h-4" /> Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Preview */}
            {showPreview && (
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <List className="w-4 h-4 text-amber-400" /> Preview
                </h3>

                {!header && !payload ? (
                  <div className="text-slate-400 text-center">Decode a JWT token to see the content</div>
                ) : (
                  <>
                    <div className="mb-4">
                      <h4 className="font-semibold text-amber-400">Header</h4>
                      <pre className="whitespace-pre-wrap font-mono text-white text-sm">{header}</pre>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-400">Payload</h4>
                      <pre className="whitespace-pre-wrap font-mono text-white text-sm">{payload}</pre>
                    </div>
                  </>
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
                <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                <span>JWT tokens consist of header, payload and signature separated by dots.</span>
              </div>
              <div className="flex gap-2 items-start">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                <span>Always verify the signature when using JWTs for authentication.</span>
              </div>
              <div className="flex gap-2 items-start">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
                <span>Use Base64Url encoding to safely encode JWT parts.</span>
              </div>
              <div className="flex gap-2 items-start">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                <span>Check &apos;exp&apos; claim to know when token expires.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
