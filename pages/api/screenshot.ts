import type { NextApiRequest, NextApiResponse } from "next";
const puppeteer = require("puppeteer");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url, type } = req.query;

  const outPut = type
    ? type === "base64"
      ? { encoding: "base64" }
      : { type }
    : { type: "png" };

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  let browser;

  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
    await page.goto(url, {
      timeout: 15 * 1000,
      waitUntil: ["domcontentloaded"],
    });
    await page.waitForTimeout(2000);
    const screenshot = await page.screenshot(outPut);
    if (type !== "base64") {
      res.status(200).send(screenshot);
    }
    res.status(200).json({ image: screenshot });
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
