import { takeScreenshot } from '../services/screenshotService.js';
import { analyzeImage } from '../services/aiService.js';
import SiteData from '../models/SiteData.js';
import { isValidUrl } from '../utils/validators.js'; // Import added
import fs from 'fs';

export const analyzeUrl = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // VALIDATION ADDED HERE
  if (!isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid URL format. Must include http:// or https://' });
  }

  let imagePath = null;

  try {
    console.log(`📸 Capturing: ${url}`);
    imagePath = await takeScreenshot(url);

    console.log(`🤖 Analyzing with Gemini...`);
    const aiData = await analyzeImage(imagePath);

    const newRecord = new SiteData({
      url,
      ...aiData
    });
    await newRecord.save();

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.status(200).json(newRecord);

  } catch (error) {
    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};