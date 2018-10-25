/**
 * (3) Setting Device
 */
const FpScraper = require('../../fp-scraper');

(async() => {
  const scraper = new FpScraper({
    urls: ['https://google.com'],
    deviceName: 'PC-Wide'
  });

  await scraper.scrape();
})();
