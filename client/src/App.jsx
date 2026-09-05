import { Routes, Route } from 'react-router'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Shop />} />
        <Route path='/products/:id' element={<ProductDetails />} />
      </Route>
    </Routes>
  )
}

export default App