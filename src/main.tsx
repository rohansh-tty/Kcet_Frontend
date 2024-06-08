import React from 'react'
import './App.css'
import App from './App'
import * as ReactDOM from 'react-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Cutoff from './components/Cutoff'
import { PrimeReactProvider } from 'primereact/api'
import Tailwind from 'primereact/passthrough/tailwind'
import Login, { AuthPage } from './components/Login'
import Test from './components/Test'
import { VerifyComponent } from './components/Verify'
import Profile from './components/Profile'

const router = createBrowserRouter([
  {
    path: '/cutoff',
    element: <Cutoff />
  },
  {
    path: '/test',
    element: <Test />
  },
  {
    path: '/',
    element: <AuthPage />
  },
  {
    path: '/verify',
    element: <VerifyComponent />
  },
  {
    path: '/profile',
    element: <Profile />
  }
])

ReactDOM.render(
  <React.StrictMode>
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
      <RouterProvider router={router}>{/* <App /> */}</RouterProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
