import { InvalidParamError } from '../../presentation/errors'
import { EmailValidator } from '../../presentation/protocols'
import { Validation } from '../../presentation/protocols/validation'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldname: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldname])
    if (!isValid) {
      return new InvalidParamError(this.fieldname)
    }
  }
}
