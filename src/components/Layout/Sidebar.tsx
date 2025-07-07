// src/components/Layout/Sidebar.tsx
"use client"

import Link from 'next/link';
import { useState } from 'react';
import { 
  Code, 
  Key, 
  Hash, 
  TestTube, 
  Globe,
  Lock,
  Palette,
  Clock,
  Shield,
  Eye,
  Link as LinkIcon,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const tools = [
    { 
      name: 'JSON Beautifier', 
      path: '/tools/json-beautifier',
      icon: Code,
      description: 'Format and validate JSON',
      color: 'from-emerald-500 to-teal-600'
    },
    { 
      name: 'UUID Generator', 
      path: '/tools/uuid-generator',
      icon: Key,
      description: 'Generate unique identifiers',
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      name: 'Slug Generator', 
      path: '/tools/slug-generator',
      icon: Hash,
      description: 'Create URL-friendly slugs',
      color: 'from-purple-500 to-violet-600'
    },
    { 
      name: 'Regex Tester', 
      path: '/tools/regex-tester',
      icon: TestTube,
      description: 'Test regular expressions',
      color: 'from-orange-500 to-red-600'
    },
    { 
      name: 'API Tester', 
      path: '/tools/api-tester',
      icon: Globe,
      description: 'Test API endpoints',
      color: 'from-cyan-500 to-blue-600'
    },
    { 
      name: 'Base64 Encoder/Decoder', 
      path: '/tools/base64-encoder-decoder',
      icon: Eye,
      description: 'Encode and decode Base64',
      color: 'from-pink-500 to-rose-600'
    },
    { 
      name: 'JWT Decoder', 
      path: '/tools/jwt-decoder',
      icon: Shield,
      description: 'Decode JWT tokens',
      color: 'from-amber-500 to-orange-600'
    },
    { 
      name: 'Color Converter', 
      path: '/tools/color-converter',
      icon: Palette,
      description: 'Convert color formats',
      color: 'from-green-500 to-emerald-600'
    },
    { 
      name: 'Timestamp Converter', 
      path: '/tools/timestamp-converter',
      icon: Clock,
      description: 'Convert timestamps',
      color: 'from-slate-500 to-gray-600'
    },
    { 
      name: 'Password Generator', 
      path: '/tools/password-generator',
      icon: Lock,
      description: 'Generate secure passwords',
      color: 'from-red-500 to-pink-600'
    },
    { 
      name: 'Hash Generator', 
      path: '/tools/hash-generator',
      icon: Hash,
      description: 'Generate various hashes',
      color: 'from-indigo-500 to-purple-600'
    },
    { 
      name: 'URL Encoder/Decoder', 
      path: '/tools/url-encoder-decoder',
      icon: LinkIcon,
      description: 'Encode and decode URLs',
      color: 'from-teal-500 to-cyan-600'
    },
  ];

  return (
     <div className="w-80 h-[60rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 backdrop-blur-xl relative overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>

    {/* Floating orbs */}
    <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse"></div>
    <div className="absolute bottom-40 left-6 w-24 h-24 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      {/* Make the content scrollable */}
    <div className="relative z-10 p-6 h-full overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-xl text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text">
                Dev Tools
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                {tools.length} powerful utilities
              </p>
            </div>
          </div>
        </div>

        {/* Tools List */}
        <div className="space-y-2">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            const isHovered = hoveredItem === tool.name;
            const isActive = activeItem === tool.name;
            
            return (
              <Link
                key={tool.name}
                href={tool.path}
                onClick={() => setActiveItem(tool.name)}
                onMouseEnter={() => setHoveredItem(tool.name)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  group relative block p-4 rounded-xl transition-all duration-300 ease-out
                  border border-slate-700/50 backdrop-blur-sm
                  hover:border-slate-600/50 hover:shadow-lg hover:shadow-black/20
                  hover:transform hover:scale-[1.02] hover:-translate-y-0.5
                  ${isActive ? 'bg-slate-800/80 border-slate-600' : 'bg-slate-800/30'}
                  ${isHovered ? 'bg-slate-800/60' : ''}
                `}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {/* Gradient overlay on hover */}
                <div 
                  className={`
                    absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 
                    transition-opacity duration-300 bg-gradient-to-r ${tool.color}
                  `}
                />
                
                {/* Content */}
                <div className="relative flex items-center gap-4">
                  {/* Icon */}
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center
                    bg-gradient-to-br ${tool.color} shadow-lg
                    group-hover:shadow-xl transition-all duration-300
                    group-hover:scale-110
                  `}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm group-hover:text-white/90 transition-colors duration-200">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-200 mt-0.5">
                      {tool.description}
                    </p>
                  </div>
                  
                  {/* Arrow indicator */}
                  <ChevronRight 
                    className={`
                      w-4 h-4 text-slate-500 transition-all duration-200
                      group-hover:text-slate-300 group-hover:translate-x-1
                      ${isHovered ? 'opacity-100' : 'opacity-0'}
                    `}
                  />
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full"></div>
                )}
              </Link>
            );
          })}
        </div>
        
        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <div className="text-center">
            <p className="text-xs text-slate-500 font-medium">
              Built with precision & care
            </p>
            <div className="flex justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}