const duration = 1000;
const puppeteer = require('puppeteer');

// Username zacky
// Password cats
// Test code 147649

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto("https://tonesavvy.com/");

  await page.waitForSelector("#start-quiz", {timeout: 0});

  await page.reload({waitUntil: ["networkidle0"], timeout: 0});

  const startButton = await page.$('#start-quiz');
  await startButton.click();

  const intervalAnswers = await page.$$('.btn.btn-lg.btn-primary.interval-number-answer-btn.answer-btn');
  const qualityAnswers = await page.$$('.btn.btn-lg.btn-primary.interval-quality-answer-btn.answer-btn');

  const intervalDictionary = ["Unison", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Octave"];
  const qualityDictionary = ["Major", "Minor", "Perfect", "Augmented", "Diminished"];

  const generalInterval = await page.evaluate(() => {
    return Promise.resolve(document.querySelector("#general-checkbox").checked);
  });

  let interval;
  let quality;

  for(i=1; i>0; i++){
    interval = await page.evaluate(() => {
      return Promise.resolve(ex.currentIntervalNumber);
    });

    quality = await page.evaluate(() => {
      return Promise.resolve(ex.currentIntervalQuality);
    });

    await intervalAnswers[intervalDictionary.indexOf(interval)].click();

    if(!generalInterval){
      await qualityAnswers[qualityDictionary.indexOf(quality)].click();
    }

    await page.waitFor(duration);
  }

  //await browser.close();
})();
