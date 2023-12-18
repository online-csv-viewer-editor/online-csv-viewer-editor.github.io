
// ExcelGrid.js
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ExcelGrid = ({ rowData }) => {
    const getColumnDefs = () => {
        if (rowData.length === 0) {
            return [];
        }
        const values = Object.values(rowData[0]);
        return values.map((value) => ({
            field: value,
        }));
    };
    const columnDefs = getColumnDefs();

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
      />
    </div>
  );
};

export default ExcelGrid;