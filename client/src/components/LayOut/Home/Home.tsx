import React, { useEffect, useState } from "react";
import HomeImage from "../../../assests/img/Home image.png";
import PrimaryButton from "../../Shared/PrimaryButton";

const Home: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Handle scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Animation for elements
  useEffect(() => {
    // Animate elements with staggered delay
    const elements = document.querySelectorAll('.reveal-element');
    
    setTimeout(() => {
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('revealed');
        }, index * 150);
      });
    }, 300);
  }, []);

  return (
    <div className="relative bg-black text-white overflow-hidden">
      {/* Cyberpunk/Neon inspired background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black via-[#0F0326] to-[#1E0740]">
        {/* Horizontal neon lines */}
        <div className="absolute left-0 right-0 top-1/4 h-[0.5px] bg-[#FF00FF] opacity-50 shadow-[0_0_15px_#FF00FF] blur-[2px]"></div>
        <div className="absolute left-0 right-0 top-2/3 h-[0.5px] bg-[#00FFFF] opacity-50 shadow-[0_0_15px_#00FFFF] blur-[2px]"></div>
        
        {/* Vertical neon lines */}
        <div className="absolute top-0 bottom-0 left-1/4 w-[0.5px] bg-[#FF00FF] opacity-30 shadow-[0_0_15px_#FF00FF] blur-[2px]"></div>
        <div className="absolute top-0 bottom-0 right-1/3 w-[0.5px] bg-[#00FFFF] opacity-30 shadow-[0_0_15px_#00FFFF] blur-[2px]"></div>
        
        {/* Noise overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-20"></div>
        
        {/* Animated gradients */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#FF00FF] opacity-10 blur-[120px] animate-pulsate-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-[#00FFFF] opacity-10 blur-[100px] animate-pulsate-delayed"></div>
        <div className="absolute bottom-0 right-0 w-[200px] h-[200px] rounded-full bg-[#FF00FF] opacity-10 blur-[80px] animate-float-slow"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen">
        {/* Cyber Glitch Header
        <header className="relative flex justify-between items-center p-6 mb-12">
          <div className="glitch-container">
            <h1 className="text-3xl font-bold text-white relative">
              <span className="absolute top-0 left-0 -z-10 text-[#FF00FF] glitch-effect" aria-hidden="true">S BEATS</span>
              <span className="absolute top-0 left-0 -z-20 text-[#00FFFF] glitch-effect-2" aria-hidden="true">S BEATS</span>
              S BEATS
            </h1>
          </div>
          
          <nav className="hidden md:flex space-x-2">
            {["SHOP", "GEAR", "STUDIO", "CONTACT"].map((item, i) => (
              <a 
                key={i} 
                href="#" 
                className="px-4 py-2 rounded border border-[#FF00FF]/20 text-sm hover:border-[#FF00FF] hover:text-[#FF00FF] hover:shadow-[0_0_10px_#FF00FF40] transition-all duration-300"
              >
                {item}
              </a>
            ))}
          </nav>
        </header> */}

        <div className="container mx-auto px-6 pt-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 order-2 lg:order-1 reveal-element">
              <div className="inline-block">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-[1px] bg-gradient-to-r from-[#FF00FF] to-transparent"></div>
                  <span className="text-[#FF00FF] text-sm tracking-widest uppercase">Premium Audio Gear</span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-none mb-4 tracking-tight">
                  Future of <br />
                  <span className="relative inline-block">
                    <span className="absolute -inset-1 text-[#FF00FF] blur-[2px] opacity-60 animate-pulse" aria-hidden="true">Sound Production</span>
                    <span className="relative">Sound Production</span>
                  </span>
                </h2>

                <div className="text-lg md:text-xl text-gray-400 max-w-lg">
                  Experience pristine sound quality with our collection of professional grade musical instruments for creators and performers.
                </div>
              </div>
            
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="relative overflow-hidden group px-8 py-4 bg-[#FF00FF]/10 border border-[#FF00FF]/50 rounded-md hover:bg-[#FF00FF]/20 transition-all duration-300">
                  <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#FF00FF]/20 to-transparent skew-x-[-45deg] group-hover:animate-shimmer"></div>
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>EXPLORE CATALOG</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </button>
                
                <button className="relative px-8 py-4 bg-transparent border border-white/10 rounded-md hover:border-white/30 transition-all duration-300 group">
                  <span className="relative z-10 flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>WATCH DEMO</span>
                  </span>
                </button>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="stats-box">
                  <div className="text-2xl font-bold">15K+</div>
                  <div className="text-sm text-gray-400">Products</div>
                </div>
                
                <div className="stats-box">
                  <div className="text-2xl font-bold">4.9</div>
                  <div className="text-sm text-gray-400">User Rating</div>
                </div>
                
                <div className="stats-box">
                  <div className="text-2xl font-bold">24h</div>
                  <div className="text-sm text-gray-400">Support</div>
                </div>
              </div>
            </div>
            
            {/* Right Image - Futuristic showcase */}
            <div className="order-1 lg:order-2 reveal-element">
              <div className="relative">
                {/* Glowing frame */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] opacity-50 rounded-lg blur-md"></div>
                
                {/* Tech frame with scan lines */}
                <div className="relative border-l-2 border-t-2 border-r-2 border-b-8 border-[#FF00FF]/50 rounded-lg p-1 bg-black/30 backdrop-blur-sm scan-lines">
                  {/* Tech details */}
                  <div className="absolute top-2 left-2 text-xs text-[#00FFFF] z-10 glitch-micro">VISUALIZING</div>
                  <div className="absolute top-2 right-2 text-xs text-[#FF00FF] z-10 glitch-micro">[S-B-4500]</div>
                  <div className="absolute bottom-2 left-2 text-xs text-[#00FFFF] z-10 glitch-micro">AUDIO-SYSTEMS</div>
                  <div className="absolute bottom-2 right-2 text-xs text-[#FF00FF] z-10 glitch-micro">LOADING...</div>
                  
                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#FF00FF] rounded-tl"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#FF00FF] rounded-tr"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#FF00FF] rounded-bl"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#FF00FF] rounded-br"></div>
                  
                  {/* Main image with effects */}
                  <div className="relative rounded overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1E0740]/70 z-10"></div>
                    <div className="absolute inset-0 bg-[#FF00FF]/10 mix-blend-overlay z-10"></div>
                    <img 
                      src={HomeImage} 
                      alt="Futuristic music instruments" 
                      className="w-full object-cover z-0 filter saturate-[1.2] contrast-[1.1]"
                    />
                  </div>
                  
                  {/* Floating tech elements */}
                  <div className="absolute left-6 top-1/3 p-2 rounded bg-black/40 backdrop-blur-sm border border-[#00FFFF]/20 text-xs text-[#00FFFF] tech-float">
                    <div className="flex items-center space-x-2">
                      <span className="inline-block w-2 h-2 bg-[#00FFFF] rounded-full animate-ping-slow"></span>
                      <span>PREMIUM QUALITY</span>
                    </div>
                  </div>
                  
                  <div className="absolute right-6 bottom-1/4 p-2 rounded bg-black/40 backdrop-blur-sm border border-[#FF00FF]/20 text-xs text-[#FF00FF] tech-float-delay">
                    <div className="flex items-center space-x-2">
                      <span className="inline-block w-2 h-2 bg-[#FF00FF] rounded-full animate-ping-slow"></span>
                      <span>PRO AUDIO</span>
                    </div>
                  </div>
                </div>
                
                {/* Digital discount badge */}
                <div className="absolute -bottom-8 -right-4 transform rotate-6 bg-black/70 backdrop-blur-sm border border-[#00FFFF]/50 text-[#00FFFF] p-3 rounded tech-pulse z-20">
                  <div className="text-2xl font-bold">15%</div>
                  <div className="text-xs">NEW USERS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Categories */}
      <div className="relative z-10 pb-20">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center reveal-element">
            <h2 className="inline-block text-3xl font-bold relative">
              <span className="absolute -inset-1 text-[#00FFFF] blur-[2px] opacity-60" aria-hidden="true">EXPLORE CATEGORIES</span>
              <span className="relative">EXPLORE CATEGORIES</span>
            </h2>
            <div className="mt-3 w-24 h-[1px] bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] mx-auto"></div>
            <p className="text-gray-400 mt-4 max-w-md mx-auto">Discover cutting-edge instruments designed for the modern musician</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'SYNTH DRUMS', icon: '🥁', color: '#FF00FF', description: 'Electronic & Acoustic' },
              { name: 'CYBER GUITARS', icon: '🎸', color: '#00FFFF', description: 'Digital Processing' },
              { name: 'KEYBOARDS', icon: '🎹', color: '#FF00FF', description: 'MIDI Controllers' },
              { name: 'DJ INTERFACES', icon: '🎧', color: '#00FFFF', description: 'Audio Processing' }
            ].map((category, index) => (
              <div 
                key={index} 
                className="reveal-element cyber-card"
                style={{ transitionDelay: `${index * 100 + 300}ms` }}
              >
                <div className="cyber-card-glitch-1" style={{ backgroundColor: `${category.color}20` }}></div>
                <div className="cyber-card-glitch-2" style={{ backgroundColor: `${category.color}30` }}></div>
                
                <div className="h-52 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                  {/* Animated background grid */}
                  <div className="absolute inset-0 cyber-grid" style={{ borderColor: `${category.color}10` }}></div>
                  
                  {/* Category content */}
                  <div className="relative z-10 text-center">
                    <div className="text-5xl mb-4">{category.icon}</div>
                    <h3 className="text-lg font-medium mb-2" style={{ color: category.color }}>{category.name}</h3>
                    <p className="text-xs text-gray-400">{category.description}</p>
                    
                    <div className="mt-4">
                      <button className="text-xs px-3 py-1 border rounded-sm hover:bg-white/5 transition-colors" style={{ borderColor: `${category.color}50`, color: category.color }}>
                        EXPLORE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;