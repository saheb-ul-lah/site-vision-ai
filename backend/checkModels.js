import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

console.log("🔍 Checking available models for your API Key...");

fetch(URL)
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      console.error("❌ API Error:", data.error.message);
    } else {
      console.log("✅ Available Models (Content Generation):");
      const models = data.models || [];
      const chatModels = models.filter(m => m.supportedGenerationMethods.includes("generateContent"));
      
      if (chatModels.length === 0) {
        console.log("⚠️ No chat models found. Check your API key permissions.");
      }

      chatModels.forEach(m => {
        console.log(`   👉 ${m.name.replace("models/", "")}`);
      });
    }
  })
  .catch(err => console.error("❌ Network Error:", err));