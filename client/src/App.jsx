import { HashRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import Apartment from './pages/Apartment'

function App() {
  return (
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
  )
}

export default App
