import { takeScreenshot } from '../services/screenshotService.js';
import { analyzeImage } from '../services/aiService.js';
import SiteData from '../models/SiteData.js';
import fs from 'fs';

export const analyzeUrl = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  let imagePath = null;

  try {
    // 1. Take Screenshot
    console.log(`📸 Capturing: ${url}`);
    imagePath = await takeScreenshot(url);

    // 2. Analyze with AI
    console.log(`🤖 Analyzing with Gemini...`);
    const aiData = await analyzeImage(imagePath);

    // 3. Save to DB
    const newRecord = new SiteData({
      url,
      ...aiData
    });
    await newRecord.save();

    // 4. Cleanup Temp File
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.status(200).json(newRecord);

  } catch (error) {
    // Cleanup on error
    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    res.status(500).json({ error: error.message });
  }
};