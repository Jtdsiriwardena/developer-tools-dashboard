'use client';

import { useState, useEffect } from 'react';
import { Palette, AlertCircle, Eye, EyeOff, Type, Zap, Sparkles, Droplet } from 'lucide-react';

function hexToRgb(hex: string): string | null {
  hex = hex.replace('#', '').trim();
  if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
  if (hex.length !== 6) return null;
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

function rgbToHex(rgb: string): string | null {
  const match = rgb.match(/rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/);
  if (!match) return null;
  const r = parseInt(match[1]).toString(16).padStart(2, '0');
  const g = parseInt(match[2]).toString(16).padStart(2, '0');
  const b = parseInt(match[3]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

function rgbToHsl(rgb: string): string | null {
  const match = rgb.match(/rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/);
  if (!match) return null;
  const r = parseInt(match[1]) / 255;
  const g = parseInt(match[2]) / 255;
  const b = parseInt(match[3]) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

export default function ColorConverter() {
  const [color, setColor] = useState('#ff0000');
  const [manualHex, setManualHex] = useState(color);
  const [manualRgb, setManualRgb] = useState(hexToRgb(color) || '');
  const [showPreview, setShowPreview] = useState(true);
  const [stats, setStats] = useState({ hexLength: 0, rgbValid: false, hslValid: false, current: color });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStats({
      hexLength: manualHex.replace('#', '').length,
      rgbValid: /^rgb\(/.test(manualRgb),
      hslValid: rgbToHsl(manualRgb) !== null,
      current: color
    });
  }, [color, manualHex, manualRgb]);

  const handleHexConvert = () => {
    if (/^#?[0-9A-Fa-f]{3,6}$/.test(manualHex)) {
      const validHex = manualHex.startsWith('#') ? manualHex : '#' + manualHex;
      setColor(validHex);
      setManualRgb(hexToRgb(validHex) || '');
      setError(null);
    } else {
      setError('Invalid HEX format');
    }
  };

  const handleRgbConvert = () => {
    const hex = rgbToHex(manualRgb);
    if (hex) {
      setColor(hex);
      setManualHex(hex);
      setError(null);
    } else {
      setError('Invalid RGB format');
    }
  };

  const handleClear = () => {
    setColor('#ff0000');
    setManualHex('#ff0000');
    setManualRgb('rgb(255, 0, 0)');
    setError(null);
  }

  const loadSample = () => {
    setColor('#3498db');
    setManualHex('#3498db');
    setManualRgb('rgb(52, 152, 219)');
    setError(null);
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                <Palette className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Color Converter</h1>
                <p className="text-slate-400 mt-1">Convert color formats</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowPreview(!showPreview)} className="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg border border-slate-600/50 hover:bg-slate-600/50">
                {showPreview ? <EyeOff className="w-4 h-4 inline" /> : <Eye className="w-4 h-4 inline" />}
                {showPreview ? ' Hide Preview' : ' Show Preview'}
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1"><Type className="w-4 h-4 text-green-400" /><span className="text-xs text-slate-400 uppercase">HEX Length</span></div>
              <div className="text-lg font-semibold text-white">{stats.hexLength}</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1"><Zap className="w-4 h-4 text-yellow-400" /><span className="text-xs text-slate-400 uppercase">RGB Valid</span></div>
              <div className="text-lg font-semibold text-white">{stats.rgbValid ? 'Valid' : 'Invalid'}</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1"><Sparkles className="w-4 h-4 text-purple-400" /><span className="text-xs text-slate-400 uppercase">HSL Valid</span></div>
              <div className="text-lg font-semibold text-white">{stats.hslValid ? 'Valid' : 'Invalid'}</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-1"><Droplet className="w-4 h-4 text-emerald-400" /><span className="text-xs text-slate-400 uppercase">Current</span></div>
              <div className="text-lg font-semibold text-white">{stats.current}</div>
            </div>
          </div>

          <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
            <div className="space-y-6">
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Pick Color:
                    </label>
                    <button
                      onClick={loadSample}
                      className="px-3 py-1.5 text-xs bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white border border-slate-600/50"
                    >
                      Load Sample
                    </button>
                  </div>

                  <input
                    type="color"
                    value={color}
                    onChange={(e) => {
                      setColor(e.target.value);
                      setManualHex(e.target.value);
                      setManualRgb(hexToRgb(e.target.value) || '');
                    }}
                    className="w-32 h-16 border"
                  />
                </div>


                <div className="mb-4">
                  <label className="block text-sm text-slate-300 mb-2">HEX</label>
                  <div className="flex gap-2">
                    <input type="text" value={manualHex} onChange={(e) => setManualHex(e.target.value)} className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white font-mono" />
                    <button onClick={handleHexConvert} className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl">Convert</button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-slate-300 mb-2">RGB</label>
                  <div className="flex gap-2">
                    <input type="text" value={manualRgb} onChange={(e) => setManualRgb(e.target.value)} placeholder="rgb(255, 0, 0)" className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-white font-mono" />
                    <button onClick={handleRgbConvert} className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl">Convert</button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-slate-300 mb-2">HSL</label>
                  <div className="border border-slate-700/50 rounded-lg px-3 py-2 bg-slate-900/50 text-white font-mono">{rgbToHsl(manualRgb) || 'Invalid RGB'}</div>
                </div>

                {error && <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3"><AlertCircle className="w-5 h-5 text-red-400" /><span className="text-red-300 font-medium">{error}</span></div>}

                <div className="flex gap-4">
                  <button onClick={handleClear} className="flex items-center gap-2 px-6 py-3 bg-slate-700/50 text-slate-300 font-semibold rounded-xl border border-slate-600/50 hover:bg-slate-600/50">Clear</button>
                </div>
              </div>
            </div>

            {showPreview && (
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center">
                <div className="w-64 h-64 rounded-xl shadow-lg" style={{ backgroundColor: color }} />
                <div className="mt-4 text-white font-mono">{color}</div>
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
      <span>Use HEX colors for consistent web compatibility.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
      <span>Remember that RGB values range from 0 to 255.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
      <span>Use HSL for easier lightness and saturation adjustments.</span>
    </div>
    <div className="flex gap-2 items-start">
      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
      <span>Always validate user input to avoid invalid color codes.</span>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}
