'use client';

import { useState } from 'react';
import { Globe, Play, RotateCcw, AlertCircle, List, Eye, EyeOff,Sparkles } from 'lucide-react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export default function ApiTester() {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [headers, setHeaders] = useState<string>('{}');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  const handleLoadSample = () => {
    setUrl('https://jsonplaceholder.typicode.com/posts');
    setMethod('GET');
    setHeaders('{}');
    setBody('');
    setResponse(null);
    setStatus(null);
    setError(null);
  };

  const handleSend = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    setStatus(null);

    let parsedHeaders = {};
    try {
      parsedHeaders = JSON.parse(headers);
    } catch {
      setError('Headers must be valid JSON.');
      setLoading(false);
      return;
    }

    let parsedBody = null;
    if (method !== 'GET' && body.trim()) {
      try {
        parsedBody = JSON.parse(body);
      } catch {
        setError('Body must be valid JSON.');
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...parsedHeaders,
        },
        body: method === 'GET' ? undefined : JSON.stringify(parsedBody),
      });

      const text = await res.text();
      setStatus(res.status);

      try {
        const json = JSON.parse(text);
        setResponse(JSON.stringify(json, null, 2));
      } catch {
        setResponse(text);
      }
    } catch {
      setError('Network error or invalid URL.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUrl('');
    setMethod('GET');
    setHeaders('{}');
    setBody('');
    setResponse(null);
    setStatus(null);
    setError(null);
  };

  const urlLength = url.length;
  let headersCount = 0;
  try {
    headersCount = Object.keys(JSON.parse(headers)).length;
  } catch {}
  const responseStatus = status !== null ? status : 'N/A';

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text">
                  API Tester
                </h1>
                <p className="text-slate-400 mt-1">Test API endpoints</p>
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

          {/* Metrics */}
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center">
              <div className="text-sm text-slate-400">HTTP Method</div>
              <div className="text-xl font-semibold text-white">{method}</div>
            </div>
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center">
              <div className="text-sm text-slate-400">URL Length</div>
              <div className="text-xl font-semibold text-white">{urlLength}</div>
            </div>
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center">
              <div className="text-sm text-slate-400">Headers Count</div>
              <div className="text-xl font-semibold text-white">{headersCount}</div>
            </div>
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center">
              <div className="text-sm text-slate-400">Response Status</div>
              <div className={`text-xl font-semibold ${status && status >= 200 && status < 300 ? 'text-emerald-400' : 'text-red-400'}`}>
                {responseStatus}
              </div>
            </div>
          </div>

          

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            {/* Input Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  API Configuration
                </h3>
                 <button
                    onClick={handleLoadSample}
                    className="px-3 py-1.5 text-xs bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white transition-all duration-200 border border-slate-600/50"
                  >
                    Load Sample
                  </button>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-slate-300 mb-2">URL</label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://api.example.com/data"
                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white font-mono focus:outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-slate-300 mb-2">Method</label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value as HttpMethod)}
                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white font-mono focus:outline-none"
                  >
                    <option>GET</option>
                    <option>POST</option>
                    <option>PUT</option>
                    <option>DELETE</option>
                    <option>PATCH</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-slate-300 mb-2">Headers (JSON)</label>
                  <textarea
                    value={headers}
                    onChange={(e) => setHeaders(e.target.value)}
                    placeholder='{"Authorization": "Bearer TOKEN"}'
                    className="w-full h-28 bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white font-mono resize-none focus:outline-none"
                  />
                </div>

                {method !== 'GET' && (
                  <div className="mb-4">
                    <label className="block text-sm text-slate-300 mb-2">Body (JSON)</label>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder='{"key": "value"}'
                      className="w-full h-32 bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white font-mono resize-none focus:outline-none"
                    />
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-300">{error}</span>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={handleSend}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg disabled:opacity-60"
                  >
                    <Play className="w-4 h-4" /> {loading ? 'Sending...' : 'Send Request'}
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

            {/* Response Preview */}
            {showPreview && (
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 flex flex-col">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <List className="w-4 h-4 text-cyan-400" /> Response
                </h3>
                <div className="flex-1 overflow-auto">
                  {!response && !error && (
                    <div className="text-slate-400 text-center select-none">
                      Send request to see response
                    </div>
                  )}
                  {response && (
                    <pre className="whitespace-pre-wrap font-mono text-white text-sm">
                      {response}
                    </pre>
                  )}
                  {error && (
                    <div className="text-red-400 font-semibold text-center">{error}</div>
                  )}
                  {status !== null && (
                    <div className="mt-4 text-cyan-400 font-semibold text-center">
                      Status: {status}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

         {/* Pro Tips Section */}
<div className="mt-10 bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
    <Sparkles className="w-4 h-4 text-yellow-400" /> Pro Tips
  </h3>
  <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
      <span>Use correct HTTP methods based on the API documentation.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
      <span>Validate headers and request body format before sending.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
      <span>Pay attention to response status codes for debugging issues.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
      <span>Test both successful and failed requests for better coverage.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
      <span>Use sample APIs like JSONPlaceholder for safe testing during development.</span>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}
