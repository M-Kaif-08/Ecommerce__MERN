import { Routes, Route } from 'react-router'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import EmailVerification from './pages/auth/EmailVerification'

import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div>
      <Routes>

        {/* Auth Routes */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify-email' element={<EmailVerification />} />

        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Shop />} />
          <Route path='/products/:id' element={<ProductDetails />} />
        </Route>

      </Routes>
      <Toaster />
    </div>
  )
}

export default App