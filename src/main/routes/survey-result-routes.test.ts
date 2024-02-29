import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import env from '../config/env'

describe('Survey Routes', () => {
  test('Should return an account on success', async () => {
    beforeAll(async () => {
      await MongoHelper.connect(env.mongoUrl)
    })

    afterAll(async () => {
      await MongoHelper.disconnect()
    })

    describe('PUT /surveys/:surveyId/results', () => {
      test('Should return 403 on save survey result without access token', async () => {
        await request(app)
          .put('/api/surveys/any_id/result')
          .send({
            answer: 'any_answer'
          })
          .expect(403)
      })
    })
  })
})
