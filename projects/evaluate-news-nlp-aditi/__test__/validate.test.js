import "babel-polyfill";
// const fetch = require("node-fetch");

const { checkForName, validateURL } = require('../src/client/js/validate');

const nlpapi = require('../src/client/js/formHandler');
// import * as nlpapi from '../src/client/js/formHandler';
console.log(nlpapi);

const url = 'http://localhost:8081/nlpapi/extract';
const urldata = {nlpurl: 'http://techcrunch.com/2015/07/16/microsoft-will-never-give-up-on-mobile'};

test('validates url', () => {
  expect(validateURL('http://www.google.com')).toBe(true);
})

test('testing post nlp data', async (done) => {
  // expect.assertions(1);
  const data = await nlpapi.postnlpdata(url, urldata);
  console.log('data.categories[0].code - ', data);
  await expect(data.author).toBe('Ron Miller');
  // await expect(data.categories[0]['code']).toBe('04016029'); //with /nlpapi endpoint
  done();
});
