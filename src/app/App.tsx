// src/app/App.tsx
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import AppRouter from './AppRouter'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Banner from '../components/Banner'

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Banner />
      <main className="container my-4">
        <AppRouter />
      </main>
      <Footer />
    </Provider>
  )
}

export default App
