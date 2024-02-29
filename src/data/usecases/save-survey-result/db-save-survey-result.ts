import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultModel } from '@/domain/usecases/save-survey-result/save-survey-result'
import { SaveSurveyResult } from './../../../domain/usecases/save-survey-result/save-survey-result'
import { SaveSurveyResultRepository } from './../../protocols/db/survey/save-survey-result-repository'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    return null
  }
}
