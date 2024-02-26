import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

describe('JWT Adapter', () => {
  test('Should call sign with correct', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })
})
