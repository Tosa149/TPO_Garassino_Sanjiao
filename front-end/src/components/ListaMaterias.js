import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect} from "react";
import FormDialog from "./BotonContratar";
import CustomizedDialogs from './Desc';

  

export default function ListaMaterias(props) {
    const [searchValue, setSearchValue] = useState("");
    const [nameSearchValue, setNameSearchValue] = useState("");
    const [searchValueTipo, setSearchValueTipo] = useState("");
    const [searchValueFrec, setSearchValueFrec] = useState("");
    const [ratingValue, setRatingValue] = useState(0);
    const [rows, setRows] = useState([]);

    useEffect(
       ()=>{fetch("http://localhost:3001/api/class").then(response => response.json()
          ).then(jsonParcial => setRows(jsonParcial.clases))
          .catch(error => console.log(error))
        }, [] 
    )
  
    return (
      <div className="!w-screen flex flex-wrap justify-center p-8">
      <div className="w-3/4">
      <label className='texto' >Materia:</label>
      <input
        type="text"
        name="search"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      <label className='texto'>Nombre:</label>
      <input
        type="text"
        name="search"
        value={nameSearchValue}
        onChange={e => setNameSearchValue(e.target.value)}
      />
      <label className='desplegable' >Tipo de clase:</label>
      <select onChange={e => setSearchValueTipo(e.target.value)}>
        <option value="">Todos</option>
        <option value="individual">individual</option>
        <option value="grupal">grupal</option>
      </select>
      <label className='desplegable' >Frecuencia:</label>
      <select onChange={e => setSearchValueFrec(e.target.value)}>
        <option value="">Todos</option>
        <option value="semanal">semanal</option>
        <option value="única">única</option>
        <option value="mensual">mensual</option>
      </select>
      <label>Calificacion mayor a:</label>
      <input
          type="text"
          name="search"
          value={ratingValue}
          onChange={e => setRatingValue(e.target.value)}
        />
      </div>
      <FormDialog/>
    
      <div className="w-3/4">

      <TableContainer className="!w-full" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Materia</TableCell>
              <TableCell>Nombre de clase</TableCell>
              <TableCell>Profesor</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Frecuencia</TableCell>
              <TableCell>Duración</TableCell>
              <TableCell>Ratings y Comentarios</TableCell>
              <TableCell>Contratar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {rows != "" && rows.filter(function (el)
                {
                  return el.name.match(new RegExp(nameSearchValue, "i")) &&
                        el.subject.match(new RegExp(searchValue, "i")) &&
                        el.type.match(new RegExp(searchValueTipo, "i")) &&
                        el.frecuency.match(new RegExp(searchValueFrec, "i")) &&
                        el.rating > ratingValue &&
                        el.public == true;
                }
                ).map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.subject}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name} <CustomizedDialogs/>
                </TableCell>
                <TableCell>EN PROGRESO</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.frecuency}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>placeholder:ACA VA EL LINK A RATINGS</TableCell>
                {props.user.rol == "student" ? <TableCell><FormDialog/></TableCell> : <TableCell>Inicie Sesión</TableCell>}
                
              </TableRow>


             
   
            ))}
            
          </TableBody>
         
          
          
        </Table>
      </TableContainer>
      
      </div>
      
      </div>
    
    );
  }

