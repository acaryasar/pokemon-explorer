import { useAuthStore } from '../../store/authStore'
import Button from '../ui/Button'
import { useState } from 'react'

function AuthModal() {
  const { signInWithUsername, signUpWithUsername, loading } = useAuthStore()
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    if (!username.trim() || !password.trim()) {
      setError('Lütfen kullanıcı adı ve şifre girin')
      return
    }

    const result = isLogin 
      ? await signInWithUsername(username, password)
      : await signUpWithUsername(username, password)

    if (!result.success) {
      setError(result.error || 'İşlem başarısız')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎮</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Pokemon Explorer
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Giriş yapın' : 'Kayıt olun'}
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Kullanıcı adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <Button
            onClick={handleSubmit}
            variant="primary"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </Button>

          <div className="text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
              }}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              {isLogin ? 'Hesabın yok mu? Kayıt ol' : 'Zaten hesabın var mı? Giriş yap'}
            </button>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Devam ederek Hizmet Koşullarımızı kabul etmiş olursunuz
        </p>
      </div>
    </div>
  )
}

export default AuthModal
