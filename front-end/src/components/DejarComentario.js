import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} color="secondary">
        Contratar clase
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Contratar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cuentenos que opinó sobre la clase:
          </DialogContentText>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Comentario
                </label>
                <input
                  onChange={e => setEmail(e.target.value)}
                  id="email-address"
                  name="content"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Su comentario va aqui!"
                  value={email}
                />
              </div>
              <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                Comentar
              </button>
              <button onClick={handleClose} className="rounded-lg bg-gray-600 text-white h-10">
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