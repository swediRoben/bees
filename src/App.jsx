 
import Welcome from './welcome/welcome' 
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
 
function About() {
  return <h2>À propos</h2>;
}

function NotFound() {
  return <h2>Page non trouvée</h2>;
}

function App() {
  return (
    <BrowserRouter basename="/bees">
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Accueil</Link> |{' '}
        <Link to="/about">À propos</Link>
      </nav>

      <Routes>
        <Route path="/" element={ <Welcome/>} />
        <Route path="/about" element={<About />} />
        {/* Route catch-all pour les urls inconnues */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
