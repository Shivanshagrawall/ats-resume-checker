
import { toast } from "sonner";

interface GeminiResponse {
  summary: string;
  improvements: string[];
  tailoring: string[];
  score: number;
}

export async function analyzeResume(resumeText: string, jobRole: string): Promise<GeminiResponse> {
  try {
    const apiKey = "AIzaSyD3og9AWkGs2EypeTAzpDQztna2p4yYNiw";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const prompt = `
    Analyze the following resume for a ${jobRole} position. 
    Provide constructive feedback in the following JSON format:
    {
      "summary": "Brief overview of the resume strengths and weaknesses (2-3 sentences)",
      "improvements": ["List 5 specific improvements to make the resume better"],
      "tailoring": ["List 5 specific suggestions to tailor the resume for the ${jobRole} position"],
      "score": A number from 1-10 rating the resume's current effectiveness for this role
    }
    
    Resume:
    ${resumeText}
    `;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to analyze resume");
    }
    
    const data = await response.json();
    
    // Extract the text response from Gemini
    const textResponse = data.candidates[0].content.parts[0].text;
    
    // Find the JSON object in the response (Gemini might wrap it in markdown code blocks or extra text)
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse Gemini response");
    }
    
    // Parse the JSON
    const parsedResponse = JSON.parse(jsonMatch[0]) as GeminiResponse;
    return parsedResponse;
    
  } catch (error) {
    console.error("Gemini API error:", error);
    toast.error("Failed to analyze resume. Please try again later.");
    
    // Return a fallback response in case of error
    return {
      summary: "We couldn't analyze your resume at this time. Please try again later.",
      improvements: ["Service temporarily unavailable"],
      tailoring: ["Service temporarily unavailable"],
      score: 0,
    };
  }
}
