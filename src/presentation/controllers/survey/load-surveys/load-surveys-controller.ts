import { LoadSurveys } from '../../../../domain/usecases/load-surveys/load-surveys'
import { ok, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../add-survey/add-survey-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return ok(surveys)
    } catch (error) {
      serverError(error)
    }
  }
}
