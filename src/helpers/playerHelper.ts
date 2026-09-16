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
