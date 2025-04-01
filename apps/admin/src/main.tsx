import React from 'react'
import ReactDOM from 'react-dom/client'
import { Chakra } from './components/shared/branding/Chakra.tsx'
import AppProvider from './AppProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Chakra>
      <AppProvider />
    </Chakra>
  </React.StrictMode>
)
