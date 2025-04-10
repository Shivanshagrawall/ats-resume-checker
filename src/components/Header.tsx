
import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="container mx-auto py-6 md:py-12 px-4">
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-accent" />
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">
          Free ATS Resume Checker – AI-Powered Resume Optimization
          </h1>
          <Sparkles className="h-6 w-6 text-accent" />
        </div>
        <h2 className="text-lg text-muted-foreground max-w-2xl">
        Easily scan your resume with our free ATS resume checker. Get instant, AI-powered feedback to optimize for Applicant Tracking Systems and land more interviews.
        </h2>
      </div>
    </header>
  );
};

export default Header;
