
import { toast } from "sonner";

interface GeminiResponse {
  summary: string;
  improvements: string[];
  tailoring: string[];
  score: number;
}

export async function analyzeResume(resumeText: string, jobRole: string): Promise<GeminiResponse> {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;;
    console.log(apiKey);
    
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
    
    console.log("Sending request to Gemini API...");
    
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
      console.error("Gemini API error response:", errorData);
      throw new Error(errorData.error?.message || "Failed to analyze resume");
    }
    
    const data = await response.json();
    console.log("Received response from Gemini API:", data);
    
    // Extract the text response from Gemini
    const textResponse = data.candidates[0]?.content?.parts[0]?.text;
    
    if (!textResponse) {
      console.error("No text response from Gemini API:", data);
      throw new Error("Received empty response from AI service");
    }
    
    // Find the JSON object in the response (Gemini might wrap it in markdown code blocks or extra text)
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Could not parse JSON from response:", textResponse);
      throw new Error("Could not parse AI response format");
    }
    
    try {
      // Parse the JSON
      const parsedResponse = JSON.parse(jsonMatch[0]) as GeminiResponse;
      
      // Validate the response has all required fields
      if (!parsedResponse.summary || !parsedResponse.improvements || 
          !parsedResponse.tailoring || typeof parsedResponse.score !== 'number') {
        throw new Error("Invalid response format from AI service");
      }
      
      return parsedResponse;
    } catch (parseError) {
      console.error("JSON parsing error:", parseError, "Text:", jsonMatch[0]);
      throw new Error("Failed to parse AI response");
    }
    
  } catch (error) {
    console.error("Gemini API error:", error);
    toast.error("Failed to analyze resume. Please try again later.");
    
    // Return a more informative fallback response
    return {
      summary: "We couldn't analyze your resume at this time. This could be due to a temporary API issue or limitations in processing your resume content. Please try again with a different resume text or try later.",
      improvements: [
        "Ensure your resume text is clear and properly formatted",
        "Try with a shorter resume section if your content is very long",
        "Check your internet connection and try again",
        "The AI service might be experiencing high traffic", 
        "Try being more specific with your job role"
      ],
      tailoring: [
        "While waiting, consider reviewing your resume for typos or formatting issues",
        "Ensure your resume highlights relevant skills for the position",
        "Add measurable achievements when possible",
        "Research the company and role to better tailor your content",
        "Consider organizing your resume sections by relevance to the target role"
      ],
      score: 0,
    };
  }
}
