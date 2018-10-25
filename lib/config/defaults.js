const config = {
  urls: [],
  uid: 'TEST_UID',
  serial: 'TEST_SERIAL',
  outputDir: './results/screenshot/',
  cbSuccess: null,
  cbError: null,
  deviceName: 'FP',
  customPuppeteer: null,
  puppeteerOptions: {
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
};

module.exports = config;
