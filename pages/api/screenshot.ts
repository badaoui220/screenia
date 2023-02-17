import type { NextApiRequest, NextApiResponse } from "next";
const puppeteer = require("puppeteer-core");
const chrome = require("chrome-aws-lambda");

const exePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function getOptions() {
  const env = process.env.NODE_ENV;
  let options;
  if (env == "development") {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  } else {
    options = {
      args: [
        ...chrome.args,
        "--autoplay-policy=user-gesture-required",
        "--disable-background-networking",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-breakpad",
        "--disable-client-side-phishing-detection",
        "--disable-component-update",
        "--disable-default-apps",
        "--disable-dev-shm-usage",
        "--disable-domain-reliability",
        "--disable-extensions",
        "--disable-features=AudioServiceOutOfProcess",
        "--disable-hang-monitor",
        "--disable-ipc-flooding-protection",
        "--disable-notifications",
        "--disable-offer-store-unmasked-wallet-cards",
        "--disable-popup-blocking",
        "--disable-print-preview",
        "--disable-prompt-on-repost",
        "--disable-renderer-backgrounding",
        "--disable-setuid-sandbox",
        "--disable-speech-api",
        "--disable-sync",
        "--hide-scrollbars",
        "--ignore-gpu-blacklist",
        "--metrics-recording-only",
        "--mute-audio",
        "--no-default-browser-check",
        "--no-first-run",
        "--no-pings",
        "--no-sandbox",
        "--no-zygote",
        "--password-store=basic",
        "--use-gl=swiftshader",
        "--use-mock-keychain",
      ],
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }
  return options;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url, type = "png", download = false, fullscreen = false } = req.query;

  const outPut = { type, fullPage: fullscreen };

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  const options = await getOptions();

  try {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
    await page.goto(url as string, { waitUntil: "networkidle2" });

    const screenshot = await page.screenshot(outPut);
    await browser.close();

    if (download) {
      res.status(200).send(screenshot);
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", `image/${type}`);
      res.end(screenshot);
    }
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
}

export const config = {
  api: {
    bodyParser: process.env.NODE_ENV !== "production",
  },
};
