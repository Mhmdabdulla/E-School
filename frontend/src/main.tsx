// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import ThemeProvider from './components/common/theme-provider.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
    <App />
    </ThemeProvider>
  </Provider>
  // </StrictMode>,
)
