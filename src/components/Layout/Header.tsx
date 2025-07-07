// src/components/Layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  Moon, 
  Sun, 
  Command,
  Zap,
  GitBranch,
  Activity,
  Sparkles
} from 'lucide-react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <header className="relative h-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 backdrop-blur-xl overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
      
      {/* Floating particles */}
      <div className="absolute top-2 right-20 w-2 h-2 bg-blue-400/30 rounded-full animate-ping"></div>
      <div className="absolute top-6 right-40 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-500"></div>
      <div className="absolute top-4 right-60 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-ping delay-1000"></div>

      <div className="relative z-10 flex justify-between items-center h-full px-8">
        {/* Left Section - Logo & Title */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 rotate-3 hover:rotate-0 transition-transform duration-300">
                <Command className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            
            <div>
              <h1 className="font-bold text-2xl text-white bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text">
                DEV KIT HUB
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-400 font-medium">System Online</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="hidden lg:flex items-center gap-6 ml-8">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-sm text-slate-300 font-medium">12 Tools</span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <GitBranch className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300 font-medium">v2.1.0</span>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 justify-center max-w-md mx-8">
          <div className={`
            relative w-full transition-all duration-300 ease-out
            ${searchFocused ? 'transform scale-105' : ''}
          `}>
            <div className={`
              relative flex items-center bg-slate-800/50 backdrop-blur-sm rounded-xl
              border transition-all duration-300
              ${searchFocused 
                ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' 
                : 'border-slate-700/50 hover:border-slate-600/50'
              }
            `}>
              <Search className={`
                w-5 h-5 ml-4 transition-colors duration-200
                ${searchFocused ? 'text-blue-400' : 'text-slate-400'}
              `} />
              <input
                type="text"
                placeholder="Search tools... (⌘K)"
                className="w-full px-4 py-3 bg-transparent text-white placeholder-slate-400 focus:outline-none text-sm font-medium"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <div className="flex items-center gap-1 mr-3">
                <kbd className="px-2 py-1 text-xs text-slate-400 bg-slate-700/50 rounded border border-slate-600/50 font-mono">
                  ⌘K
                </kbd>
              </div>
            </div>
            
            {/* Animated border */}
            {searchFocused && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 -z-10 blur-sm animate-pulse"></div>
            )}
          </div>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center gap-4">
          {/* Time Display */}
          <div className="hidden sm:block text-right">
            <div className="text-sm font-medium text-white">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
            <div className="text-xs text-slate-400">
              {currentTime.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-10 h-10 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200 flex items-center justify-center group"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-200" />
              ) : (
                <Moon className="w-5 h-5 text-slate-400 group-hover:text-slate-300 transition-colors duration-200" />
              )}
            </button>

            {/* Notifications */}
            <button className="relative w-10 h-10 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200 flex items-center justify-center group">
              <Bell className="w-5 h-5 text-slate-400 group-hover:text-slate-300 transition-colors duration-200" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">2</span>
              </div>
            </button>

            {/* Settings */}
            <button className="w-10 h-10 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200 flex items-center justify-center group">
              <Settings className="w-5 h-5 text-slate-400 group-hover:text-slate-300 group-hover:rotate-90 transition-all duration-200" />
            </button>
          </div>

          

          {/* Performance Indicator */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <Zap className="w-4 h-4 text-yellow-400" />
            <div className="text-sm font-medium text-slate-300">Fast</div>
          </div>
        </div>
      </div>
    </header>
  );
}