// Client-side auth utilities

export async function checkAuth(): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/check', {
      credentials: 'include',
    })
    const data = await response.json()
    return data.authenticated === true
  } catch (error) {
    return false
  }
}

export async function login(password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ password }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    return { success: false, error: 'Network error' }
  }
}

export async function logout(): Promise<void> {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
  } catch (error) {
    // Ignore errors on logout
  }
}

