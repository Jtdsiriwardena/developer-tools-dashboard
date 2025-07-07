'use client';

import { useState, useEffect } from 'react';
import { Clock, RotateCcw, AlertCircle, Eye, EyeOff, Type, Zap, Sparkles, ClipboardList, List } from 'lucide-react';

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [datetime, setDatetime] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [mode, setMode] = useState<'To Date' | 'To Timestamp'>('To Date');
  const [stats, setStats] = useState({
    timestampLength: 0,
    datetimeLength: 0,
    status: 'Empty',
    mode: 'To Date'
  });

  const sampleTimestamp = '1718932800';
  const sampleDatetime = '2025-06-20T15:00:00.000Z';

  useEffect(() => {
    setStats({
      timestampLength: timestamp.length,
      datetimeLength: datetime.length,
      status: error ? 'Error' : (timestamp || datetime ? 'Ready' : 'Empty'),
      mode
    });
  }, [timestamp, datetime, error, mode]);

  const convertToDate = () => {
    setError(null);
    try {
      const ts = parseInt(timestamp);
      if (isNaN(ts)) throw new Error('Invalid timestamp');
      const date = new Date(ts * 1000);
      setDatetime(date.toISOString());
      setMode('To Date');
    } catch {
      setError('Please enter a valid UNIX timestamp.');
    }
  };

  const convertToTimestamp = () => {
    setError(null);
    try {
      const date = new Date(datetime);
      if (isNaN(date.getTime())) throw new Error('Invalid date');
      setTimestamp(Math.floor(date.getTime() / 1000).toString());
      setMode('To Timestamp');
    } catch {
      setError('Please enter a valid ISO date.');
    }
  };

  const clearAll = () => {
    setTimestamp('');
    setDatetime('');
    setError(null);
  };

  const loadSample = () => {
    setTimestamp(sampleTimestamp);
    setDatetime(sampleDatetime);
    setError(null);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-500 to-gray-600 rounded-xl flex items-center justify-center shadow-lg shadow-slate-500/25">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-gray-300">
                  Timestamp Converter
                </h1>
                <p className="text-slate-400 mt-1">Convert UNIX timestamp ↔ ISO Date</p>
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
              <div className="flex items-center gap-2 mb-1"><Type className="w-4 h-4 text-slate-400" /><span className="text-xs text-slate-400 uppercase">Timestamp Length</span></div>
              <div className="text-lg font-semibold text-white">{stats.timestampLength}</div>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1"><Zap className="w-4 h-4 text-yellow-400" /><span className="text-xs text-slate-400 uppercase">Datetime Length</span></div>
              <div className="text-lg font-semibold text-white">{stats.datetimeLength}</div>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1"><Sparkles className="w-4 h-4 text-purple-400" /><span className="text-xs text-slate-400 uppercase">Status</span></div>
              <div className="text-lg font-semibold text-white">{stats.status}</div>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1"><ClipboardList className="w-4 h-4 text-emerald-400" /><span className="text-xs text-slate-400 uppercase">Mode</span></div>
              <div className="text-lg font-semibold text-white">{stats.mode}</div>
            </div>
          </div>

          <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
            <div className="space-y-6">
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" /> Conversion
                  </h3>

                  <button
                    onClick={loadSample}
                    className="px-3 py-1.5 text-xs bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white border border-slate-600/50"
                  >
                    Load Sample
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-slate-300 mb-2">UNIX Timestamp (seconds)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={timestamp}
                      onChange={(e) => setTimestamp(e.target.value)}
                      placeholder="e.g. 1718932800"
                      className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white font-mono"
                    />
                    <button
                      onClick={convertToDate}
                      className="px-4 py-2 bg-gradient-to-r from-slate-500 to-gray-600 text-white font-semibold rounded-xl"
                    >
                      To Date
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-slate-300 mb-2">Date/Time (ISO)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={datetime}
                      onChange={(e) => setDatetime(e.target.value)}
                      placeholder="e.g. 2025-06-20T15:00:00.000Z"
                      className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white font-mono"
                    />
                    <button
                      onClick={convertToTimestamp}
                      className="px-4 py-2 bg-gradient-to-r from-slate-500 to-gray-600 text-white font-semibold rounded-xl"
                    >
                      To Timestamp
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-300 font-medium">{error}</span>
                  </div>
                )}

                <div className="flex gap-4">
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
                  <List className="w-4 h-4 text-slate-400" /> Preview
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-400">UNIX Timestamp</h4>
                    <pre className="whitespace-pre-wrap font-mono text-white text-sm">{timestamp || '—'}</pre>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-400">Datetime</h4>
                    <pre className="whitespace-pre-wrap font-mono text-white text-sm">{datetime || '—'}</pre>
                  </div>
                </div>
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
      <span>UNIX timestamps are usually in seconds, but JavaScript uses milliseconds.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
      <span>Always check for timezone differences when converting dates.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
      <span>ISO 8601 is a standardized date format (e.g., 2025-06-21T19:00:00Z).</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
      <span>Invalid date input can cause errors—validate before converting.</span>
    </div>
  </div>
</div>


        </div>
      </div>
    </div>
  );
}
