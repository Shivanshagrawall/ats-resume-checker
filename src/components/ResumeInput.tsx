
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FileUploader } from "./FileUploader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, FileText, Upload } from "lucide-react";
import { toast } from "sonner";

interface ResumeInputProps {
  onSubmit: (data: { 
    text: string;
    file: File | null;
    jobRole: string;
    fileType: string;
  }) => void;
}

const ResumeInput = ({ onSubmit }: ResumeInputProps) => {
  const [resumeText, setResumeText] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [inputMethod, setInputMethod] = useState<"text" | "file">("text");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload PDF, DOCX or TXT file.");
      return;
    }

    setFile(file);
    toast.success(`File "${file.name}" uploaded successfully!`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputMethod === "text" && !resumeText.trim()) {
      toast.error("Please enter your resume text");
      return;
    }
    
    if (inputMethod === "file" && !file) {
      toast.error("Please upload a resume file");
      return;
    }
    
    if (!jobRole.trim()) {
      toast.error("Please enter a job role");
      return;
    }

    onSubmit({
      text: resumeText,
      file: file,
      jobRole: jobRole,
      fileType: file?.type || "",
    });
  };

  return (
    <Card className="resume-card">
      <CardHeader>
        <CardTitle className="text-2xl">Scan Your Resume with ATS Resume Checker</CardTitle>
        <CardDescription>
        Upload your resume or paste the text below. Our AI will instantly analyze your resume for ATS compatibility and give suggestions for improvement.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="text" onValueChange={(value) => setInputMethod(value as "text" | "file")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Paste Text
              </TabsTrigger>
              <TabsTrigger value="file" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload File
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resumeText">Paste Your Resume Text for ATS Analysis</Label>
                <Textarea
                  id="resumeText"
                  placeholder="Paste your resume text here..."
                  className="min-h-[200px]"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="file" className="space-y-4">
              <div className="space-y-2">
                <Label>Resume File</Label>
                <FileUploader onFileUpload={handleUpload} />
                {file && (
                  <div className="flex items-center gap-2 mt-2 p-2 border rounded bg-secondary/30">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm truncate">{file.name}</span>
                  </div>
                )}
              </div>
            </TabsContent>

            <div className="space-y-2 mt-6">
              <Label htmlFor="jobRole">Target Job Role (e.g., Frontend Developer at Google)</Label>
              <Input
                id="jobRole"
                placeholder="e.g., Frontend Developer at Google"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Specify the position to tailor your resume for better results
              </p>
            </div>

            <Button type="submit" className="w-full mt-6">
            Check Resume for ATS Compatibility
            </Button>
          </Tabs>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResumeInput;
