import ProgressBar from '../ui/ProgressBar'
import { getXPProgress, getLevelFromXP } from '../../lib/constants/xp'
import { useAuthStore } from '../../store/authStore'

function XPBar() {
  const { profile } = useAuthStore()

  if (!profile) return null

  const currentLevel = getLevelFromXP(profile.xp)
  const xpProgress = getXPProgress(profile.xp)

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-semibold">Level {currentLevel}</span>
        <span className="text-gray-400 text-sm">
          {xpProgress}/100 XP
        </span>
      </div>
      <ProgressBar value={xpProgress} max={100} color="purple" />
    </div>
  )
}

export default XPBar
