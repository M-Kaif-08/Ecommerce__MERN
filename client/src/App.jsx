import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router'

import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import EmailVerification from './pages/auth/EmailVerification'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'

import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore'


// Protect routes that require authentication
const ProtectedRoutes = ({ children }) => {
  const { user, authenticated } = useAuthStore();

  if (!authenticated) {
    return <Navigate to='/login' replace />
  }
  if (!user?.isVerified) {
    return <Navigate to='/verify-email' replace />
  }
  return children;
}

// Redirect the Authenticated Users to Home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { user, authenticated } = useAuthStore();

  if (authenticated && user?.isVerified) {
    return <Navigate to='/' replace />
  }
  return children;
}

function App() {

  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Routes>

        {/* Auth Routes */}
        <Route
          path='/signup'
          element={
            <RedirectAuthenticatedUser>
              <Signup />
            </RedirectAuthenticatedUser>
          } />

        <Route
          path='/login'
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          } />

        <Route
          path='/verify-email'
          element={
            <RedirectAuthenticatedUser>
              <EmailVerification />
            </RedirectAuthenticatedUser>
          } />

        <Route
          path='/forgot-password'
          element={
            <RedirectAuthenticatedUser>
              <ForgotPassword />
            </RedirectAuthenticatedUser>
          } />

        <Route
          path='/reset-password/:token'
          element={
            <RedirectAuthenticatedUser>
              <ResetPassword />
            </RedirectAuthenticatedUser>
          } />

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