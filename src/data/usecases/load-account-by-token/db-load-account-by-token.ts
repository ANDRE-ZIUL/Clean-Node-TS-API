import { AccountModel, LoadAccountByToken } from '../../../presentation/middlewares/auth-middleware-protocols'
import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'
import { Decrypter } from './../../protocols/criptography/decrypter'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}