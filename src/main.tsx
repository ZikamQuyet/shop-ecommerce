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


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<>...</>}>
          <App />
        </Suspense>
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
