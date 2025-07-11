import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './Components/Body';
import Home from './Components/Home';
import Login from './Components/Login';



function App() {
  return (
    <>
    <BrowserRouter basename='/'>
      <Routes>
      <Route path="/" element={<Body />}>
      <Route path="/login" element={<Login />} />
      <Route path="home" element={<Home />} />
      </Route>

      </Routes>
    </BrowserRouter>
    </>

    
  );
}

export default App;
