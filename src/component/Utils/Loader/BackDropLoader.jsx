import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

export default function BackDropLoader({ children, open }) {
  return (
    <div>
      {children}
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
