
import React from "react";
import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        <div className="flex items-center space-x-1">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium">AI Resume & Portfolio Assistant</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Enhance your career prospects with AI-powered resume optimization
        </p>
        <p className="text-xs text-muted-foreground mt-4">
          © {new Date().getFullYear()} AI Resume Assistant. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
