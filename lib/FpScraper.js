/**
 * FpScraper
 */
'use strict';

const _ = require('lodash');
const fs = require('fs');
const urlParser = require('url');
const puppeteer = require('puppeteer');
const logger = require('./logger');
const requestInterceptor = require('./requestInterceptor');

// config
const defaults = require('./config/defaults');
const devices = require('./config/devices');

class FpScraper {
  /**
   * constructor
   * @param {Object} options
   */
  constructor(options) {
    this._options = Object.assign(defaults, options);
  }

  /**
   * スクレピング
   * @return {Promise<void>}
   */
  async scrape() {
    if (!this._options.urls.length) throw new Error('Url list is empty.');

    // 結果格納先の設定
    this._makeResultDir();

    const browser = await puppeteer.launch(this._options.puppeteerOptions);
    const page = await browser.newPage();

    // デバイス情報の設定
    await this._setDeviceInfo(page);

    if (this._device.isFP) {
      await page.setRequestInterception(true);
      page.on(
          'request',
          async request => await requestInterceptor(page, request)
      );
    }

    if (this._options.customPuppeteer)
      await this._options.customPuppeteer(browser, page);

    // URLリストを走査
    for (let i = 0; i < this._options.urls.length; i++) {
      const url = this._options.urls[i];

      try {
        await page.goto(url, { waitUntil: 'load' });
        logger.info(`load: ${url}`);

        if (this._device.isFP) {
          await page.evaluate(() => {
            document.body.style.margin = '0px';
          });
        }

        const fileName = this._getScreenShotFileName(url);
        await page.screenshot({
          path: `${this._options.outputDir}/${fileName}.png`
        });

        this._options.cbSuccess && this._options.cbSuccess(url);
      } catch (e) {
        this._options.cbError && this._options.cbError(url);
      }
    }

    browser.close();
  }

  /**
   * 結果格納先の作成
   * @private
   */
  _makeResultDir() {
    const arr = this._options.outputDir.split('/');

    for (let i = 2; i <= arr.length; i++) {
      const dir = this._options.outputDir
          .split('/')
          .slice(0, i)
          .join('/');

      try {
        fs.mkdirSync(dir);
        logger.info(`Directory creation succeeded. ${dir}`);
      } catch (e) {
        logger.info(`Directory creation failed. ${dir}`);
      }
    }
  }

  /**
   * デバイス情報の設定
   * @param {Object} page
   * @return {Promise<void>}
   * @private
   */
  async _setDeviceInfo(page) {
    logger.info('Set Device Info.');

    const device = devices[this._options.deviceName];

    if (_.isEmpty(device)) throw new Error('device info not found');

    if (device.viewport) await page.setViewport(device.viewport);

    if (device.userAgent) {
      device.userAgent = device.userAgent
          .replace(/__SERIAL__/g, this._options.serial)
          .replace(/__UID__/g, this._options.uid);
      await page.setUserAgent(device.userAgent);
    }

    if (device.extraHTTPHeaders) {
      _.forEach(device.extraHTTPHeaders, (v, k) => {
        device.extraHTTPHeaders[k] = v
            .replace(/__SERIAL__/g, this._options.serial)
            .replace(/__UID__/g, this._options.uid);
      });
      await page.setExtraHTTPHeaders(device.extraHTTPHeaders);
    }

    this._device = device;
  }

  /**
   * スクリーンショットのファイル名取得
   * @param {string} url
   * @return {string}
   * @private
   */
  _getScreenShotFileName(url) {
    const DS = '_';
    const urlInfo = urlParser.parse(url);

    let pathname = urlInfo.pathname.replace(/\//g, DS);
    if (pathname.slice(-1) === DS) pathname = pathname.slice(0, -1);

    const query = urlInfo.query ? `_${urlInfo.query.replace(/\//g, DS)}` : '';

    return `${urlInfo.host}${pathname}${query}`;
  }
}

module.exports = FpScraper;
