import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, profile, loading, loadProfile } = useAuthStore()

  // Session restore only sets `user` (from the Supabase session), not `profile`.
  // Without this, landing directly on a protected route (refresh, deep link,
  // browser back/forward) leaves `profile` null, so points/pokeballs read as
  // 0 and point-gated actions like evolving stay stuck as unavailable.
  useEffect(() => {
    if (user && !profile) {
      loadProfile()
    }
  }, [user, profile, loadProfile])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Yükleniyor...</div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
