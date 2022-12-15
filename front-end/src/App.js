import { useEffect, useState } from 'react';
import Header from "./components/Header";
import ListaMaterias from "./components/ListaMaterias";
import AboutUs from "./components/AboutUs";
import {Routes, Route, useNavigate, Link} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import jwtDecode from "jwt-decode";
import CreateClass from './pages/CreateClass';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  async function checkToken() {
    try {
      // token que haya expirado, un token falso, undefined caso de que no guardado
      const token = localStorage.getItem('token.app.clases.particulares');

      const peticion = await fetch('http://localhost:3001/api/check-token', {
        headers: {
          token: token
        }
      });
  
      const jsonParsed = await peticion.json();

      if (peticion.status === 403 && token) {
        localStorage.removeItem('token.app.clases.particulares');
        navigate("/login");
      }
  
      if (peticion.status === 200) {
        const tokenDecode = jwtDecode(token);
        
        const getUser = await fetch('http://localhost:3001/api/users/' + tokenDecode.user.id);
        const userJson = await getUser.json();
        
        setUser(userJson.user);
        setAuth(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(function() {
    checkToken();
  }, []);

  return (
      <div className="">
        <Header auth={auth} setAuth={setAuth} setUser={setUser} user={user} nombre="Tomás"/>
        <Routes>
        <Route path="/" element={
            <div>
              <ListaMaterias user={user} />
              <AboutUs/>
            </div>
          }/>
        <Route path="/login" element={
              <Login setUser={setUser} setAuth={setAuth} />
          }/>
        <Route path="/register" element={
              <Register setUser={setUser} setAuth={setAuth} />
          }/>//
         <Route path="/createClass" element={
              <CreateClass/>
          }/>
          <Route path="/forgotPassword" element={
              <ForgotPassword/>
          }/>
        </Routes>
      </div>
  );
}

export default App;
