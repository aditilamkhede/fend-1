const request = require('supertest');
// const app = require('../src/server/index');

import { app } from '../src/server/index';

const urldata = {nlpurl: 'http://techcrunch.com/2015/07/16/microsoft-will-never-give-up-on-mobile'};

// let appServer;
//


describe('Tests server NLP endpoints', () => {
  // const port = 7007;
  // let appServer;
  // beforeAll(async (done) => {
  //   // server = app.listen(4000, () => {
  //   //   global.agent = request.agent(server);
  //   //   done();
  //   // });
  //   delete require.cache[require.resolve('../src/server/index')];
  //   appServer = require('../src/server/index');
  //   // appServer = app.listen(port, () => console.log(`In Before Each Listening at port ${port}`));
  //   // appServer = http.createServer(app);
  //   // appServer.listen({ port }, done);
  //
  // });
  //
  // afterAll(async (done) => {
  //   await appServer.close(done);
  // });

  let req = null
  let server = null

  beforeAll(async function(done){
    server = await app.listen(done);
    req = request.agent(server);
    done();
  });

  afterAll(async function(done){
    return await server && server.close(done);
  });

  it('should test get endoint', async(done) => {
    const res = await request(app).get('/test');
    expect(res.statusCode).toEqual(200);
    // console.log('get res.body - ', res.body);
    expect(res.body).toHaveProperty('title');
    done();
  });

  it('should test nlpapi post endpoint', async(done) => {
    const res = await request(app)
      .post('/nlpapi/extract')
      .send(urldata);
    // console.log('post - ', res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('image');
    done();
  });

});
