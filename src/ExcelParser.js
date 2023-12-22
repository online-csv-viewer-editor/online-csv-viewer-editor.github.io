
// ExcelParser.js
import * as XLSX from 'xlsx';

import React, { useState } from 'react';
import { SheetModal } from './SheetModal'

export const FileInput = ({ setData }) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sheetNames, setSheetNames] = useState([]);
  const [workbookRead, setWorkbookRead] = useState(null);

  const readWorkbookAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbookRead = XLSX.read(data, { type: 'array' });
        resolve(workbookRead);
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
        setWorkbookRead(workbook);
        const workbookSheetNames = workbook.SheetNames.map((name) => ({ name }));
        setSheetNames(workbookSheetNames);
        if (workbookSheetNames.length > 1) {
          setModalIsOpen(true);
        } else {
          const result = parseSheet(0);
          if (result) {
            console.log(result);
            setData(result);
          }
        }
      } catch (error) {
        console.error('Error reading the file: ', error);
      }
    }
  };

  const parseSheet = (index) => {
    console.log("parseSheet workbook: ", workbookRead);
    if (workbookRead) {
      const sheet = workbookRead.Sheets[sheetNames[index].name];
      console.log("sheet: ", sheet);
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      console.log("sheetData: ", sheetData);
      return sheetData;
    } else {
      console.log("workbook is not available");
    }
  };

  const handleSheetSelect = (index) => {
    try {
      const result = parseSheet(index);
      if (result) {
        console.log(result);
        setData(result);
      }
    } catch (error) {
      console.log("error in handleSheetSelect: , ", error);
    }
    setModalIsOpen(false);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <SheetModal
        sheetNames={sheetNames}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onSelectSheet={handleSheetSelect}
      />
    </div>
  );
};