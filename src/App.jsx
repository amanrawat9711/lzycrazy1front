import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';   
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} /> 
          <Route path="*" /> 
        </Route>
      </Routes>
  );
}
export default App