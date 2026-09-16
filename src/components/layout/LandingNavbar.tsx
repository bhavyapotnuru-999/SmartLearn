import React, { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import { GraduationCap, Menu, X, ArrowRight } from 'lucide-react';

export const LandingNavbar: React.FC<{
  onScrollTo: (sectionId: string) => void;
}> = ({ onScrollTo }) => {
  const { navigateTo } = useStudent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onScrollTo(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      id="landing-navbar"
      className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-900 font-heading text-xl tracking-tight">
            SmartLearn
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button
            onClick={() => handleNavClick('hero')}
            className="hover:text-indigo-600 transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('features')}
            className="hover:text-indigo-600 transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="hover:text-indigo-600 transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('community-preview')}
            className="hover:text-indigo-600 transition-colors"
          >
            Community
          </button>
        </div>

        {/* Auth CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <button
            id="landing-login-btn"
            onClick={() => navigateTo('login')}
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Log In
          </button>
          <button
            id="landing-get-started-btn"
            onClick={() => navigateTo('signup')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-200 transition-all hover:gap-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <button
            onClick={() => handleNavClick('hero')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-indigo-600"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('features')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-indigo-600"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-indigo-600"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('community-preview')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-indigo-600"
          >
            Community
          </button>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('login');
              }}
              className="w-full py-2.5 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl text-center"
            >
              Log In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('signup');
              }}
              className="w-full py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl text-center shadow-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
