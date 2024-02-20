import request from 'supertest'
import app from '../config/app'

describe('Cors Middleware', () => {
  test('Should return default content type as json', async () => {
    app.get('/teste_content_type', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/teste_content_type')
      .expect('content_type', /json/)
  })

  test('Should return xml content type as xml', async () => {
    app.get('/teste_content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app)
      .get('/teste_content_type_xml')
      .expect('content_type', /xml/)
  })
})
