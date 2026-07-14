import { createContext, useContext, useEffect, useState } from 'react'

const API_URL = 'http://localhost/amara-api'
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkSession()
  }, [])

  async function checkSession() {
    try {
      const res = await fetch(`${API_URL}/check-session.php`, {
        credentials: 'include', // important: sends the session cookie
      })
      const data = await res.json()
      if (data.user) {
        setUser({ id: data.user.id, email: data.user.email })
        setProfile({ full_name: data.user.full_name, role: data.user.role })
      } else {
        setUser(null)
        setProfile(null)
      }
    } catch (err) {
      console.error('check-session error:', err)
    } finally {
      setLoading(false)
    }
  }

  async function signUp(email, password, fullName) {
    try {
      const res = await fetch(`${API_URL}/register.php`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName }),
      })
      const data = await res.json()
      if (!res.ok) return { error: { message: data.error || 'Registration failed.' } }

      setUser({ id: data.user.id, email: data.user.email })
      setProfile({ full_name: data.user.full_name, role: data.user.role })
      return { data }
    } catch (err) {
      return { error: { message: 'Network error. Is the PHP server running?' } }
    }
  }

  async function signIn(email, password) {
    try {
      const res = await fetch(`${API_URL}/login.php`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) return { error: { message: data.error || 'Login failed.' } }

      setUser({ id: data.user.id, email: data.user.email })
      setProfile({ full_name: data.user.full_name, role: data.user.role })
      return { data }
    } catch (err) {
      return { error: { message: 'Network error. Is the PHP server running?' } }
    }
  }

  // NOTE: Google/Facebook login isn't supported yet in the PHP version.
  // This is a stub so LoginPage/RegisterPage don't crash if the buttons are clicked.
  async function signInWithProvider(provider) {
    return { error: { message: `${provider} login dili pa available sa bag-ong system.` } }
  }

  async function signOut() {
    try {
      await fetch(`${API_URL}/logout.php`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch (err) {
      console.error('logout error:', err)
    }
    setUser(null)
    setProfile(null)
  }

  const isAdmin = profile?.role === 'admin'

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin, signUp, signIn, signOut, signInWithProvider }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}