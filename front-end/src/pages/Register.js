/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useState } from "react";
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";


export default function Register(props) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState();
    const [roleRadio, setRoleRadio] = useState("");
    const [birthday, setBirthday] = useState("dd/mm/yyyy");
    const [primary, setPrimary] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [third, setThird] = useState(false);
    const [university, setUniversity] = useState(false);
    const [title, setTitle] = useState("");
    const [experience, setExperience] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    function handleOnChangeUniversity() {
      setUniversity(!university);
    }
    function handleOnChangeThird() {
      setThird(!third);
    };
    function handleOnChangeSecondary() {
      setSecondary(!secondary);
    };
    function handleOnChangePrimary() {
      setPrimary(!primary);
    };
    
    async function handleSubmit(event) {
      event.preventDefault(); // Dado que es una aplicación, se usa esta linea para que no se recargue la página. SPA

      // student, profesor
      let payload = { 
        username: username, 
        email: email, 
        password: password, 
        name: name, 
        surname: surname, 
        role: roleRadio, 
        phone: phone,
      };

      if (roleRadio === "profesor") {
        payload.title = title;
        payload.experience = experience;
        payload.description = description;
      } else {
        payload.birthday = birthday;
        payload.classes = [];
        payload.primary = primary;
        payload.secondary = secondary;
        payload.third = third;
        payload.university = university;
      }


      const petition = await fetch('http://localhost:3001/api/register', {
        method: "POST",
        body: JSON.stringify(payload), // parse === pasar, stringify = convertir a json
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      const jsonResponse = await petition.json(); // Promise por lo tanto esperarlo.


      if (jsonResponse.token) {
        localStorage.setItem('token.app.clases.particulares', jsonResponse.token);
        const decodedToken = jwtDecode(jsonResponse.token);

        const fetchUser = await fetch('http://localhost:3001/api/users/'+decodedToken.user.id);
        const fetchUserJson = await fetchUser.json();
        props.setAuth(true);
        props.setUser(fetchUserJson);
        navigate("/");
      } else {
        props.setAuth(false);
      }
    }

    

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Registrese aqui!
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
            <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  onChange={e => setEmail(e.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email"
                  value = {email}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Nombre de Usuario
                </label>
                <input
                  onChange={e => setUsername(e.target.value)}
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Nombre de Usuario"
                  value = {username}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <input
                  onChange={e => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Contraseña"
                  value={password}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Nombre
                </label>
                <input
                  onChange={e => setName(e.target.value)}
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Nombre"
                  value={name}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Apellido
                </label>
                <input
                  onChange={e => setSurname(e.target.value)}  
                  id="surname"
                  name="surname"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Apellido"
                  value={surname}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Numero de telefono
                </label>
                <input
                  onChange={e => setPhone(e.target.value)}  
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="0000-0000"
                  value={phone}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
            <label for="html">Alumno</label>
            <input onChange={e => setRoleRadio(e.target.value)} type="radio" id="roleRadio" name="roleRadio" value="student"/>
            <label for="html">Profesor</label>
            <input onChange={e => setRoleRadio(e.target.value)} type="radio" id="roleRadio" name="roleRadio" value="profesor"/>
            </div>


            {roleRadio == "student"?
            <div className="-space-y-px rounded-md shadow-sm">
                <div>
                <label htmlFor="password" className="sr-only">
                  Fecha de Nacimiento
                </label>
                <input
                  onChange={e => setBirthday(e.target.value)}  
                  id="birthday"
                  name="birthday"
                  type="date"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="dd/mm/yyyy"
                  value={birthday}
                />
              </div>

              <div className="flex items-center justify-evenly w-full px-1 py-1">
              <div className="flex items-center">
                <input
                  onChange={handleOnChangePrimary}
                  id="primary"
                  name="primary"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked = {primary}
                />
                <label htmlFor="primary" className="ml-2 block text-sm text-gray-900">
                  primario
                </label>
              </div>
              <div className="flex items-center">
                <input
                  onChange={handleOnChangeSecondary}
                  id="secondary"
                  name="secondary"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked = {secondary}
                />
                <label htmlFor="secondary" className="ml-2 block text-sm text-gray-900">
                  secundario
                </label>
              </div>  
              <div className="flex items-center">
                <input
                  onChange={handleOnChangeThird}
                  id="third"
                  name="third"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked = {third}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  terciario
                </label>
              </div>
              <div className="flex items-center">
                <input
                  onChange={handleOnChangeUniversity}
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={university}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  universitario
                </label>
              </div>
              </div>
            </div>
            : roleRadio == "profesor"?
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="password" className="sr-only">
                  Titulo
                </label>
                <input
                  onChange={e => setTitle(e.target.value)}  
                  id="title"
                  name="title"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Titulo"
                  value={title}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Experiencia
                </label>
                <input
                  onChange={e => setExperience(e.target.value)}  
                  id="surname"
                  name="surname"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Experiencia"
                  value={experience}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Descripción
                </label>
                <input
                  onChange={e => setDescription(e.target.value)}  
                  id="description"
                  name="description"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Cuentanos sobre ti!"
                  value={description}
                />
              </div>
            </div>
            : null
            }
            
            {roleRadio == "" ? null :
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                registrar
              </button>
            </div>
            }


          </form>
        </div>
      </div>
    </>
  )
}
