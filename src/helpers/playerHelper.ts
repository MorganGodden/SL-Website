const avatarServiceUrl = 'https://mc-heads.net'

export function getHeadUrl(uuid: string): string {
  return `${avatarServiceUrl}/head/${uuid}/10`
}

export function getAvatarUrl(uuid: string): string {
  return `${avatarServiceUrl}/avatar/${uuid}`
}

export function getBodyUrl(uuid: string): string {
  return `${avatarServiceUrl}/body/${uuid}`
}

/** The raw 64x64 skin texture, served with CORS so WebGL can draw it. */
export function getSkinUrl(uuid: string): string {
  return `${avatarServiceUrl}/skin/${uuid}`
}
