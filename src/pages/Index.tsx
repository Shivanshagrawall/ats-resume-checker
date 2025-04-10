
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
      
      // Use the Gemini API to analyze the resume
      const result = await analyzeResume(resumeText, data.jobRole);
      setFeedback(result);
    } catch (error) {
      console.error("Error processing resume:", error);
      toast.error("Failed to process resume. Please try again.");
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
