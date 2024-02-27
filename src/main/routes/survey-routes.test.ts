import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
const MONGO_URL = 'mongodb://localhost:27017/jest'

let surveyCollection: Collection
describe('Survey Routes', () => {
  test('Should return an account on success', async () => {
    beforeAll(async () => {
      await MongoHelper.connect(MONGO_URL)
    })

    afterAll(async () => {
      await MongoHelper.disconnect()
    })

    beforeEach(async () => {
      surveyCollection = await MongoHelper.getCollection('accounts')
      await surveyCollection.deleteMany({})
    })

    describe('POST /surveys', () => {
      test('Should return 204 on add survey success', async () => {
        await request(app)
          .post('/api/surveys')
          .send({
            question: 'Question',
            answers: [{
              answer: 'Answer 1',
              image: 'http://image-name.com'
            },
            {
              answer: 'Answer 2'
            }]
          })
          .expect(204)
      })
    })
  })
})
