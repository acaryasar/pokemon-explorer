import Header from '../components/layout/Header'
import { useAuthStore } from '../store/authStore'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import XPBar from '../components/profile/XPBar'

function Settings() {
  const { user, profile, signOut } = useAuthStore()

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Ayarlar</h1>
        
        <div className="max-w-2xl space-y-6">
          {/* Profile Card */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Profil</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">E-posta:</span>
                  <span className="text-white ml-2">{user?.email || 'Anonymous'}</span>
                </div>
                {profile && (
                  <>
                    <div>
                      <span className="text-gray-400">Seviye:</span>
                      <span className="text-white ml-2">{profile.level}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">XP:</span>
                      <span className="text-white ml-2">{profile.xp}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Card>

          {/* XP Progress */}
          {profile && <XPBar />}

          {/* Account Actions */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Hesap</h2>
              <div className="space-y-3">
                <Button
                  onClick={handleSignOut}
                  variant="danger"
                  className="w-full"
                >
                  Çıkış Yap
                </Button>
              </div>
            </div>
          </Card>

          {/* Game Settings */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Oyun Ayarları</h2>
              <div className="space-y-3 text-gray-300">
                <p>Ses Efektleri: <span className="text-white">Açık</span></p>
                <p>Müzik: <span className="text-white">Kapalı</span></p>
                <p>Bildirimler: <span className="text-white">Açık</span></p>
              </div>
            </div>
          </Card>

          {/* About */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Hakkında</h2>
              <div className="text-gray-300 space-y-2">
                <p>Pokemon Explorer v1.0.0</p>
                <p>React, TypeScript ve Supabase ile yapılmış Pokemon temalı keşif oyunu.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Settings
