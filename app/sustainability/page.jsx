'use client';
import { useEffect } from 'react';
import { loadGAScript } from '../utils/ga';
import { SustainabilitySection } from '../components/SustainabilitySection';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';

export default function SustainabilityPage() {
  useEffect(() => {
    const cleanup = loadGAScript();
    return cleanup;
  }, []);

  return (
    <div className="landing-container">
      <Navbar />
      <div className="page-content">
        <SustainabilitySection />
      </div>
      <Footer />
    </div>
  );
}