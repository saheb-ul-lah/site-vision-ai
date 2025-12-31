import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

export const analyzeImage = async (imagePath) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Analyze this website screenshot.
      Extract the following information and return it in strict JSON format.
      DO NOT use Markdown formatting (like \`\`\`json). Just return the raw JSON object.
      
      Fields required:
      1. business_name (string)
      2. about_section (string summary)
      3. faq (array of objects with "question" and "answer")
      4. contact (object with "email", "phone", "address")
      5. footer_text (string)

      If a field is not found, return null for strings or empty array for arrays.
    `;

    const imagePart = fileToGenerativePart(imagePath, "image/jpeg");

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    // Clean up markdown code blocks if Gemini adds them
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(cleanText);

  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw new Error("Failed to analyze image with AI");
  }
};