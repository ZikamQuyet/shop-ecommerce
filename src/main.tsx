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
import './i18n/config'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<>...</>}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </Provider>
        </Suspense>
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
