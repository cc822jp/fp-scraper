/**
 * requestInterceptor
 * XMLパースエラーを回避するためContent-Typeを偽装
 */
const fetch = require('node-fetch');

const requestInterceptor = async(page, request) => {
  const url = request.url();
  const requestHeaders = request.headers();
  const referer = requestHeaders.referer || '';

  if (!referer) {
    const cookiesList = await page.cookies(url);
    const cookies = cookiesList
        .map(cookie => `${cookie.name}=${cookie.value}`)
        .join('; ');
    delete requestHeaders['x-devtools-emulate-network-conditions-client-id'];

    if (requestHeaders.Cookie) {
      requestHeaders.cookie = requestHeaders.Cookie;
      delete requestHeaders.Cookie;
    }

    const theseHeaders = Object.assign({ cookie: cookies }, requestHeaders, {
      'accept-language': 'ja,en-US;q=0.9,en;q=0.8'
    });
    theseHeaders['Upgrade-Insecure-Requests'] = 1;

    const init = {
      body: request.postData(),
      headers: theseHeaders,
      method: request.method(),
      follow: 20
    };

    const result = await fetch(url, init);

    const resultHeaders = {};
    result.headers.forEach((value, name) => {
      if (name.toLowerCase() !== 'content-security-policy')
        resultHeaders[name] = value;
    });
    resultHeaders['content-type'] = 'text/html; charset=UTF-8';

    const buffer = await result.textConverted();
    await request.respond({
      body: buffer,
      headers: resultHeaders,
      contentType: 'text/html; charset=UTF-8',
      status: result.status
    });
  } else {
    request.continue();
  }
};

module.exports = requestInterceptor;
