import "babel-polyfill";

const { checkForName, validateURL } = require('../src/client/js/validate');

const nlpapi = require('../src/client/js/formHandler');
// import * as nlpapi from '../src/client/js/formHandler';
console.log(nlpapi);

const url = 'http://localhost:8081/nlpapi';
const urldata = {nlpurl: 'http://techcrunch.com/2015/07/16/microsoft-will-never-give-up-on-mobile'};

test('validates url', () => {
  expect(validateURL('http://www.google.com')).toBe(true);
})

test('testing post nlp data', async () => {
  // expect.assertions(1);
  const data = await nlpapi.postnlpdata(url, urldata);
  expect(data).toBe('Mark');
  // await expect(postnlpdata(url, urldata)).resolves.toEqual('Paul');
  // await expect(nlpapi.postnlpdata(url, urldata)).resolves.toEqual('Paul');
  done();
});
