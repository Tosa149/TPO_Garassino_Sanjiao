import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [schedule, setSchedule] = useState();
  const [message, setMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit() {}

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} color="secondary">
        Contratar clase
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Contratar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para contratar esta clase ingrese sus datos y el profesor lo estara
            contactando a la brevedad.
          </DialogContentText>
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="ejemplo@holamail.com"
                  value={email}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Telefono
                </label>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  id="Phone"
                  name="phone"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="0000-0000"
                  value={phone}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Horario
                </label>
                <input
                  onChange={(e) => setSchedule(e.target.value)}
                  id="schedule"
                  name="schedule"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="xx:xx am/pm"
                  value={schedule}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Mensaje
                </label>
                <input
                  onChange={(e) => setMessage(e.target.value)}
                  id="message"
                  name="message"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="dejale un mensaje al profesor!"
                  value={message}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Contratar
                </button>
                <button
                  onClick={handleClose}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
