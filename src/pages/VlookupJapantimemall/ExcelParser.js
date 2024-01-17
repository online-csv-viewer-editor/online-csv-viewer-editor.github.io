
// ExcelParser.js
import * as XLSX from 'xlsx';

import React, { useEffect, useState, useRef } from 'react';
import { Button, ButtonGroup } from '@mui/material';

import { SheetModal } from '../VlookupShared/SheetModal'

export const FileInput = ({ resetSelected, data, setData, upload, createNew, handleCreateNewClick, addColumn, handleAddColumnClick, download, sheetName }) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sheetNames, setSheetNames] = useState([]);
  const [workbookRead, setWorkbookRead] = useState(null);

  const readWorkbookAsync = (file) => {
    console.log("readWorkbookAsync called");

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        resolve(workbook);
      };

      reader.onerror = (event) => {
        reject(event.target.error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const workbook = await readWorkbookAsync(file);
        console.log(workbook);
        const workbookSheetNames = workbook.SheetNames.map((name) => ({ name }));
        console.log(workbookSheetNames);
        setSheetNames(workbookSheetNames);
        setWorkbookRead(workbook);
      } catch (error) {
        console.error('Error reading the file: ', error);
      }
    }
  };

  const setResult = (result) => {
    if (result) {
      console.log(result);
      setData(result);
      resetSelected();
    }
  };

  useEffect(() => {
    console.log("parsingSheet called. Download SheetName: ", sheetName);
    console.log("parsingSheet called. workbookRead: ", workbookRead);
    console.log("parsingSheet called. sheetNames: ", sheetNames);

    const parsingSheet = async () => {
      try {
        if (workbookRead !== null && sheetNames.length !== 0) {
          console.log("inside parsingSheet loop");
          if (sheetNames.length > 1) {
            setModalIsOpen(true);
          } else {
            const sheetDefaultIndex = 0;
            const result = await parseSheet(sheetDefaultIndex, workbookRead, sheetNames);
            setResult(result);
          }
        }
      } catch (error) {
        console.error('Error parsing sheet data: ', error);
      }
    };

    parsingSheet();
  }, [workbookRead, sheetNames]);

  const parseSheet = async (index, workbook, workbookSheetNames) => {
    return new Promise((resolve, reject) => {
      if (workbook) {
        const sheet = workbook.Sheets[workbookSheetNames[index].name];
        const sheetData = XLSX.utils.sheet_to_json(sheet);
        resolve(sheetData);
      } else {
        reject("workbook is not available");
      }
    });
  };

  const handleSheetSelect = async (index) => {
    try {
      const result = await parseSheet(index, workbookRead, sheetNames);
      setResult(result);
    } catch (error) {
      console.log("error in handleSheetSelect: , ", error);
    }
    setModalIsOpen(false);
  };

  const fileInput = useRef(null);

  const handleUploadClick = () => {
    if (fileInput) fileInput.current.click();
  }

  const handleDownloadClick = () => {
    const utils = XLSX.utils;
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${sheetName}.xls`, { bookType: 'xls' });
  }

  return (
    <div>
      <input
        id="file-input"
        ref={fileInput}
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <ButtonGroup 
        variant="contained"
        aria-label="outlined primary button group"
        style={{ margin: '2px' }}
      >
        { upload ? <Button onClick={handleUploadClick}>{upload}</Button> : <></>}
        { createNew ? <Button onClick={handleCreateNewClick}>{createNew}</Button> : <></>}
        { download ? <Button onClick={handleDownloadClick}>{download}</Button> : <></>}
        { addColumn ? <Button onClick={handleAddColumnClick}>{addColumn}</Button> : <></>}
      </ButtonGroup>
      <SheetModal
        sheetNames={sheetNames}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onSelectSheet={handleSheetSelect}
      />
    </div>
  );
};