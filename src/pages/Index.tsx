
import React, { useState } from "react";
import Header from "@/components/Header";
import ResumeInput from "@/components/ResumeInput";
import FeedbackSection from "@/components/FeedbackSection";
import TemplateSection from "@/components/TemplateSection";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [resumeData, setResumeData] = useState<{
    text: string;
    file: File | null;
    jobRole: string;
    fileType: string;
  } | null>(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState<{
    summary: string;
    improvements: string[];
    tailoring: string[];
    score: number;
  } | null>(null);

  const handleResumeSubmit = (data: {
    text: string;
    file: File | null;
    jobRole: string;
    fileType: string;
  }) => {
    setResumeData(data);
    setIsProcessing(true);
    
    // Simulate API call to gemini-1.5-flash
    setTimeout(() => {
      const mockFeedback = generateMockFeedback(data.jobRole);
      setFeedback(mockFeedback);
      setIsProcessing(false);
    }, 2500);
  };

  const generateMockFeedback = (jobRole: string) => {
    return {
      summary: `Your resume shows strong experience but could benefit from more quantifiable achievements. For the ${jobRole} position, emphasize your technical skills and project outcomes more prominently. Consider restructuring your work experience to highlight relevant accomplishments first.`,
      improvements: [
        "Add more quantifiable metrics to demonstrate impact (e.g., 'Increased user engagement by 35%' instead of 'Improved user engagement')",
        "Reduce use of passive voice in your bullet points for more impactful statements",
        "Consolidate your skills section to focus on the most relevant technologies for this role",
        "Your summary is too generic - make it more specific to your unique value proposition",
        "Consider adding a dedicated section highlighting your most relevant projects"
      ],
      tailoring: [
        `Emphasize experience with technologies mentioned in the ${jobRole} job descriptions`,
        "Add keywords from the job posting throughout your resume to pass ATS screening",
        "Reorder your work history to prioritize roles most similar to this position",
        "Highlight collaborative projects and team leadership if mentioned in the job posting",
        `Customize your professional summary to specifically address how you're a perfect fit for ${jobRole}`
      ],
      score: 7
    };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <ResumeInput onSubmit={handleResumeSubmit} />
          
          <FeedbackSection 
            isLoading={isProcessing} 
            feedback={feedback} 
            jobRole={resumeData?.jobRole || ""}
          />
        </div>
        
        <Separator className="my-12" />
        
        <section className="mb-12">
          <TemplateSection />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
