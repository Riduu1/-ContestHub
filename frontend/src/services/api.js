const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

export async function fetchContests(params = {}) {
  const query = new URLSearchParams()

  if (params.platform) query.set('platform', params.platform)
  if (params.status) query.set('status', params.status)
  if (params.search) query.set('search', params.search)
  if (params.limit) query.set('limit', params.limit)
  if (params.offset) query.set('offset', params.offset)

  const response = await fetch(
    `${API_BASE_URL}/api/contests?${query.toString()}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch contests')
  }

  return response.json()
}

export async function fetchContest(id) {
  const response = await fetch(
    `${API_BASE_URL}/api/contests/${id}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch contest')
  }

  return response.json()
}