import request from 'supertest'
import app from '../config/app'

describe('Cors Middleware', () => {
  app.get('/teste_cors', (req, res) => {
    res.send()
  })
  test('Should enable cors', async () => {
    await request(app)
      .get('/teste_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
