import MockDate from 'mockdate'
import { SurveyModel } from '../../../../domain/models/survey'
import { noContent, ok, serverError } from '../../../helpers/http/http-helper'
import { LoadSurveys } from './../../../../domain/usecases/load-surveys/load-surveys'
import { LoadSurveysController } from './load-surveys-controller'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }, {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }],
    date: new Date()
  }]
}

interface SutTypes {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeLoadSurvey = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }
  return new LoadSurveysStub()
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurvey()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeSurveys()))
  })

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve([])))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadServeysStub return throw', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
