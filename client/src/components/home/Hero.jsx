import React from "react";
import Button from "../ui/Button";
import { ArrowRight01Icon, PlusSignIcon } from "hugeicons-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Hero = () => {
  const { isAuthenticated, user } = useAuth();
  const isSeller = user?.role === 'Seller' || user?.role === 'Admin';

  return (
    <section className="relative flex flex-col items-center justify-center text-center bg-white text-slate-900 pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,var(--tw-gradient-from)_0%,transparent_50%)] from-primary/5 to-transparent -z-10"></div>

      {/* USERS BADGE */}
      <div className="flex items-center px-4 py-2 rounded-xl border border-slate-200 text-xs bg-white/80 backdrop-blur-md shadow-sm mb-8">
        <div className="flex items-center -space-x-2">
          <img
            className="w-8 h-8 rounded-xl border-2 border-white object-cover"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=64"
            alt=""
          />
          <img
            className="w-8 h-8 rounded-xl border-2 border-white object-cover"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=64"
            alt=""
          />
          <img
            className="w-8 h-8 rounded-xl border-2 border-white object-cover"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=64"
            alt=""
          />
        </div>
        <p className="ml-4 text-slate-600 font-semibold">
          1L+ users already saving together 🏠
        </p>
      </div>

      {/* HEADING */}
      <h1 className="text-4xl md:text-7xl font-bold max-w-5xl tracking-tight leading-[1.1] mb-6">
        Save Lakhs by Buying Property <span className="text-primary italic">Together</span> 💰
      </h1>

      {/* SUBTEXT */}
      <p className="text-slate-500 max-w-2xl text-lg md:text-xl leading-relaxed mb-10">
        Find like-minded buyers, join a group, and unlock exclusive property
        discounts that you simply can’t get alone.
      </p>

      {/* CTA BUTTONS */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <Link to="/properties">
          <Button className="w-fit! px-10 py-4 flex items-center justify-center gap-3 text-lg font-bold shadow-md hover:shadow-lg transition-all duration-300">
            <span>Find Your Group & Save</span>
            <ArrowRight01Icon size={22} />
          </Button>
        </Link>
      </div>

      {/* INFO BOX */}
      <div className="inline-flex items-center gap-3 bg-primary/5 border border-primary/10 rounded-xl px-6 py-3 text-sm text-slate-700">
        <div className="w-2 h-2 bg-primary rounded-xl animate-pulse"></div>
        <span>💡 Example: 2 buyers = up to <span className="text-primary font-bold">15% discount</span></span>
      </div>

      {/* TRUST BAR */}
      <div className="w-full max-w-5xl mx-auto mt-24 relative opacity-50 grayscale">
        <div className="flex justify-between items-center gap-8 py-6 text-slate-400 font-bold text-xs uppercase tracking-widest border-y border-slate-100">
          <span>Trusted Builders</span>
          <div className="w-1 h-1 bg-slate-200 rounded-xl"></div>
          <span>Verified Deals</span>
          <div className="w-1 h-1 bg-slate-200 rounded-xl"></div>
          <span>Secure Payments</span>
          <div className="w-1 h-1 bg-slate-200 rounded-xl"></div>
          <span>Group Discounts</span>
          <div className="w-1 h-1 bg-slate-200 rounded-xl"></div>
          <span>Smart Investment</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;