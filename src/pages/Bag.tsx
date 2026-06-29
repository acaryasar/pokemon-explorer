import Header from '../components/layout/Header'
import { useInventoryStore } from '../store/inventoryStore'
import { useEffect } from 'react'

function Bag() {
  const { pokeballs, loadInventory } = useInventoryStore()

  useEffect(() => {
    loadInventory()
  }, [loadInventory])

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">Bag</h1>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">🎒</div>
            <div>
              <h2 className="text-2xl font-bold text-white">Pokeballs</h2>
              <p className="text-gray-400">{pokeballs} available</p>
            </div>
          </div>
          <div className="text-gray-300">
            <p className="mb-2">Use Pokeballs to catch wild Pokemon!</p>
            <p className="text-sm text-gray-500">
              You start with 10 Pokeballs. Catch Pokemon to earn more!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bag
