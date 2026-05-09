type LoginResponse = {
  token: string
  user: { id: number; name: string; email: string }
}

export const useAuth = () => {
  const { postGuest, authToken } = useApi()

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    const res = await postGuest('/auth/login', { email, password }) as LoginResponse
    if (res?.token) {
      authToken.value = res.token
    }
    return res
  }

  const logout = () => {
    authToken.value = null
  }

  const isLoggedIn = computed(() => Boolean(authToken.value))

  return { login, logout, isLoggedIn, authToken }
}
