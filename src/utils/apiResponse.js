export function extractApiData(response) {
  const payload = isAxiosResponse(response) ? response.data : response

  if (payload && typeof payload === 'object' && 'data' in payload) {
    return payload.data
  }

  return payload
}

export function extractApiItems(response) {
  const data = extractApiData(response)

  if (Array.isArray(data)) {
    return data
  }

  if (Array.isArray(data?.items)) {
    return data.items
  }

  return []
}

export function normalizeApiError(error) {
  if (error?.message && 'status' in error) {
    return error
  }

  const response = error?.response
  const payload = response?.data

  return {
    status: response?.status,
    message: payload?.message || payload?.error || error?.message || 'Request failed',
    errors: payload?.errors || null,
    path: payload?.path || response?.config?.url || null,
    timestamp: payload?.timestamp || null,
    original: error
  }
}

function isAxiosResponse(response) {
  return response && typeof response === 'object' && 'status' in response && 'headers' in response && 'config' in response
}
