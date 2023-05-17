import { ChakraProvider } from '@chakra-ui/react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import Apartment from './pages/Apartment'
import AddApartment from './pages/AddApartment'

function App() {
  return (
    <ChakraProvider>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route
            path="/apartment"
            element={
              <Apartment />} />
          <Route
            path="/addapartment"
            element={
              <AddApartment />} />
          <Route
            path="/"
            element={
              <Home />} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  )
}

export default App
