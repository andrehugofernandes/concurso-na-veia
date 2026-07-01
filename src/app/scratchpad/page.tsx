import React from 'react';
import HomeHeader from '@/components/home/HomeHeader';
import HomeHero from '@/components/home/HomeHero';

export const metadata = {
  title: 'Scratchpad - UI Tests',
};

export default function ScratchpadPage() {
  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-900">
      {/* 
        This is a controlled environment to test the responsiveness 
        of the Landing Page components (Header + Hero)
      */}
      <HomeHero />
    </main>
  );
}
