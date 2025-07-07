'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
  Sparkles,
  ArrowRight,
  Star,
  Activity,
  Timer,
  Award
} from 'lucide-react';

export default function Homepage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tools = [
    { 
      name: 'JSON Beautifier', 
      path: '/tools/json-beautifier',
      icon: Code,
      description: 'Format, validate and beautify your JSON data with syntax highlighting',
      color: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-500/10 to-teal-600/10',
      category: 'Data Processing',
      popular: true
    },
    { 
      name: 'UUID Generator', 
      path: '/tools/uuid-generator',
      icon: Key,
      description: 'Generate RFC-compliant unique identifiers for your applications',
      color: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-500/10 to-indigo-600/10',
      category: 'Generators',
      popular: false
    },
    { 
      name: 'Slug Generator', 
      path: '/tools/slug-generator',
      icon: Hash,
      description: 'Create SEO-friendly URL slugs from any text with customizable options',
      color: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-500/10 to-violet-600/10',
      category: 'URL Tools',
      popular: true
    },
    { 
      name: 'Regex Tester', 
      path: '/tools/regex-tester',
      icon: TestTube,
      description: 'Test and debug regular expressions with real-time matching',
      color: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-500/10 to-red-600/10',
      category: 'Testing',
      popular: false
    },
    { 
      name: 'API Tester', 
      path: '/tools/api-tester',
      icon: Globe,
      description: 'Test REST API endpoints with custom headers and payloads',
      color: 'from-cyan-500 to-blue-600',
      bgGradient: 'from-cyan-500/10 to-blue-600/10',
      category: 'Testing',
      popular: true
    },
    { 
      name: 'Base64 Encoder/Decoder', 
      path: '/tools/base64-encoder-decoder',
      icon: Eye,
      description: 'Encode and decode Base64 strings with file support',
      color: 'from-pink-500 to-rose-600',
      bgGradient: 'from-pink-500/10 to-rose-600/10',
      category: 'Encoding',
      popular: false
    },
    { 
      name: 'JWT Decoder', 
      path: '/tools/jwt-decoder',
      icon: Shield,
      description: 'Decode and validate JSON Web Tokens with detailed information',
      color: 'from-amber-500 to-orange-600',
      bgGradient: 'from-amber-500/10 to-orange-600/10',
      category: 'Security',
      popular: true
    },
    { 
      name: 'Color Converter', 
      path: '/tools/color-converter',
      icon: Palette,
      description: 'Convert between HEX, RGB, HSL and other color formats',
      color: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-500/10 to-emerald-600/10',
      category: 'Design',
      popular: false
    },
    { 
      name: 'Timestamp Converter', 
      path: '/tools/timestamp-converter',
      icon: Clock,
      description: 'Convert between Unix timestamps and human-readable dates',
      color: 'from-slate-500 to-gray-600',
      bgGradient: 'from-slate-500/10 to-gray-600/10',
      category: 'Time & Date',
      popular: false
    },
    { 
      name: 'Password Generator', 
      path: '/tools/password-generator',
      icon: Lock,
      description: 'Generate cryptographically secure passwords with custom rules',
      color: 'from-red-500 to-pink-600',
      bgGradient: 'from-red-500/10 to-pink-600/10',
      category: 'Security',
      popular: true
    },
    { 
      name: 'Hash Generator', 
      path: '/tools/hash-generator',
      icon: Hash,
      description: 'Generate MD5, SHA-1, SHA-256 and other cryptographic hashes',
      color: 'from-indigo-500 to-purple-600',
      bgGradient: 'from-indigo-500/10 to-purple-600/10',
      category: 'Security',
      popular: false
    },
    { 
      name: 'URL Encoder/Decoder', 
      path: '/tools/url-encoder-decoder',
      icon: LinkIcon,
      description: 'Safely encode and decode URLs for web applications',
      color: 'from-teal-500 to-cyan-600',
      bgGradient: 'from-teal-500/10 to-cyan-600/10',
      category: 'URL Tools',
      popular: false
    },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-purple-500/3 to-pink-500/3"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-gradient-to-br from-pink-400/5 to-orange-400/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-10 w-32 h-32 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 rounded-full blur-xl animate-pulse delay-2000"></div>

        <div className="relative z-10 p-8 max-w-[1600px] mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text">
              Developer Tools Dashboard
            </h1>
            
            <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              A comprehensive collection of essential development utilities designed to boost your productivity and streamline your workflow
            </p>

          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon;

              
              return (
                <Link
                  key={tool.name}
                  href={tool.path}
                  className={`group block transform transition-all duration-500 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className={`
                    relative h-full bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50
                    hover:border-slate-600/70 hover:bg-slate-800/50
                    hover:shadow-2xl hover:shadow-black/20
                    hover:transform hover:scale-105 hover:-translate-y-2
                    transition-all duration-300 ease-out
                    overflow-hidden
                  `}>
                    {/* Background gradient overlay */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-br ${tool.bgGradient} opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300
                    `} />
                    
                    {/* Popular badge */}
                    {tool.popular && (
                      <div className="absolute top-3 right-3 z-10">
                        <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-full border border-yellow-500/30">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-yellow-300 font-medium">Popular</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="relative z-10 p-6 h-full flex flex-col">
                      {/* Icon */}
                      <div className={`
                        w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} 
                        flex items-center justify-center mb-4 shadow-lg
                        group-hover:shadow-xl group-hover:scale-110
                        transition-all duration-300
                      `}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      
                      {/* Category */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                          {tool.category}
                        </span>
                        <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                        <Activity className="w-3 h-3 text-slate-500" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-white/90 transition-colors">
                        {tool.name}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors flex-1 leading-relaxed">
                        {tool.description}
                      </p>
                      
                      {/* Action */}
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700/30 group-hover:border-slate-600/50 transition-colors">
                        <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                          Launch Tool
                        </span>
                        <ArrowRight className={`
                          w-4 h-4 text-slate-500 group-hover:text-white 
                          group-hover:translate-x-1 transition-all duration-200
                        `} />
                      </div>
                    </div>
                    
                    {/* Hover glow effect */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-r ${tool.color} opacity-0 
                      group-hover:opacity-5 transition-opacity duration-300 pointer-events-none
                    `} />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Call to Action Section */}
          <div className="mt-16 text-center">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Award className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">Ready to boost your productivity?</h2>
              </div>
              
              <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
                Choose any tool above to get started, or explore our sidebar for quick navigation between utilities. 
                All tools are designed with performance and user experience in mind.
              </p>
              
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                  <Timer className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-300 font-medium">Lightning Fast</span>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-300 font-medium">Privacy First</span>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-300 font-medium">Always Free</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-slate-700/30 text-center">
            <p className="text-slate-500 text-sm">
              Built with precision, designed for developers
            </p>
            <div className="flex justify-center gap-2 mt-4">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}