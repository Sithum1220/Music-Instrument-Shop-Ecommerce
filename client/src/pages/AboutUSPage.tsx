import React from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiUsers, FiMusic, FiHeart, FiStar, FiTruck, FiHeadphones, FiSmile } from 'react-icons/fi';

// You can replace these with your actual team images
const teamMember1 = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&h=200&q=80";
const teamMember2 = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&h=200&q=80";
const teamMember3 = "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&h=200&q=80";

// You can replace this with an actual store image
const storeImage = "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#111827] text-gray-200 flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgdHJhbnNmb3JtPSJzY2FsZSgxKSI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDIyQzk0IiBzdHJva2Utd2lkdGg9IjAuNSIgZD0iTS41LjVoMjB2MjBoLTIweiIvPjwvZz48L3N2Zz4=')]"></div>
        </div>
        
        {/* Animated glow orbs */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#3B1D8F] rounded-full opacity-5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#D946EF] rounded-full opacity-5 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 right-1/2 w-72 h-72 bg-[#FB7185] rounded-full opacity-5 blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              backgroundColor: i % 3 === 0 ? '#D946EF' : i % 3 === 1 ? '#FB7185' : '#3B1D8F',
              opacity: 0.4,
              filter: 'blur(1px)',
              animation: `floatingAboutParticle ${Math.random() * 15 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 bg-gray-900/70 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center group">
              {/* Logo symbol */}
              <div className="relative flex items-center justify-center w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md opacity-60 blur-sm group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gray-900 rounded-md transform -translate-x-0.5 -translate-y-0.5"></div>
                <span className="relative text-white font-bold">EN</span>
              </div>

              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D946EF] to-[#FB7185] hidden sm:inline-block">
                ECHO NEXUS
              </span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
              >
                Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/ContactUs"
                className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B1D8F]/40 via-[#D946EF]/30 to-[#FB7185]/40"></div>
        
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute transform -rotate-12 translate-x-1/4 -translate-y-1/4">
            <FiMusic className="w-96 h-96 text-[#D946EF]" />
          </div>
          <div className="absolute bottom-0 right-0 transform rotate-12 translate-x-1/4 translate-y-1/4">
            <FiHeadphones className="w-96 h-96 text-[#FB7185]" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 drop-shadow-md">About Us</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-[#D946EF] to-[#FB7185] mx-auto mb-8 rounded-full"></div>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300">
            Your rhythmic instrument haven, providing quality musical instruments and expert guidance since 2015.
          </p>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 bg-gray-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#3B1D8F] via-[#D946EF] to-[#FB7185] rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
              <div className="relative rounded-lg overflow-hidden shadow-2xl border border-gray-800">
                <img 
                  src={storeImage} 
                  alt="ECHO NEXUS Store" 
                  className="w-full h-auto rounded-lg transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-6 relative">
                Our Story
                <div className="h-1 w-16 bg-gradient-to-r from-[#D946EF] to-[#FB7185] mt-3 rounded-full"></div>
              </h2>
              <div className="space-y-4 text-gray-300">
                <p className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-[#D946EF] before:to-[#FB7185] before:rounded-full">
                  ECHO NEXUS was founded in 2015 with a simple vision: to provide high-quality musical instruments to enthusiasts, professionals, and beginners alike. What started as a small shop in Colombo has now grown into a trusted name in the music industry.
                </p>
                <p>
                  Our founder, Nishantha Karunaratne, a passionate musician himself, believed that everyone deserves access to quality instruments at fair prices. This principle continues to guide our business today.
                </p>
                <p>
                  Over the years, we've expanded our collection to include a wide range of instruments from renowned brands worldwide, while maintaining our commitment to quality and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 bg-[#0F172A]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Our Values</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#D946EF] to-[#FB7185] mx-auto mb-12 rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FiAward className="w-10 h-10" />, title: "Quality", description: "We meticulously select each instrument for its craftsmanship and sound quality, ensuring you get nothing but the best." },
              { icon: <FiUsers className="w-10 h-10" />, title: "Community", description: "We believe in building a community of musicians who inspire each other and share their passion for music." },
              { icon: <FiHeart className="w-10 h-10" />, title: "Passion", description: "Our team consists of musicians who are passionate about helping you find the perfect instrument for your musical journey." },
              { icon: <FiSmile className="w-10 h-10" />, title: "Customer Focus", description: "Your satisfaction is our priority. We're committed to providing exceptional service before and after your purchase." }
            ].map((value, index) => (
              <div key={index} className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-lg border border-gray-700 hover:border-[#D946EF]/50 transition-all duration-300 group hover:bg-gray-800/80 hover:shadow-lg hover:shadow-[#D946EF]/10">
                <div className="text-[#D946EF] mb-4 bg-gray-900/60 inline-block p-3 rounded-lg border border-gray-700 group-hover:border-[#D946EF]/40 group-hover:bg-[#D946EF]/10 transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#FB7185] transition-colors duration-300">{value.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-[#111827] relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D946EF]/50 to-transparent"></div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FB7185]/50 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Why Choose ECHO NEXUS</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#FB7185] to-[#D946EF] mx-auto mb-12 rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FiStar className="w-6 h-6" />, title: "Expert Guidance", description: "Our team of experienced musicians provides personalized advice to help you make informed decisions." },
              { icon: <FiTruck className="w-6 h-6" />, title: "Fast Delivery", description: "We ensure prompt delivery of your instruments, carefully packaged to reach you in perfect condition." },
              { icon: <FiHeadphones className="w-6 h-6" />, title: "After-Sales Support", description: "Our relationship doesn't end with your purchase. We're here to support you throughout your musical journey." }
            ].map((feature, index) => (
              <div key={index} className="flex items-start p-6 rounded-lg border border-gray-800 bg-gray-900/30 backdrop-blur-sm hover:bg-gray-800/50 hover:border-[#D946EF]/40 transition-all duration-300 group">
                <div className="flex-shrink-0 bg-gradient-to-r from-[#3B1D8F] to-[#D946EF] rounded-full p-3 text-white">
                  {feature.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#FB7185] transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-16 bg-[#0F172A] relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D946EF]/50 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Meet Our Team</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#D946EF] to-[#FB7185] mx-auto mb-12 rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { image: teamMember1, name: "Nishantha Karunaratne", role: "Founder & CEO", description: "Musician and entrepreneur with over 20 years of experience in the music industry." },
              { image: teamMember2, name: "Kasun Perera", role: "Music Specialist", description: "Professional guitarist with extensive knowledge of string instruments and amplification." },
              { image: teamMember3, name: "Samanthi Fernando", role: "Customer Experience", description: "Dedicated to ensuring every customer has an exceptional experience with ECHO NEXUS." }
            ].map((member, index) => (
              <div key={index} className="text-center group">
                <div className="mb-6 relative mx-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-40 h-40 rounded-full mx-auto object-cover border-2 border-gray-800 group-hover:border-[#D946EF] transition-colors duration-300"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="text-[#FB7185] mb-2">{member.role}</p>
                <p className="text-gray-400 max-w-xs mx-auto group-hover:text-gray-300 transition-colors duration-300">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B1D8F]/80 via-[#D946EF]/50 to-[#FB7185]/80 opacity-50"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="stars"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Start Your Musical Journey?</h2>
          <div className="h-1 w-20 bg-white mx-auto mb-8 rounded-full"></div>
          <p className="text-xl max-w-3xl mx-auto mb-10 text-gray-200">
            Explore our collection of premium instruments and find the perfect one for you.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/product-list"
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative px-8 py-3 bg-gray-900 text-white font-medium rounded-lg">
                Browse Products
              </div>
            </Link>
            <Link
              to="/contact-us"
              className="px-8 py-3 bg-gray-800/80 text-white font-medium rounded-lg border border-[#D946EF]/50 hover:bg-gray-800 hover:border-[#FB7185] transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900/70 backdrop-blur-md border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative flex items-center justify-center w-8 h-8 mr-2">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md opacity-60 blur-sm"></div>
                <div className="absolute inset-0 bg-gray-900 rounded-md transform -translate-x-0.5 -translate-y-0.5"></div>
                <span className="relative text-white font-bold">EN</span>
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D946EF] to-[#FB7185] font-medium">ECHO NEXUS</span>
            </div>
            
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} ECHO NEXUS. All rights reserved.
            </p>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/" className="text-gray-400 hover:text-[#D946EF] transition-colors duration-300">Home</Link>
              <Link to="/product-list" className="text-gray-400 hover:text-[#D946EF] transition-colors duration-300">Products</Link>
              <Link to="/contact-us" className="text-gray-400 hover:text-[#D946EF] transition-colors duration-300">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
      
     
    </div>
  );
};

export default AboutUs;