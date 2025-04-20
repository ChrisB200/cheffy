import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { LoadingProvider } from './contexts/LoadingContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>
)
