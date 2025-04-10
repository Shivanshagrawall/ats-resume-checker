
import React, { useState } from "react";
import Header from "@/components/Header";
import ResumeInput from "@/components/ResumeInput";
import FeedbackSection from "@/components/FeedbackSection";
import Footer from "@/components/Footer";
import { analyzeResume } from "@/services/geminiService";
import { toast } from "sonner";

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

  const handleResumeSubmit = async (data: {
    text: string;
    file: File | null;
    jobRole: string;
    fileType: string;
  }) => {
    setResumeData(data);
    setIsProcessing(true);
    setFeedback(null); // Clear previous feedback while processing
    
    try {
      // If a file was uploaded but no text was extracted yet, handle it here
      let resumeText = data.text;
      
      if (!resumeText && data.file) {
        // For this implementation, we'll show a message that file content extraction
        // would be implemented in a full version
        toast.info("File content extraction would be implemented in a full version. Using mock data for demo.");
        resumeText = "Sample resume content from uploaded file";
      }
      
      if (!resumeText) {
        toast.error("Please provide resume text or upload a file");
        setIsProcessing(false);
        return;
      }
      
      if (!data.jobRole.trim()) {
        toast.error("Please specify a target job role");
        setIsProcessing(false);
        return;
      }
      
      // Use the Gemini API to analyze the resume
      console.log("Submitting resume for analysis:", { 
        textLength: resumeText.length,
        jobRole: data.jobRole
      });
      
      const result = await analyzeResume(resumeText, data.jobRole);
      console.log("Analysis result received:", result);
      setFeedback(result);
    } catch (error) {
      console.error("Error processing resume:", error);
      toast.error("Failed to process resume. Please try again or use different text.");
      
      // Set a more user-friendly error feedback
      setFeedback({
        summary: "We couldn't process your resume at this time. Please try again later.",
        improvements: ["The service is temporarily unavailable. Please try again in a few minutes."],
        tailoring: ["While waiting, you can review and edit your resume text."],
        score: 0
      });
    } finally {
      setIsProcessing(false);
    }
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
