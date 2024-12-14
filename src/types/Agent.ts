export class Agent {
  private readonly _accountId: string
  private readonly _symbol: string
  private readonly _headquarters: string
  private readonly _credits: number

  constructor(data: any) {
    this._accountId = data.accountId
    this._symbol = data.symbol
    this._headquarters = data.headquarters
    this._credits = data.credits
  }

  get accountId(): string {
    return this._accountId
  }

  get symbol(): string {
    return this._symbol
  }

  get headquarters(): string {
    return this._headquarters
  }

  get credits(): string {
    // No symbol, no decimal places
    return this._credits.toLocaleString('en-GB', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true
    })
  }
}
