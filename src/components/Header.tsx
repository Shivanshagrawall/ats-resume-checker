
import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="container mx-auto py-6 md:py-12 px-4">
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-accent" />
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">
            AI Resume & Portfolio Assistant
          </h1>
          <Sparkles className="h-6 w-6 text-accent" />
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Your AI-powered career enhancer. Get personalized feedback, tailored improvements, and stand out from the competition.
        </p>
      </div>
    </header>
  );
};

export default Header;
