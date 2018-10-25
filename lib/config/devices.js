module.exports = [
  // ------------------------------------------
  // FP
  // ------------------------------------------
  {
    name: 'FP',
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
      'x-jphone-display': '260*261',
      'Accept-Charset': 'Shift_JIS',
      'Content-Type': 'text/html; charset=Shift_JIS'
    }
  },
  // ------------------------------------------
  // SP
  // ------------------------------------------
  {
    name: 'SP',
    isFP: false,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    viewport: {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    },
    extraHTTPHeaders: {}
  },
  // ------------------------------------------
  // PC
  // ------------------------------------------
  {
    name: 'PC',
    isFP: false,
    viewport: {
      width: 1024,
      height: 768,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: false
    },
    extraHTTPHeaders: {}
  },
  {
    name: 'PC-Wide',
    isFP: false,
    viewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: false
    },
    extraHTTPHeaders: {}
  }
];

for (const device of module.exports) module.exports[device.name] = device;
