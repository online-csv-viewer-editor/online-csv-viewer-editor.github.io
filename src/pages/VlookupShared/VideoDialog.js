
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const VideoDialog = ( { open, handleClose} ) => {

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogContent>
        <iframe width="100%" height="500" src="https://www.youtube.com/embed/H_NpZRFt2Nw?si=PRY2v6ODbggct-PW" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDialog;