import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import FormDialog from "./BotonContratar";
import CustomizedDialogs from "./Desc";
import Button from "@mui/material/Button";

function CustomTable({ row, user }) {
  const [solapaVisible, setSolapaVisible] = useState(false);

  return (
    <>
      <TableRow
        key={row.clase.name}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell component="th" scope="row">
          {row.clase.subject}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.clase.name}
        </TableCell>
        <TableCell>{row.user.name}</TableCell>
        <TableCell>{row.clase.type}</TableCell>
        <TableCell>{row.clase.frecuency}</TableCell>
        <TableCell>{row.clase.duration}hs</TableCell>
        {user.user.role === "student" ? (
          <TableCell>
            <FormDialog />
          </TableCell>
        ) : (
          <TableCell>Inicie Sesión</TableCell>
        )}
        <TableCell>
          <Button
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={(e) => setSolapaVisible(!solapaVisible)}
          >
            Ver más detalles
          </Button>
        </TableCell>
      </TableRow>
      {solapaVisible && (
        <div>
          <CustomizedDialogs
            profDescription={row.profesor.description}
            description={row.clase.description}
          />

          {row.clase.comments.map((comment) => (
            <div>
              <p>Alumno: {comment.user.name}</p>
              <p>Mensaje: {comment.message}</p>
              <p>
                Calificación:
                {
                  row.clase.rating.find((r) => r.alumnoId === comment.alumnoId)
                    .rating
                }
                /5
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function ListaMaterias(props) {
  const [searchValue, setSearchValue] = useState("");
  const [nameSearchValue, setNameSearchValue] = useState("");
  const [searchValueTipo, setSearchValueTipo] = useState("");
  const [searchValueFrec, setSearchValueFrec] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/class")
      .then((response) => response.json())
      .then((jsonParcial) => {
        setRows(jsonParcial);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="!w-screen flex flex-wrap justify-center p-8">
      <div className="w-3/4">
        <label className="texto">Materia:</label>
        <input
          type="text"
          name="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <label className="texto">Nombre:</label>
        <input
          type="text"
          name="search"
          value={nameSearchValue}
          onChange={(e) => setNameSearchValue(e.target.value)}
        />
        <label className="desplegable">Tipo de clase:</label>
        <select onChange={(e) => setSearchValueTipo(e.target.value)}>
          <option value="">Todos</option>
          <option value="individual">individual</option>
          <option value="grupal">grupal</option>
        </select>
        <label className="desplegable">Frecuencia:</label>
        <select onChange={(e) => setSearchValueFrec(e.target.value)}>
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
          onChange={(e) => setRatingValue(e.target.value)}
        />
      </div>

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
                <TableCell>Contratar</TableCell>
                <TableCell>Desplegar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows != "" &&
                rows
                  .filter(function (el) {
                    console.log(el);
                    return (
                      el.clase.name.match(new RegExp(nameSearchValue, "i")) &&
                      el.clase.subject.match(new RegExp(searchValue, "i")) &&
                      el.clase.type.match(new RegExp(searchValueTipo, "i")) &&
                      el.clase.frecuency.match(
                        new RegExp(searchValueFrec, "i")
                      ) &&
                      el.clase.ratingAverage >= ratingValue &&
                      el.clase.public === true
                    );
                  })
                  .map((row) => <CustomTable row={row} user={props.user} />)}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
