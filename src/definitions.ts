export const API_URL = 'https://api.spacetraders.io/v2'
export const ELEMENT_CLASSES = 'rounded border-2 shadow-lg'
export const ELEMENT_STYLES = 'border-color: rgba(0,0,0, 0.2)'

// Type Definitions
export interface Trait {
  symbol: string
  name: string
  description: string
}

export interface Faction {
  symbol: string
  name: string
  description: string
  headquarters: string
  isRecruiting: boolean
  traits: Trait[]
}

export interface Ship {}
