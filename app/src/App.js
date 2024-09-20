import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Apointement from './pages/apointement';
import SuccessPage from './pages/successpage';
import Dashboard from './pages/adminDashboard';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Welcome" element={<Welcome />} />
          <Route path="/Apointement" element={<Apointement />} />
          <Route path="/SuccessPage" element={<SuccessPage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          {/* Add a fallback route */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
