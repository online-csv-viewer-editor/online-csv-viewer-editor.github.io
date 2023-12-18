
// ExcelGrid.js
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ExcelGrid = ({ rowData }) => {
    const getColumnDefs = () => {
        if (rowData.length === 0) {
            return [];
        }
        const keys = Object.keys(rowData[0]);
        return keys.map((key) => ({
            field: key,
        }));
    };
    const columnDefs = getColumnDefs();
    const paginationPageSize = 20;

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
        paginationPageSize={paginationPageSize}
        domLayout='autoHeight'
      />
    </div>
  );
};

export default ExcelGrid;