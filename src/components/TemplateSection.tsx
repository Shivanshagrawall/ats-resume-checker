
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

const templates = [
  {
    id: 1,
    name: "Modern Professional",
    description: "Clean, contemporary layout ideal for corporate environments",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Creative Portfolio",
    description: "Visually striking layout for design and creative roles",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Technical Specialist",
    description: "Focused on technical skills and project accomplishments",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Executive Brief",
    description: "Concise format for senior management positions",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Academic CV",
    description: "Comprehensive layout for research and academic positions",
    image: "/placeholder.svg",
  },
];

const TemplateSection = () => {
  return (
    <Card className="resume-card w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Resume Templates</CardTitle>
        <CardDescription>
          Choose from our professional templates tailored for different industries
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap pb-6">
          <div className="flex w-max space-x-4 p-1">
            {templates.map((template) => (
              <Card key={template.id} className="template-card w-[250px] flex-shrink-0">
                <div className="relative h-[150px] bg-secondary/50 flex items-center justify-center">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/5 hover:bg-black/0 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                    <Button variant="secondary" size="sm" className="gap-1">
                      <ExternalLink className="h-3 w-3" /> Preview
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {template.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 text-xs gap-1"
                  >
                    <Download className="h-3 w-3" /> Use Template
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TemplateSection;
