const configuredApiUrl = import.meta.env.VITE_API_URL

export const API_URL = configuredApiUrl || (
  import.meta.env.DEV
    ? '/amara-api'
    : `${window.location.protocol}//${window.location.hostname}/amara-api`
)
