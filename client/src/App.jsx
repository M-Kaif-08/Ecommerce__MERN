import { Routes, Route } from 'react-router'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Shop from './pages/Shop'

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Shop />} />
      </Route>
    </Routes>
  )
}

export default App