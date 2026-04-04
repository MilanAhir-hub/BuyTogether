import React from "react";
import Button from "../ui/Button";
import { ArrowRight01Icon, PlusSignIcon } from "hugeicons-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Hero = () => {
  const { isAuthenticated, user } = useAuth();
  const isSeller = user?.role === 'Seller' || user?.role === 'Admin';

  return (
    <section className="relative flex flex-col items-center justify-center text-center bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradientBg.svg')] bg-cover text-gray-800 pb-24 px-4 overflow-hidden">

      {/* USERS BADGE */}
      <div className="flex items-center mt-28 px-4 py-2 rounded-full border border-orange-200 text-xs bg-white shadow-sm backdrop-blur-md">
        <div className="flex items-center">
          <img
            className="w-7 h-7 rounded-full border-2 border-white"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
            alt=""
          />
          <img
            className="w-7 h-7 rounded-full border-2 border-white -ml-2"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
            alt=""
          />
          <img
            className="w-7 h-7 rounded-full border-2 border-white -ml-2"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50"
            alt=""
          />
        </div>
        <p className="ml-3 text-gray-600 font-medium">
          1L+ users already saving together 🏠
        </p>
      </div>

      {/* HEADING */}
      <h1 className="text-4xl md:text-6xl font-semibold max-w-4xl mt-6 leading-tight bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">
        Save Lakhs by Buying Property Together 💰
      </h1>

      {/* SUBTEXT */}
      <p className="text-gray-600 max-w-xl mt-5 text-base md:text-lg">
        Find like-minded buyers, join a group, and unlock exclusive property
        discounts that you simply can’t get alone.
      </p>

      {/* CTA BUTTONS */}
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link to="/properties">
          <Button className="w-80 px-8 py-3 flex items-center justify-between! text-base shadow-lg hover:scale-105 transition-all duration-300">
            <span className="flex-1 text-center font-medium">Find Your Group & Save</span>
            <ArrowRight01Icon size={22} variant="stroke" strokeWidth={2} />
          </Button>
        </Link>
      </div>

      {/* INFO BOX */}
      <div className="bg-gradient-to-r from-primary/20 to-primary-light/20 p-[1px] rounded-lg mt-10 shadow-sm">
        <div className="bg-white rounded-lg px-5 py-3 text-sm text-gray-700">
          💡 Example: 2 buyers = up to{" "}
          <span className="text-primary font-semibold">15% discount</span>
        </div>
      </div>

      {/* TRUST BAR */}
      <div className="overflow-hidden w-full max-w-5xl mx-auto mt-20 relative">
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10"></div>

        <div className="flex gap-16 py-4 animate-[scroll_20s_linear_infinite] whitespace-nowrap text-gray-400 font-medium text-sm">
          <span>Trusted Builders</span>
          <span>Verified Deals</span>
          <span>Secure Payments</span>
          <span>Group Discounts</span>
          <span>Smart Investment</span>
        </div>

        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
      </div>

      {/* OPTIONAL: SUBTLE GLOW EFFECT */}
      <div className="absolute top-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default Hero;