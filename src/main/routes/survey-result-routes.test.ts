import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'André',
    email: 'andre@mail.com',
    password: 'hashed_password',
    role: 'admin'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

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

      test('Should return 2000 on save survey result with access token', async () => {
        const accessToken = await makeAccessToken()
        const res = await surveyCollection.insertOne({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'http://image-name.com'
          }, {
            answer: 'Answer 2'
          }],
          date: new Date()
        })
        await request(app)
          .put(`/api/surveys/${res.ops[0]._id}/result`)
          .set('x-access-token', accessToken)
          .send({
            answer: 'Answer 1'
          })
          .expect(403)
      })
    })
  })
})
