import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login';
import './App.css';
import Front from './pages/front';
 
function App() {
  return (
    <div className='app-content'>
         <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/" element={<Front/>} />
          </Routes>
    </div>
  );
}
 
export default App;