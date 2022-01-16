export const validateUsername = (username: string) => {
  if (username.length < 3)
    return 'Username must be at least 3 characters.'
  if (username.length > 10)
    return 'Username must be 10 characters or less.'
  if (username.trim().includes(' '))
    return 'Username must not have a space.'
  return undefined;
}

export const validateGameId = (gameId: string) => {
  if (gameId.length < 3)
    return 'Lobby Name must be at least 3 characters.'
  if (gameId.length > 10)
    return 'Lobby Name must be 10 characters or less.'
    if (gameId.trim().includes(' '))
    return 'Lobby Name must not have a space.'
  return undefined;
}
