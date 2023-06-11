import React, { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import AddApartment from './pages/AddApartment'
import ApartmentDetail from './pages/ApartmentDetail'
import MyList from './pages/MyList'

function App() {
  const [ethAddress, setETHAddress] = useState('')
  const [contract360AF, setContract360AF] = useState(null)

  return (
    <ChakraProvider>
      <HashRouter>
        <Navbar
          ethAddress={ethAddress}
          setETHAddress={setETHAddress}
          setContract360AF={setContract360AF} />
        <Routes>
          <Route
            path="/apartmentdetail/:id"
            element={
              <ApartmentDetail contract360AF={contract360AF} />} />
          <Route
            path="/addapartment"
            element={
              <AddApartment contract360AF={contract360AF} />} />
          <Route
            path="/mylisting"
            element={
              <MyList />} />
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
