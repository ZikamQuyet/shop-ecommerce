import App from './App'
import CssBaseline from '@mui/material/CssBaseline'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { customTheme } from './theme/customTheme'
import { ThemeProvider } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.scss'
import SkeletonLoading from './components/SkeletonLoading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense
          fallback={
            <>
              <SkeletonLoading />
            </>
          }
        >
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Suspense>
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
