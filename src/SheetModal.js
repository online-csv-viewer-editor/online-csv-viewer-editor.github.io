
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export const SheetModal = ( { sheetNames, isOpen, onRequestClose, onSelectSheet } ) => {
  return (
    <Dialog open={isOpen} onClose={onRequestClose}>
      <DialogTitle>Select a Sheet</DialogTitle>
      <List>
        {sheetNames.map((sheetName, index) => (
          <ListItemButton key={index} onClick={() => onSelectSheet(index)}>
             <ListItemText primary={sheetName.name} />
          </ListItemButton>
        ))}
      </List>
    </Dialog>
  );
};