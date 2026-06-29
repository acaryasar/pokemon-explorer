import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import Header from '../components/layout/Header'
import AuthModal from '../components/auth/AuthModal'

function Home() {
  const { user, loading, loadProfile } = useAuthStore()

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-2xl">Yükleniyor...</div>
      </div>
    )
  }

  if (!user) {
    return <AuthModal />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Pokemon Explorer
        </h1>
      </div>
    </div>
  )
}

export default Home
