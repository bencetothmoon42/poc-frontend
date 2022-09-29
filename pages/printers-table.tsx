import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { printersTableStyle } from "../styles/mui-datagrid";
import { printerDataFactory } from "../utils/data-factory";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    minWidth: 180,
    cellClassName: "column-with-bold-text",
  },
  { field: "active_paper_id", headerName: "Current paper", minWidth: 170 },
  { field: "comment", headerName: "Comment", minWidth: 160 },
  {
    field: "enabled",
    headerName: "Enabled",
    minWidth: 64,
    cellClassName: "column-with-centered-text",
  },
];

const rows: GridRowsProp = printerDataFactory();

export interface IFilter {
  columnField: string;
  operatorValue: string;
  value: string;
}

const initialFilter = {
  columnField: "",
  operatorValue: "",
  value: "",
};

const PrintersTable: NextPage = () => {
  const [filter, setFilter] = useState<IFilter>(initialFilter);
  const [isPaperType1Checked, setIsPaperType1Checked] =
    useState<boolean>(false);
  const [isPaperType2Checked, setIsPaperType2Checked] =
    useState<boolean>(false);

  useEffect(() => {
    if (isPaperType1Checked && isPaperType2Checked) setFilter(initialFilter);
    if (!isPaperType1Checked && !isPaperType2Checked) setFilter(initialFilter);
    if (isPaperType1Checked && !isPaperType2Checked) {
      setFilter({
        columnField: "active_paper_id",
        operatorValue: "contains",
        value: "sticky label paper",
      });
    }
    if (isPaperType2Checked && !isPaperType1Checked) {
      setFilter({
        columnField: "active_paper_id",
        operatorValue: "contains",
        value: "instruction paper",
      });
    }
  }, [isPaperType1Checked, isPaperType2Checked]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          width: "200px",
          marginRight: "25px",
          fontSize: "16px",
          letterSpacing: "1.14px",
          lineHeight: "19px",
        }}
      >
        <h3
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            marginTop: 0,
          }}
        >
          Filters
        </h3>
        <p style={{ fontWeight: "bold" }}>Paper type</p>
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <label>
            <input
              type="checkbox"
              name="paperType"
              value="sticky"
              id="sticky"
              style={{ backgroundColor: "black" }}
              onChange={(e) => setIsPaperType1Checked(e.target.checked)}
            />
            Sticky label paper
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="paperType"
              value="instruction"
              id="instruction"
              style={{ backgroundColor: "black" }}
              onChange={(e) => setIsPaperType2Checked(e.target.checked)}
            />
            Instruction paper
          </label>
        </div>
      </div>
      <div>
        <DataGrid
          style={{ width: 700 }}
          autoHeight={true}
          headerHeight={28}
          rowHeight={40}
          sx={printersTableStyle}
          checkboxSelection
          disableColumnMenu
          rows={rows}
          columns={columns}
          filterModel={{
            items: [filter],
          }}
        />
      </div>
    </div>
  );
};

export default PrintersTable;
