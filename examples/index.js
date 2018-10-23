const scraper = require('../../fp-scraper');

(async () => {
  // ./results/screenshot に結果格納
  await scraper({
    urls: [
      'http://k.nhk.jp/'
    ]
  });

  // UID, callbackの設定
  await scraper({
    urls: [
      'http://k.nhk.jp/',
      'http://k.nhk.jp/knews/',
      'http://k.nhk.jp/knews/20181023/k10011682581000.html',
      'https://www.fujitv.co.jp/m/',
      'https://www.fujitv.co.jp/ap2/timetable/Mdaily',
      'http://www.ex-m.jp',
      'http://www.ex-m.jp/?page=topics'
    ],
    uid: 'testUid',
    outputDir: './results/screenshot/2018-01-01/',
    cbSuccess: url => {
      console.log(`Done: ${url}`);
    },
    cbError: url => {
      console.log(`Error: ${url}`);
    }
  }).then(() => {
    console.log('END');
  });
})();
