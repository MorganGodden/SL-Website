const avatarServiceUrl = 'http://mc-heads.net'
const playerServiceUrl = 'https://playerdb.co/api/player/minecraft'

export function getHeadUrl(uuid: string): string {
  return `${avatarServiceUrl}/head/${uuid}/10`
}

export function getAvatarUrl(uuid: string): string {
  return `${avatarServiceUrl}/avatar/${uuid}`
}

export function getBodyUrl(uuid: string): string {
  return `${avatarServiceUrl}/body/${uuid}`
}

export async function getPlayer(uuid: string): Promise<any> {
  const response = await fetch(`${playerServiceUrl}/${uuid}`)
  return response.json()
}
