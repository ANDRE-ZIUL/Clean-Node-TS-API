import { EmailValidatorAdapter } from '../../../../../infra/validators/email-validator-adapter'
import { Validation } from '../../../../../presentation/protocols/validation'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
