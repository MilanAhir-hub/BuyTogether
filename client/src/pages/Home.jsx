import React from 'react';
import Hero from '../components/home/Hero';
import HowItWorksSection from '../components/home/HowItWorksSection';
import PropertiesSection from '../components/home/PropertiesSection';
import AboutSection from '../components/home/AboutSection';
import ContactSection from '../components/home/ContactSection';
import Button from '../components/ui/Button';
import { ArrowRight01Icon } from 'hugeicons-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div id="hero">
        <Hero />
      </div>
      
      {/* How it Works Section */}
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      
      {/* Properties Marketplace Preview Section */}
      <div id="properties">
        <PropertiesSection />
      </div>
      
      {/* About / Mission Section */}
      <div id="about">
        <AboutSection />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <ContactSection />
      </div>
      
      {/* Final Call to Action Section */}
      <section className="py-24 px-6 bg-secondary text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 blur-[120px] -ml-48 -mt-48 transition-all hover:scale-110 duration-700"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 italic">"Buy together, win together."</h2>
          <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 1L+ users who are already saving money on their dream properties. Don't buy alone when you can buy together.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/properties">
              <Button className="w-fit! px-10 py-4 text-base font-bold shadow-2xl shadow-primary/30 group">
                <span>Start Exploring</span>
                <ArrowRight01Icon size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="w-fit! px-10 py-4 text-base font-bold text-white border-white hover:bg-white hover:text-secondary">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
