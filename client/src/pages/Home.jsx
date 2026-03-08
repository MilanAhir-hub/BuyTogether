import React from "react";
import NavbarAuth from "../sections/home/NavbarAuth";
import WelcomeBanner from "../sections/home/WelcomeBanner";
import SearchSection from "../sections/home/SearchSection";
import FeaturedProperties from "../sections/home/FeaturedProperties";
import RecommendedProperties from "../sections/home/RecommendedProperties";
import ActiveGroupsSection from "../sections/home/ActiveGroupsSection";
import StatisticsSection from "../sections/home/StatisticsSection";
import FooterSection from "../sections/home/FooterSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <NavbarAuth />
      
      <main className="flex-1">
        <div className="space-y-8 pb-12">
          <WelcomeBanner />
          <SearchSection />
          <FeaturedProperties />
          <RecommendedProperties />
          <ActiveGroupsSection />
          <StatisticsSection />
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
