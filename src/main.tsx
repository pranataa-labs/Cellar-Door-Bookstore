import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { BookstoreProvider } from './context/BookstoreContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BookstoreProvider>
      <App />
    </BookstoreProvider>
  </React.StrictMode>
)
