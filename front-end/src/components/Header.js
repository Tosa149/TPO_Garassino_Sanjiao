import logoBueno from "../Imagenes/logo_bueno.png";
import Login from "../pages/Login";
import { Link } from "react-router-dom";

// <Link to="/login">
//   Ir a login
// </Link>

function Header(props) {
  function handleClick() {
    localStorage.removeItem("token.app.clases.particulares");
    props.setAuth(false);
    props.setUser({});
  }

  return (
    <div className="flex justify-between items-center w-full h-24 bg-violet-800 rounded-lg">
      <div className="flex justify-evenly w-1/4">
        <img src="" alt="imagen" className="px-2 " />
        <button className="p-1 rounded-lg bg-gray-600 text-white h-10">
          Opciones de Pago
        </button>
        {props?.user?.user?.role === "student" ? (
          <h1>Hola Estudiante!</h1>
        ) : props?.user?.user?.role === "profesor" ? (
          <Link to="/create-class">
            <button className="rounded-lg bg-gray-600 text-white h-10">
              Crear Clase
            </button>
          </Link>
        ) : null}
      </div>
      {!props.auth ? (
        <div className="flex justify-evenly w-32 ">
          <Link to="/login">
            <button className="rounded-lg bg-gray-600 text-white h-10">
              Log in
            </button>
          </Link>

          <Link to="/register">
            <button className="rounded-lg bg-gray-600 text-white h-10">
              Register
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex justify-evenly w-32 ">
          <button
            onClick={handleClick}
            className="rounded-lg bg-gray-600 text-white h-10"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
