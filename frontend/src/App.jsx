import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './pages/Layout'
import { Inicio } from './pages/Inicio'
import { Login } from './pages/Login'
import { Registro } from './pages/Registro'
import { InicioWow } from './pages/wow/InicioWow'
import { RegistroWow } from './pages/wow/RegistroWow'
import { OnlineWow } from './pages/wow/OnlineWow'

function App() {
  return (    
    <Router>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/wow" element={<InicioWow />} />
            <Route path="/wow/registro" element={<RegistroWow />} />
            <Route path="/wow/online" element={<OnlineWow />} />
          </Route>
      </Routes>
    </Router>
    
  )
}

export default App
