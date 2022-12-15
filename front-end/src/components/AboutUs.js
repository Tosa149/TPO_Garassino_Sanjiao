function AboutUs(props){
    return(
        <div className="w-screen bg-slate-900">
            <h1 className="font-sans text-slate-50 bg-slate-700 w-screen text-center text-2xl" >About Us</h1>
                <div className="flex justify-center">
                    <p className="font-sans text-slate-50 w-1/3 bg-slate-900 text-lg" > 
                        Busclases es una aplicación en desarrollo por nosotros como alumnos de la UADE.
                        La aplicación permite registrarse, iniciar sesión, agregar clases como profesor y monitorear
                        alumnos, comentarios y demás. Como alumno permite contratar clases, comentar sobre las mismas
                        y calificarlas.
                    </p>
                </div>
        </div>
    );
}

export default AboutUs;