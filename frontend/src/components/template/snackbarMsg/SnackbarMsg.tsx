import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { setNull } from '../../../store/slices/snackbar/snackbarSlice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function SnackbarMsg() {
  const message = useAppSelector(state => state.snackbar.message)
  const severity = useAppSelector(state => state.snackbar.severity)
  const dispatch = useAppDispatch()

  const [ open, setOpen ] = useState<boolean>(true)
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    dispatch(setNull())
  };
  return (
    
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={message} anchorOrigin={{ vertical:'top', horizontal:'right' }}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>    
  )
}