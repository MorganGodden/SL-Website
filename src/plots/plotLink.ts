/**
 * Resolving the player a shared link names.
 *
 * A link carries a player name, because that is what a person reads off a URL,
 * but a name is not the board's key and a player can change theirs. A uuid is
 * exact and always works, so both are accepted and a uuid wins wherever the
 * two disagree.
 */
export function resolvePlot(
  idOrName: string,
  candidates: readonly { uuid: string; name: string }[]
): string | null {
  const wanted = idOrName.trim().toLowerCase()
  if (!wanted) return null

  let byName: string | null = null
  for (const candidate of candidates) {
    if (candidate.uuid.toLowerCase() === wanted) return candidate.uuid
    if (byName === null && candidate.name.toLowerCase() === wanted) byName = candidate.uuid
  }
  return byName
}
