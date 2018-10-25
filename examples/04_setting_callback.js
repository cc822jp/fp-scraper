/**
 * (4) Setting Callback
 */
const FpScraper = require('../../fp-scraper');

(async() => {
  const scraper = new FpScraper({
    urls: [
      'http://k.nhk.jp/',
      'http://gamba-osaka.jp/',
      'https://www.fujitv.co.jp/m/',
      'http://onepieceportal.com/',
      'http://www.ex-m.jp'
    ],
    outputDir: './results/screenshot/2018-01-01/',
    cbSuccess: url => {
      console.log(`Done: ${url}`);
    },
    cbError: url => {
      console.log(`Error: ${url}`);
    }
  });

  await scraper.scrape().then(() => {
    console.log('END');
  });
})();
