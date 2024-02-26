import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
const MONGO_URL = 'mongodb://localhost:27017/jest'

describe('Login Routes', () => {
  test('Should return an account on success', async () => {
    beforeAll(async () => {
      await MongoHelper.connect(MONGO_URL)
    })

    afterAll(async () => {
      await MongoHelper.disconnect()
    })

    beforeEach(async () => {
      const accountCollection = await MongoHelper.getCollection('accounts')
      await accountCollection.deleteMany({})
    })

    describe('POST /signup', () => {
      test('Should return 200 on signup', async () => {
        await request(app)
          .post('/api/signup')
          .send({
            name: 'André',
            email: 'andre@mail.com',
            password: 'senha123',
            passwordConfirmation: 'senha123'
          })
          .expect(200)
      })
    })
  })
})
