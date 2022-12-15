import { useState} from "react";
import { LockClosedIcon } from '@heroicons/react/20/solid'

export default function CreateClass(props) {
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [typeRadio, setTypeRadio] = useState("Individual");
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [publicRadio, setPublicRadio] = useState(true);
  const [frecuency, setFrecuencyRadio] = useState("");

  async function handleSubmit(event) {
    let payload=  {
      name, 
      subject, 
      duration, 
      frecuency, 
      price, 
      type: typeRadio, 
      description, 
      public: publicRadio, 
      profesorId,
    }
    
    fetch('http://localhost:3001/api/create-class', { 
      method: "POST", 
      body: JSON.stringify(payload), 
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-full h-3/5">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Creando su clase
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Nombre
                </label>
                <input
                  onChange={e => setName(e.target.value)}
                  id="class-name"
                  name="name"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Nombre de la clase"
                  value={name}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Materia
                </label>
                <input
                  onChange={e => setSubject(e.target.value)}
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Materia"
                  value = {subject}
                />
              </div>
              <div className="flex items-center justify-between">
                <label for="html">Individual</label>
                <input onChange={e => setTypeRadio(e.target.value)} type="radio" id="roleRadio" name="roleRadio" value="individual"/>
                <label for="html">Grupal</label>
                <input onChange={e => setTypeRadio(e.target.value)} type="radio" id="roleRadio" name="roleRadio" value="grupal"/>
             </div>
             <div className="flex items-center justify-between">
                <label for="html">única</label>
                <input onChange={e => setFrecuencyRadio(e.target.value)} type="radio" id="roleRadio" name="roleRadio" value="única"/>
                <label for="html">Semanal</label>
                <input onChange={e => setFrecuencyRadio(e.target.value)} type="radio" id="roleRadio" name="roleRadio" value="semanal"/>
                <label for="html">Mensual</label>
                <input onChange={e => setFrecuencyRadio(e.target.value)} type="radio" id="roleRadio" name="roleRadio" value="mensual"/>
             </div>
             <div className="flex items-center justify-evenly w-full">
              <div className="w-2/5">
                <label htmlFor="password" className="sr-only">
                  Duración
                </label>
                <input
                  onChange={e => setDuration(e.target.value)}
                  id="duration"
                  name="duration"
                  type="number"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="0"
                  value = {duration}
                />
                <h1>hs</h1>
              </div>
              <div className="w-2/5">
                <label htmlFor="password" className="sr-only">
                  Precio
                </label>
                <h1>$</h1>
                <input
                  onChange={e => setPrice(e.target.value)}
                  id="price"
                  name="price"
                  type="number"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="0"
                  value = {price}
                />
              </div>
              <div className="flex items-center justify-between">
                <label for="html">Publica</label>
                <input onChange={e => setPublicRadio(e.target.value)} type="radio" id="roleRadio" name="roleRadio" value={true} />
                <label for="html">Privado</label>
                <input onChange={e => setPublicRadio(e.target.value)} type="radio" id="roleRadio" name="roleRadio" value={false} />
             </div>
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
                  placeholder="de que se trata la clase"
                  value={description}
                />
              </div>

            </div>


            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Publicar Clase
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}