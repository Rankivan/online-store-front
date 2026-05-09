export const useApi = () => {
  const config = useRuntimeConfig()
  const authToken = useCookie<string | null>('auth_token', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 14,
    sameSite: 'lax'
  })

  const guestHeaders = (): Record<string, string> => ({
    Accept: 'application/json',
    'X-Tenant': String(config.public.tenantSlug)
  })

  const authHeaders = (): Record<string, string> => {
    const h = guestHeaders()
    if (authToken.value) {
      h.Authorization = `Bearer ${authToken.value}`
    }
    return h
  }

  const get = async (path: string) => {
    return await $fetch(`${config.public.apiBase}${path}`, { headers: authHeaders() })
  }

  const post = async (path: string, body: unknown) => {
    return await $fetch(`${config.public.apiBase}${path}`, {
      method: 'POST',
      headers: {
        ...authHeaders(),
        'Content-Type': 'application/json'
      },
      body
    })
  }

  /** POST sem Bearer (ex.: login). */
  const postGuest = async (path: string, body: unknown) => {
    return await $fetch(`${config.public.apiBase}${path}`, {
      method: 'POST',
      headers: {
        ...guestHeaders(),
        'Content-Type': 'application/json'
      },
      body
    })
  }

  return { get, post, postGuest, authToken, guestHeaders, authHeaders }
}
