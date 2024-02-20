import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .get('/api/signup')
      .send({
        name: 'André',
        email: 'andre@mail.com',
        password: 'senha123',
        passwordConfirmation: 'senha123'
      })
      .expect(200)
  })
})
