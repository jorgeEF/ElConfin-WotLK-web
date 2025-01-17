import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './pages/Layout'
import { Inicio } from './pages/Inicio'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

function App() {
  return (    
    <Router>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
      </Routes>
    </Router>
    
  )
}

export default App
