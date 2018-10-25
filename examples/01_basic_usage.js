/**
 * (1) Basic Usage
 */
const FpScraper = require('../../fp-scraper');

(async() => {
  const scraper = new FpScraper({
    urls: ['http://k.nhk.jp/']
  });

  await scraper.scrape();
})();
