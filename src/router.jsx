import { createBrowserRouter, Navigate } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout.jsx'
import AppLayout from './layouts/AppLayout.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProductLibrary from './pages/ProductLibrary.jsx'
import ImageGeneration from './pages/ImageGeneration.jsx'
import VideoGeneration from './pages/VideoGeneration.jsx'
import TaskDetail from './pages/TaskDetail.jsx'

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/products', element: <ProductLibrary /> },
      { path: '/image-generation', element: <ImageGeneration /> },
      { path: '/video-generation', element: <VideoGeneration /> },
      { path: '/tasks/:taskId', element: <TaskDetail /> },
    ],
  },
])
