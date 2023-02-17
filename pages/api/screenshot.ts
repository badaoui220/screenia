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
      args: chrome.args,
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
    let page = null;
    if (!fullscreen) {
      page = await browser.newPage();
    } else {
      page = (await browser.pages())[0];
    }
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
    await page.goto(url as string);

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
