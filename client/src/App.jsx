import { ChakraProvider } from '@chakra-ui/react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import Apartment from './pages/Apartment'

function App() {
  return (
    <ChakraProvider>
      <HashRouter>
        <Routes>
          <Route
            path="/apartment"
            element={
              <Apartment />} />
          <Route
            path="/"
            element={
              <h1>Home</h1>} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  )
}

export default App
