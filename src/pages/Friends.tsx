import Header from '../components/layout/Header'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

function Friends() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Friends</h1>
        
        <div className="max-w-2xl space-y-6">
          {/* Add Friend */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Add Friend</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter friend's username or email"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                />
                <Button variant="primary">Add</Button>
              </div>
            </div>
          </Card>

          {/* Friends List */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Friends List</h2>
              <div className="text-center text-gray-400 py-8">
                <div className="text-6xl mb-4">👥</div>
                <p>No friends yet</p>
                <p className="text-sm mt-2">Add friends to trade Pokemon and compete!</p>
              </div>
            </div>
          </Card>

          {/* Pending Requests */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Pending Requests</h2>
              <div className="text-center text-gray-400 py-8">
                <p>No pending friend requests</p>
              </div>
            </div>
          </Card>

          {/* Leaderboard */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Leaderboard</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400 font-bold">1</span>
                    <div className="text-white">Player1</div>
                  </div>
                  <div className="text-gray-400">Level 25</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-300 font-bold">2</span>
                    <div className="text-white">Player2</div>
                  </div>
                  <div className="text-gray-400">Level 20</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-orange-400 font-bold">3</span>
                    <div className="text-white">Player3</div>
                  </div>
                  <div className="text-gray-400">Level 18</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Friends
