export class ServerError extends Error {
  constructor (stack: string | undefined) {
    super('Internal Server Error')
    this.name = 'ServerParamError'
    this.stack = stack
  }
}
