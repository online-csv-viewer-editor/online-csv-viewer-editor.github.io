
// ExcelParser.js
import * as XLSX from 'xlsx';

import React, { useEffect, useState } from 'react';
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
        const workbookSheetNames = workbook.SheetNames.map((name) => ({ name }));
        setSheetNames(workbookSheetNames);
        setWorkbookRead(workbook);
      } catch (error) {
        console.error('Error reading the file: ', error);
      }
    }
  };

  useEffect(() => {
    async function parsingSheet() {
      if (workbookRead !== null && sheetNames.length !== 0) {
        if (sheetNames.length > 1) {
          setModalIsOpen(true);
        } else {
          const result = await parseSheet(0, workbookRead, sheetNames);
          if (result) {
            setData(result);
          }
        }
      }
    };
    parsingSheet();
  }, [workbookRead, sheetNames, setData]);

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
      if (result) {
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