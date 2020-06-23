const request = require('supertest');
// const app = require('../src/server/index');

import { app } from '../src/server/index';

describe('Tests server NLP endpoints', () => {

  it('should test get endoint', async () => {
    const res = await request(app).get('/test');
    expect(res.statusCode).toEqual(200);
    // console.log('get res.body - ', res.body);
    expect(res.body).toHaveProperty('title');
  });

  it('should test nlpapi post endpoint', async() => {
    const res = await request(app)
      .post('/nlpapi')
      .send({
        categories: [
          {
            'code': '007',
            'confidence': '0.61',
            'label': 'company information - marketing'
          }
        ],
      });
    // console.log('post - ', res.body);
    // expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('code');
  });

});
