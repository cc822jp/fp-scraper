/**
 * (5) Setting Puppeteer
 */
const FpScraper = require('../../fp-scraper');

(async() => {
  const scraper = new FpScraper({
    urls: ['http://onepieceportal.com/', 'http://www.ex-m.jp'],
    customPuppeteer: async(browser, page) => {
      await page.setViewport({ width: 375, height: 1000 });
    }
  });

  await scraper.scrape();
})();
