import React, { useEffect, useState } from "react";
import HomeImage from "../../../assests/img/Home image.png";
import PrimaryButton from "../../Shared/PrimaryButton";

const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Reveal animations on page load
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#111827] text-gray-100">
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#0F172A] to-[#0E1425]"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgdHJhbnNmb3JtPSJzY2FsZSgxKSI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDIyQzk0IiBzdHJva2Utd2lkdGg9IjAuNSIgZD0iTS41LjVoMjB2MjBoLTIweiIvPjwvZz48L3N2Zz4=')]"></div>
      </div>
      
      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            backgroundColor: i % 2 ? '#D946EF' : '#FB7185',
            opacity: 0.4,
            filter: 'blur(1px)',
            animation: `floatingParticle ${Math.random() * 15 + 10}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 5}s`
          }}
        ></div>
      ))}
      
      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#D946EF] rounded-full opacity-5 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FB7185] rounded-full opacity-5 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-[#422C94] rounded-full opacity-5 blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>

      {/* Main content wrapper */}
      <div className="relative z-10">
        {/* Header/Navigation bar */}
      
        
        {/* Side statistics panel */}
        <div className={`fixed left-0 top-1/2 transform -translate-y-1/2 hidden lg:block transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
          <div className="bg-gray-900/70 backdrop-blur-md border-r border-gray-800 p-4 pl-2 pr-6 rounded-r-lg">
            <div className="flex flex-col items-center space-y-8">
              <div className="text-center">
                <div className="text-sm text-gray-500 uppercase tracking-wider">Products</div>
                <div className="text-2xl font-bold text-white mt-1">150+</div>
                <div className="h-1 w-12 mx-auto bg-gradient-to-r from-[#D946EF] to-[#FB7185] mt-2 rounded-full"></div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-gray-500 uppercase tracking-wider">Brands</div>
                <div className="text-2xl font-bold text-white mt-1">50+</div>
                <div className="h-1 w-12 mx-auto bg-gradient-to-r from-[#D946EF] to-[#FB7185] mt-2 rounded-full"></div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-gray-500 uppercase tracking-wider">Countries</div>
                <div className="text-2xl font-bold text-white mt-1">120+</div>
                <div className="h-1 w-12 mx-auto bg-gradient-to-r from-[#D946EF] to-[#FB7185] mt-2 rounded-full"></div>
              </div>
              
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>
              
              <div className="flex flex-col space-y-2">
                {['facebook', 'twitter', 'instagram'].map((social, index) => (
                  <button 
                    key={index}
                    className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors duration-300"
                  >
                    {/* Simplified social icons */}
                    <span className="text-xs">{social.charAt(0).toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main sections container */}
        <div className="container mx-auto pt-24 pb-12 px-4 lg:px-6">
          {/* Hero section - completely redesigned with split layout */}
          <section className="min-h-[80vh] flex flex-col mb-24">
            <div className={`flex flex-col transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}>
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">
                  Digital Sound Evolution
                </h1>
                <div className="relative inline-block mt-3">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-lg blur opacity-30"></div>
                  <span className="relative block text-5xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#D946EF] to-[#FB7185]">
                    ECHO NEXUS
                  </span>
                </div>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mt-6">
                  Cutting-edge audio technology and premium instruments—crafted for 
                  professionals who push sonic boundaries.
                </p>
              </div>
              
              {/* Featured product display */}
              <div className="relative mt-6 lg:mt-0 max-w-5xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-[#422C94]/20 to-[#FB7185]/20 blur-3xl opacity-20 rounded-xl"></div>
                
                <div className="relative flex flex-col lg:flex-row rounded-xl border border-gray-800 overflow-hidden bg-gray-900/30 backdrop-blur-sm">
                  {/* Left image side */}
                  <div className="lg:w-3/5 relative z-10 group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D946EF]/20 to-[#FB7185]/20 opacity-50 z-0"></div>
                    
                    <img 
                      src={HomeImage} 
                      alt="Musical instruments collection" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-110 contrast-125"
                    />
                    
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
                      <div className="inline-block px-3 py-1 bg-[#422C94]/80 rounded-md text-white text-sm font-semibold tracking-wider mb-2">
                        FEATURED
                      </div>
                      <h3 className="text-2xl font-bold text-white">Professional Audio Experience</h3>
                    </div>
                    
                    {/* Tech specs overlay */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-md px-3 py-2 flex items-center border border-gray-700">
                      <span className="text-xl font-bold text-[#D946EF] mr-2">4K</span>
                      <span className="text-gray-300 text-sm">Ultra HD<br/>Sound Quality</span>
                    </div>
                  </div>
                  
                  {/* Right info side */}
                  <div className="lg:w-2/5 p-8 flex flex-col justify-center">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-gray-400 text-sm">(4.9/5)</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-[#D946EF]"></div>
                          <p className="text-gray-300">Ultra-responsive dynamic drivers</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-[#FB7185]"></div>
                          <p className="text-gray-300">Premium grade materials</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-[#422C94]"></div>
                          <p className="text-gray-300">5-year extended warranty</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-4 mt-6">
                        <div className="relative group">
                          
                          <PrimaryButton>Enter Universe</PrimaryButton>
                          </div>
                        <button className="px-5 py-3 bg-transparent border border-gray-700 text-gray-300 rounded-md font-medium relative overflow-hidden transition-all duration-500 hover:border-white hover:text-white">
                          Browse Gear
                        </button>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                        <span className="text-gray-500 text-sm">Share:</span>
                        <div className="flex space-x-3">
                          {['Share', 'Tweet', 'Pin'].map((action, i) => (
                            <button key={i} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                              {action}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Categories sections - completely redesigned as large cards with hover effects */}
          <section className="mb-24">
            <div className={`mb-16 text-center transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <h2 className="text-3xl font-bold relative inline-block">
                <span className="absolute -left-6 -top-6 w-12 h-12 border border-[#D946EF]/30 rounded-md transform rotate-12 opacity-50"></span>
                Hardware Selection
                <span className="absolute -right-6 -bottom-6 w-12 h-12 border border-[#FB7185]/30 rounded-md transform -rotate-12 opacity-50"></span>
              </h2>
              <p className="text-gray-400 mt-4 max-w-xl mx-auto">
                Explore our premium collections of professional-grade audio equipment
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {name: 'Drums', icon: '🥁', color: 'from-[#422C94] to-[#D946EF]', delay: 0},
                {name: 'Guitars', icon: '🎸', color: 'from-[#D946EF] to-[#FB7185]', delay: 150},
                {name: 'Keyboards', icon: '🎹', color: 'from-[#FB7185] to-[#422C94]', delay: 300},
                {name: 'DJ Equipment', icon: '🎧', color: 'from-[#422C94] to-[#FB7185]', delay: 450}
              ].map((category, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${800 + category.delay}ms` }}
                >
                  <div className="relative group cursor-pointer h-60">
                    {/* Hover glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
                    
                    <div className="relative h-full rounded-xl overflow-hidden">
                      {/* Gradient background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                      
                      {/* Grid pattern */}
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgdHJhbnNmb3JtPSJzY2FsZSgxKSI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgZD0iTS41LjVoMjB2MjBoLTIweiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
                      
                      {/* Content container */}
                      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm p-8 flex flex-col justify-between border border-gray-800 rounded-xl overflow-hidden group-hover:border-gray-700 transition-colors duration-500">
                        {/* Top info */}
                        <div className="flex justify-between items-start">
                          <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                          <span className="text-5xl">{category.icon}</span>
                        </div>
                        
                        {/* Category info */}
                        <div>
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Brands</span>
                              <span className="text-white">28+</span>
                            </div>
                            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                              <div className={`h-full w-3/4 bg-gradient-to-r ${category.color}`}></div>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Products</span>
                              <span className="text-white">64+</span>
                            </div>
                            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                              <div className={`h-full w-1/2 bg-gradient-to-r ${category.color}`}></div>
                            </div>
                          </div>
                          
                          <button className="mt-4 w-full py-2 rounded-md bg-gray-800 text-gray-300 flex items-center justify-center space-x-2 group-hover:bg-gray-700 transition-colors duration-500">
                            <span>Explore Collection</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Featured products grid - new section */}
          <section className="mb-20">
            <div className={`mb-16 flex flex-col md:flex-row justify-between items-center transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
                <p className="text-gray-400">Discover our most popular high-end audio equipment</p>
              </div>
              
              <div className="mt-6 md:mt-0 flex space-x-1 bg-gray-800 rounded-lg p-1">
                {['New', 'Popular', 'Trending'].map((filter, idx) => (
                  <button 
                    key={idx} 
                    className={`px-4 py-2 rounded-md transition-colors duration-300 ${idx === 0 ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="group">
                  <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-[#D946EF]/10 hover:border-gray-700">
                    <div className="h-48 bg-gray-800 relative overflow-hidden">
                      {/* Placeholder for product image */}
                      <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-9xl opacity-20">
                        {index === 0 ? '🎸' : index === 1 ? '🎹' : '🎧'}
                      </div>
                      
                      {/* Overlay info */}
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 bg-[#D946EF] text-white text-xs rounded-md">NEW</span>
                      </div>
                      
                      {/* Quick actions */}
                      <div className="absolute right-4 top-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {[
                          <svg key="heart" className="w-8 h-8 p-2 bg-gray-900 rounded-full text-gray-400 hover:text-[#FB7185]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>,
                          <svg key="eye" className="w-8 h-8 p-2 bg-gray-900 rounded-full text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        ].map((icon, i) => (
                          <div key={i} className="transform transition-transform duration-300 hover:scale-110">
                            {icon}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-lg text-white">Premium {index === 0 ? 'Electric Guitar' : index === 1 ? 'MIDI Controller' : 'DJ Headphones'}</h3>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-4">Premium quality and professional sound output for studio and stage.</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-white">${599 + index * 100}</span>
                        <button className="p-2 rounded-full bg-gradient-to-r from-[#D946EF] to-[#FB7185] text-white">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={`mt-10 text-center transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <button className="px-8 py-3 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300">
                View All Products
              </button>
            </div>
          </section>
          
          {/* Call-to-action banner */}
          <section className={`mb-16 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative rounded-xl overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#422C94] to-[#FB7185] opacity-30"></div>
              
              {/* Pattern overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgdHJhbnNmb3JtPSJzY2FsZSgxKSI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgZD0iTS41LjVoMjB2MjBoLTIweiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
              
              <div className="relative py-12 px-8 sm:py-16 sm:px-12 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-8 md:mb-0 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-white mb-2">Join Our Newsletter</h2>
                  <p className="text-gray-300 max-w-md">Stay updated with the latest products, exclusive offers and audio technology news.</p>
                </div>
                
                <div className="w-full md:w-auto">
                  <div className="flex flex-col sm:flex-row items-center">
                    <input 
                      type="email" 
                      placeholder="Your email" 
                      className="w-full sm:w-64 px-4 py-3 bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-l-md focus:outline-none focus:border-[#D946EF] text-white"
                    />
                    <button className="w-full sm:w-auto mt-3 sm:mt-0 px-6 py-3 bg-gradient-to-r from-[#D946EF] to-[#FB7185] text-white font-medium rounded-r-md hover:from-[#D946EF]/90 hover:to-[#FB7185]/90 transition-colors duration-300">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      
     
    </div>
  );
};

export default Home;