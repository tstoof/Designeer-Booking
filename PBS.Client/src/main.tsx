import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Browserrouter } from './router.tsx'
import { ThemeProvider } from '@mui/material'
import { theme } from './styles/theme.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={Browserrouter} />
      </ThemeProvider>
    </StrictMode>
)
