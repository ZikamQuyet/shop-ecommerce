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
import './i18n/config'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />

      <Provider store={store}>
        <PersistGate loading={<SkeletonLoading />} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Suspense
                fallback={
                  <>
                    <SkeletonLoading />
                  </>
                }
              >
                <App />
              </Suspense>
            </BrowserRouter>
          </QueryClientProvider>
        </PersistGate>
      </Provider>

      <ToastContainer />
    </ThemeProvider>
  </React.StrictMode>
)
