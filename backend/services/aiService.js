import Groq from "groq-sdk";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function encodeImage(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString("base64");
}

export const analyzeImage = async (imagePath) => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing in .env");
  }

  try {
    const base64Image = encodeImage(imagePath);
    
    // Check approximate size (Base64 string length * 0.75 = bytes)
    const sizeInBytes = base64Image.length * 0.75;
    const sizeInMB = sizeInBytes / (1024 * 1024);
    
    // Groq Base64 limit is 4MB. If larger, we might need to handle it (warn for now)
    if (sizeInMB > 4) {
      console.warn(`⚠️ Warning: Image size is ${sizeInMB.toFixed(2)}MB. Groq limit is 4MB. Request might fail.`);
    }

    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": `
                Analyze this website screenshot.
                Extract the following information and return it in strict JSON format.
                Do NOT include markdown formatting (like \`\`\`json). Just return the raw JSON string.

                Required Fields:
                {
                  "business_name": "Name of the business",
                  "about_section": "Short summary of the About section",
                  "faq": [{"question": "...", "answer": "..."}],
                  "contact": {"email": "...", "phone": "...", "address": "..."},
                  "footer_text": "Text found in the footer"
                }

                If a field is missing, use null or empty array.
              `
            },
            {
              "type": "image_url",
              "image_url": {
                "url": `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      // ✅ UPDATED MODEL to Llama 4 Scout (Latest supported vision model)
      "model": "meta-llama/llama-4-scout-17b-16e-instruct",
      "temperature": 0.1,
      "max_completion_tokens": 1024,
      "top_p": 1,
      "stream": false,
      "response_format": { "type": "json_object" }
    });

    const content = chatCompletion.choices[0]?.message?.content;
    return JSON.parse(content);

  } catch (error) {
    console.error("Groq Analysis Error:", error);
    // Handle specific Groq errors
    if (error.status === 413) {
      throw new Error("Screenshot is too large for Groq (Max 4MB). Try a smaller page.");
    }
    throw new Error(error.error?.message || "Failed to analyze image with Groq");
  }
};