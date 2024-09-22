// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import App from './App.tsx'
import UseEffectFn from './useEffectFn.tsx'

import './index.css'

const router = createBrowserRouter([
  {
   path:"/",
   element:<App></App>
  },
  {
    path:'/useEffectFn',
    element:<UseEffectFn/>
  }
])
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
   <RouterProvider router={router}></RouterProvider>
  // </StrictMode>,
)
