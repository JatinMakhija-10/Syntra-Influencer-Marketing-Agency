'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServiceMarquee from '@/components/sections/ServiceMarquee';
import CreatorNetworkSection from '@/components/sections/CreatorNetworkSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProcessSection from '@/components/sections/ProcessSection';
import CampaignCaseStudiesSection from '@/components/sections/CampaignCaseStudiesSection';
import ContactSection from '@/components/sections/ContactSection';
import { Creator } from '@/types/creator';

export default function HomePage() {
  const [selectedCreatorForBooking, setSelectedCreatorForBooking] = useState<string>('');

  const handleBookCreator = (creator: Creator) => {
    setSelectedCreatorForBooking(creator.name);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-white">
      {/* Top Sticky Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero with Live Campaign Attribution Hub */}
        <HeroSection />

        {/* 2. Infinite Continuous Marquee */}
        <ServiceMarquee />

        {/* 3. Featured Brand Influencer Campaigns (Replaced Video Editing Masterworks) */}
        <CampaignCaseStudiesSection />

        {/* 4. Verified Creator & Channel Roster Directory */}
        <CreatorNetworkSection onSelectCreatorForBooking={handleBookCreator} />

        {/* 5. Agency Capabilities Bento Grid */}
        <ServicesSection />

        {/* 6. Campaign Execution Lifecycle & Verified Metrics */}
        <ProcessSection />

        {/* 7. Commercial Brand Collaboration & Campaign Inquiry Form */}
        <ContactSection prefilledCreator={selectedCreatorForBooking} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
