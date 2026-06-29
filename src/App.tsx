import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game'
import Pokedex from './pages/Pokedex'
import Bag from './pages/Bag'
import Friends from './pages/Friends'
import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/bag" element={<Bag />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
