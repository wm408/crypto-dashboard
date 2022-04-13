import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './views/Home'
import Register from './components/Register';
import Login from './components/Login';
import EditFavorite from './components/FavoriteDetails';
// import LogReg from './views/LogReg';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<Login />} path='/' />
          <Route element={<Register />} path='/register' />
          <Route element={<Home />} path='/home' />
          <Route element={<EditFavorite />} path='/user/favorites/:emailAddress' />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
