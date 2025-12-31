import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

export const takeScreenshot = async (url) => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set a reasonable viewport to ensure elements load
    await page.setViewport({ width: 1280, height: 800 });

    // Navigate to URL and wait for network idle
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Define temp path
    const timestamp = Date.now();
    const filePath = path.resolve('temp', `screenshot-${timestamp}.jpg`);

    // Capture full page
    await page.screenshot({
      path: filePath,
      fullPage: true,
      type: 'jpeg',
      quality: 60 // Lower quality to save tokens/bandwidth
    });

    await browser.close();
    return filePath;

  } catch (error) {
    console.error('Screenshot Error:', error);
    throw new Error('Failed to capture screenshot');
  }
};