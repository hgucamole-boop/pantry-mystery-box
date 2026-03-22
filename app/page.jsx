'use client';
import '@/styles/home.css';
import { useState, useEffect } from 'react';
import { HeroSection } from './home/components/HeroSection';
import { FeaturesSection } from './home/components/FeaturesSection';
import { PricingSection } from './home/components/PricingSection';
import { SignupSection } from './home/components/SignupSection';
import { Footer } from './home/components/Footer';
import { Navbar } from './components/Navbar';
import { ImpactCounter } from './home/components/ImpactCounter';

export default function SnackBoxLanding() {
  const [selectedPlan, setSelectedPlan] = useState('team');

  return (
    <div className="landing-container">
      <Navbar />
      <div className="page-content">
        <HeroSection />
        <ImpactCounter />
        <FeaturesSection />
        <PricingSection selectedPlan={selectedPlan} onSelectPlan={setSelectedPlan} />
        <SignupSection selectedPlan={selectedPlan} />
      </div>
      <Footer />
    </div>
  );
}