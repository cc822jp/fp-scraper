const config = {
  urls: [],
  uid: 'testUid',
  serial: 'testSerial',
  outputDir: './results/screenshot/',
  cbSuccess: null,
  cbError: null,
  device: {
    name: 'SoftBank 930SH',
    isFP: true,
    userAgent:
      'SoftBank/1.0/930SH/SHJ001[__SERIAL__] Browser/NetFront/3.4 Profile/MIDP-2.0 Configuration/CLDC-1.1',
    viewport: {
      width: 260,
      height: 854,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: false
    },
    extraHTTPHeaders: {
      'x-s-display-info': '',
      'accept-language': 'ja-JP;q=1.0',
      'x-jphone-uid': '[__UID__]',
      'x-jphone-msname': 'V602T',
      'x-msim-use': 'on',
      'x-jphone-sound': '5',
      'x-jphone-smaf': '64/pcm/grf/rs',
      'x-jphone-color': 'C65536',
      'x-jphone-display': '240*261',
      'Accept-Charset': 'Shift_JIS',
      'Content-Type': 'text/html; charset=Shift_JIS',
    }
  },
  puppeteerOptions: {
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
};

module.exports = config;
