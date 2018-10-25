/**
 * (2) Setting UID
 */
const FpScraper = require('../../fp-scraper');

(async() => {
  const scraper = new FpScraper({
    urls: ['http://k.nhk.jp/'],
    uid: 'MY_CUSTOM_UID'
  });

  await scraper.scrape();
})();
