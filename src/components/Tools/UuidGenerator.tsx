'use client';

import { useState, useEffect } from 'react';
import {
  Key,
  Copy,
  Download,
  RefreshCw,
  Trash2,
  CheckCircle,
  Hash,
  Sparkles,
  Zap,
  Clock,
  Shield,
  List,
  Settings,
  Eye,
  EyeOff,
  Plus,
  Minus
} from 'lucide-react';
import { v4 as uuidv4, v1 as uuidv1 } from 'uuid';

interface UuidItem {
  id: string;
  uuid: string;
  type: string;
  timestamp: Date;
}

export default function UuidGenerator() {
  const [currentUuid, setCurrentUuid] = useState<string>('');
  const [uuidHistory, setUuidHistory] = useState<UuidItem[]>([]);
  const [selectedType, setSelectedType] = useState<'v4' | 'v1'>('v4');
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(true);
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [stats, setStats] = useState({ total: 0, v4Count: 0, v1Count: 0 });
  const [showPreview, setShowPreview] = useState(true);


  const uuidTypes = [
    {
      value: 'v4' as const,
      label: 'UUID v4',
      description: 'Random UUID (most common)',
      icon: Hash,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      value: 'v1' as const,
      label: 'UUID v1',
      description: 'Time-based UUID',
      icon: Clock,
      color: 'from-purple-500 to-violet-600'
    }
  ];

  // Auto-generate UUID on mount
  useEffect(() => {
    generateSingleUuid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-generate interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoGenerate) {
      interval = setInterval(() => {
        generateSingleUuid();
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  });

  // Update stats when history changes
  useEffect(() => {
    const v4Count = uuidHistory.filter(item => item.type === 'v4').length;
    const v1Count = uuidHistory.filter(item => item.type === 'v1').length;
    setStats({
      total: uuidHistory.length,
      v4Count,
      v1Count
    });
  }, [uuidHistory]);

  const generateUuid = (type: 'v4' | 'v1' = selectedType): string => {
    return type === 'v4' ? uuidv4() : uuidv1();
  };

  const generateSingleUuid = () => {
    const newUuid = generateUuid(selectedType);
    setCurrentUuid(newUuid);

    const newItem: UuidItem = {
      id: uuidv4(),
      uuid: newUuid,
      type: selectedType,
      timestamp: new Date()
    };

    setUuidHistory(prev => [newItem, ...prev.slice(0, 49)]); // Keep last 50
  };

  const generateMultipleUuids = () => {
    const newUuids: UuidItem[] = [];
    for (let i = 0; i < quantity; i++) {
      const newUuid = generateUuid(selectedType);
      newUuids.push({
        id: uuidv4(),
        uuid: newUuid,
        type: selectedType,
        timestamp: new Date()
      });
    }

    if (newUuids.length > 0) {
      setCurrentUuid(newUuids[0].uuid);
      setUuidHistory(prev => [...newUuids, ...prev].slice(0, 50));
    }
  };

  const handleCopy = async (uuid: string) => {
    await navigator.clipboard.writeText(uuid);
    setCopied(uuid);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = () => {
    if (uuidHistory.length === 0) return;

    const content = uuidHistory.map(item =>
      `${item.uuid} (${item.type.toUpperCase()}) - ${item.timestamp.toLocaleString()}`
    ).join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uuids.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setCurrentUuid('');
    setUuidHistory([]);
  };

  const removeFromHistory = (id: string) => {
    setUuidHistory(prev => prev.filter(item => item.id !== id));
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Key className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text">
                    UUID Generator
                  </h1>
                  <p className="text-slate-400 mt-1">Generate unique identifiers with advanced options</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/50 text-slate-300 hover:text-white transition-all duration-200"
                >
                  {showHistory ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showHistory ? 'Hide History' : 'Show History'}
                </button>

                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/50 text-slate-300 hover:text-white transition-all duration-200"
                >
                  {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-slate-400 uppercase tracking-wide">Total</span>
                </div>
                <div className="text-lg font-semibold text-white">{stats.total}</div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center gap-2 mb-1">
                  <Hash className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-slate-400 uppercase tracking-wide">UUID v4</span>
                </div>
                <div className="text-lg font-semibold text-white">{stats.v4Count}</div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-slate-400 uppercase tracking-wide">UUID v1</span>
                </div>
                <div className="text-lg font-semibold text-white">{stats.v1Count}</div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-slate-400 uppercase tracking-wide">Auto Gen</span>
                </div>
                <div className="text-lg font-semibold text-white">
                  {autoGenerate ? 'ON' : 'OFF'}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={`grid gap-6 ${showHistory ? 'lg:grid-cols-3' : 'grid-cols-1'}`}>
            {/* Generator Section */}
            <div className={`${showHistory ? 'lg:col-span-2' : 'col-span-1'} space-y-6`}>
              {/* UUID Type Selection */}
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-blue-400" />
                  UUID Configuration
                </h3>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {uuidTypes.map((type) => {
                    const IconComponent = type.icon;
                    const isSelected = selectedType === type.value;

                    return (
                      <button
                        key={type.value}
                        onClick={() => setSelectedType(type.value)}
                        className={`
                        p-4 rounded-xl border transition-all duration-200 text-left
                        ${isSelected
                            ? 'border-blue-500/50 bg-blue-500/10'
                            : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50'
                          }
                      `}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${type.color}`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{type.label}</div>
                            <div className="text-xs text-slate-400">{type.description}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Quantity and Auto-generate */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg border border-slate-600/50 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                        className="flex-1 bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white text-center focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        min="1"
                        max="50"
                      />
                      <button
                        onClick={() => setQuantity(Math.min(50, quantity + 1))}
                        className="w-8 h-8 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg border border-slate-600/50 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Auto Generate
                    </label>
                    <button
                      onClick={() => setAutoGenerate(!autoGenerate)}
                      className={`
                      w-full px-4 py-2 rounded-lg border transition-all duration-200 flex items-center justify-center gap-2
                      ${autoGenerate
                          ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-400'
                          : 'border-slate-700/50 bg-slate-800/30 text-slate-300 hover:border-slate-600/50'
                        }
                    `}
                    >
                      <Zap className="w-4 h-4" />
                      {autoGenerate ? 'Auto ON' : 'Auto OFF'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Current UUID Display */}
              {showPreview && (
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Key className="w-4 h-4 text-blue-400" />
                    Current UUID
                  </h3>

                  {currentUuid ? (
                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                      <div className="flex items-center justify-between gap-4">
                        <code className="flex-1 text-sm font-mono text-white break-all">
                          {currentUuid}
                        </code>
                        <button
                          onClick={() => handleCopy(currentUuid)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white transition-all duration-200 border border-slate-600/50 flex-shrink-0"
                        >
                          {copied === currentUuid ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {copied === currentUuid ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-900/30 border border-slate-700/50 rounded-xl p-8 text-center">
                      <Key className="w-12 h-12 mx-auto mb-3 text-slate-500 opacity-50" />
                      <p className="text-slate-500">Generate a UUID to get started</p>
                    </div>
                  )}
                </div>
              )}


              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={quantity === 1 ? generateSingleUuid : generateMultipleUuids}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200"
                >
                  <RefreshCw className="w-4 h-4" />
                  Generate {quantity > 1 ? `${quantity} UUIDs` : 'UUID'}
                </button>

                {uuidHistory.length > 0 && (
                  <>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-slate-500/50 rounded-xl text-slate-300 hover:text-white font-semibold transition-all duration-200"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>

                    <button
                      onClick={clearAll}
                      className="flex items-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 hover:border-red-500/70 rounded-xl text-red-400 hover:text-red-300 font-semibold transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear All
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* History Section */}
            {showHistory && (
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50">
                <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <List className="w-4 h-4 text-purple-400" />
                    History ({uuidHistory.length})
                  </h3>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {uuidHistory.length > 0 ? (
                    <div className="p-4 space-y-2">
                      {uuidHistory.map((item) => (
                        <div
                          key={item.id}
                          className="group bg-slate-900/30 hover:bg-slate-900/50 border border-slate-700/30 hover:border-slate-600/50 rounded-lg p-3 transition-all duration-200"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className={`
                            text-xs px-2 py-1 rounded-full font-medium
                            ${item.type === 'v4'
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                              }
                          `}>
                              {item.type.toUpperCase()}
                            </span>
                            <span className="text-xs text-slate-500">{formatTimestamp(item.timestamp)}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <code className="flex-1 text-xs font-mono text-slate-300 truncate">
                              {item.uuid}
                            </code>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <button
                                onClick={() => handleCopy(item.uuid)}
                                className="p-1 text-slate-400 hover:text-slate-300 transition-colors duration-200"
                              >
                                {copied === item.uuid ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              </button>
                              <button
                                onClick={() => removeFromHistory(item.id)}
                                className="p-1 text-slate-400 hover:text-red-400 transition-colors duration-200"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <List className="w-12 h-12 mx-auto mb-3 text-slate-500 opacity-50" />
                      <p className="text-slate-500">No UUIDs generated yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              Pro Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-300">
              <div>
                <h4 className="font-medium text-white mb-2">UUID v4 (Random)</h4>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Completely random, no meaningful information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Best for general use cases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Most commonly used UUID type</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">UUID v1 (Time-based)</h4>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Contains timestamp and MAC address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Useful for sorting by creation time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Less privacy-friendly than v4</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}