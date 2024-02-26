import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
const MONGO_URL = 'mongodb://localhost:27017/jest'

let accountCollection: Collection
describe('Login Routes', () => {
  test('Should return an account on success', async () => {
    beforeAll(async () => {
      await MongoHelper.connect(MONGO_URL)
    })

    afterAll(async () => {
      await MongoHelper.disconnect()
    })

    beforeEach(async () => {
      accountCollection = await MongoHelper.getCollection('accounts')
      await accountCollection.deleteMany({})
    })

    describe('', () => {

    })

    describe('POST /login', () => {
      test('Should return 200 on login', async () => {
        const password = await hash('senha123', 12)
        await accountCollection.insertOne({
          name: 'André',
          email: 'andre@mail.com',
          password

        })
        await request(app)
          .post('/api/login')
          .send({
            email: 'andre@mail.com',
            password: 'senha123'
          })
          .expect(200)
      })

      test('Should return 401 on login', async () => {
        await request(app)
          .post('/api/login')
          .send({
            email: 'andre@mail.com',
            password: 'senha123'
          })
          .expect(401)
      })
    })
  })
})
