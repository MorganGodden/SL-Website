interface ShipData {
  symbol: string
  registration: string
  nav: string
  crew: string
  frame: string
  reactor: string
  engine: string
  cooldown: string
  modules: string[]
  mounts: string[]
  cargo: string
  fuel: string
}

export class Ship {
  private _symbol: string
  private _registration: string
  private _nav: string
  private _crew: string
  private _frame: string
  private _reactor: string
  private _engine: string
  private _cooldown: string
  private _modules: string[]
  private _mounts: string[]
  private _cargo: string
  private _fuel: string

  constructor(data: ShipData) {
    this._symbol = data.symbol
    this._registration = data.registration
    this._nav = data.nav
    this._crew = data.crew
    this._frame = data.frame
    this._reactor = data.reactor
    this._engine = data.engine
    this._cooldown = data.cooldown
    this._modules = data.modules
    this._mounts = data.mounts
    this._cargo = data.cargo
    this._fuel = data.fuel
  }

  get symbol(): string {
    return this.format(this._symbol)
  }

  get registration(): string {
    return this.format(this._registration)
  }

  get nav(): string {
    return this.format(this._nav)
  }

  get crew(): string {
    return this.format(this._crew)
  }

  get frame(): string {
    return this.format(this._frame)
  }

  get reactor(): string {
    return this.format(this._reactor)
  }

  get engine(): string {
    return this.format(this._engine)
  }

  get cooldown(): string {
    return this.format(this._cooldown)
  }

  get modules(): string[] {
    return this._modules
  }

  get mounts(): string[] {
    return this._mounts
  }

  get cargo(): string {
    return this.format(this._cargo)
  }

  get fuel(): string {
    return this.format(this._fuel)
  }

  private format(input: string): string {
    try {
      const parsed = JSON.parse(input)
      return JSON.stringify(parsed, null, 2)
    } catch (e) {
      return input
    }
  }
}
