import puppeteer from "puppeteer";
import fs from 'fs';
import {setTimeout} from 'timers/promises'


(async () => {
  if(fs.existsSync('result.pdf')) {
    fs.rmSync('result.pdf');
  }
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'load' });
  await setTimeout(5000);

  // await page.emulateMediaType('screen');

  const pdf = await page.pdf({
    path: 'result.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    preferCSSPageSize: true,
    format: 'A2',
  });

  await browser.close();
})()