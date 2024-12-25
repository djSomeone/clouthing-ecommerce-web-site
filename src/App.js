import logo from './logo.svg';
import './App.css';
import { primaryColor,secColor } from './constant';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home Page/home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
