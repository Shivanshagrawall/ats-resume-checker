
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle2, Edit, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface FeedbackSectionProps {
  isLoading: boolean;
  feedback: {
    summary: string;
    improvements: string[];
    tailoring: string[];
    score: number;
  } | null;
  jobRole: string;
}

const FeedbackSection = ({ isLoading, feedback, jobRole }: FeedbackSectionProps) => {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Processing Your Resume</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="h-16 w-16 animate-pulse rounded-full bg-primary/30 flex items-center justify-center mb-4">
            <div className="h-10 w-10 rounded-full bg-primary/60 animate-ping"></div>
          </div>
          <p className="text-center text-muted-foreground">
            Our AI is analyzing your resume and preparing personalized feedback...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!feedback) return null;

  return (
    <Card className="resume-card w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">AI-Powered Feedback</CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Score: {feedback.score}/10
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="improvements" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Improvements
            </TabsTrigger>
            <TabsTrigger value="tailoring" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Job Tailoring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            <div className="rounded-md bg-secondary/50 p-4">
              <h3 className="font-medium mb-2">Overall Feedback</h3>
              <p className="text-muted-foreground">{feedback.summary}</p>
            </div>
          </TabsContent>

          <TabsContent value="improvements" className="space-y-4">
            <div className="rounded-md bg-secondary/50 p-4">
              <h3 className="font-medium mb-2">Suggested Improvements</h3>
              <ul className="space-y-3">
                {feedback.improvements.map((improvement, index) => (
                  <li key={index} className="flex gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-sm">{improvement}</p>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="tailoring" className="space-y-4">
            <div className="rounded-md bg-secondary/50 p-4">
              <h3 className="font-medium mb-2">
                Tailoring for{" "}
                <span className="text-primary font-semibold">{jobRole}</span>
              </h3>
              <ul className="space-y-3">
                {feedback.tailoring.map((suggestion, index) => (
                  <li key={index} className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <p className="text-sm">{suggestion}</p>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FeedbackSection;
