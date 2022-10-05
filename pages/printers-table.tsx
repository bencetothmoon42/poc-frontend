import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { gql, useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { printersTableStyle } from "../styles/mui-datagrid";

const GET_PRINTERS = gql`
  query {
    getAllPrinter {
      id
      name
      description
      enabled
      activePaperId
      dataFormat
      location
      model
      serialNumber
      comment
      destinationId
    }
  }
`;

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    minWidth: 180,
    cellClassName: "column-with-bold-text",
  },
  { field: "activePaperId", headerName: "Current paper", minWidth: 170 },
  { field: "comment", headerName: "Comment", minWidth: 160 },
  {
    field: "enabled",
    headerName: "Enabled",
    width: 90,
    cellClassName: "column-with-centered-text",
    renderCell: (params) => getIcon(params),
  },
  {
    field: "expand",
    headerName: "",
    width: 50,
    cellClassName: "column-with-centered-text",
    renderCell: () => {
      return <img src="icons/expand-down.svg" />;
    },
  },
];

const getIcon = (params: GridRenderCellParams) => {
  return params.value ? (
    <img src="icons/enabled.svg" />
  ) : (
    <img src="icons/disabled.svg" />
  );
};

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

interface IPrinter {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  activePaperId: number;
  dataFormat: string;
  location: string;
  model: string;
  serialNumber: string;
  comment: string;
  destinationId: string;
}

interface IConvertedPrinter {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  activePaperId: string;
  dataFormat: string;
  location: string;
  model: string;
  serialNumber: string;
  comment: string;
  destinationId: string;
}

const PrintersTable: NextPage = () => {
  const [filter, setFilter] = useState<IFilter>(initialFilter);
  const [isPaperType1Checked, setIsPaperType1Checked] =
    useState<boolean>(false);
  const [isPaperType2Checked, setIsPaperType2Checked] =
    useState<boolean>(false);
  const [printerData, setPrinterData] = useState<IConvertedPrinter[]>([]);
  const [isCheckboxVisible, setIsCheckboxVisible] = useState<boolean>(false)

  const { data, error } = useQuery(GET_PRINTERS);

  const convertPrinterData = (data: IPrinter[]): IConvertedPrinter[] => {
    let convertedPrinterData: IConvertedPrinter[] = [];
    convertedPrinterData = data.map((printer) =>
      printer.activePaperId % 3 === 0
        ? { ...printer, activePaperId: "sticky label paper" }
        : { ...printer, activePaperId: "instruction paper" }
    );
    return convertedPrinterData;
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data?.getAllPrinter) {
      setPrinterData(convertPrinterData(data.getAllPrinter));
    }
  }, [data, error]);

  useEffect(() => {
    if (isPaperType1Checked && isPaperType2Checked) setFilter(initialFilter);
    if (!isPaperType1Checked && !isPaperType2Checked) setFilter(initialFilter);
    if (isPaperType1Checked && !isPaperType2Checked) {
      setFilter({
        columnField: "activePaperId",
        operatorValue: "contains",
        value: "sticky label paper",
      });
    }
    if (isPaperType2Checked && !isPaperType1Checked) {
      setFilter({
        columnField: "activePaperId",
        operatorValue: "contains",
        value: "instruction paper",
      });
    }
  }, [isPaperType1Checked, isPaperType2Checked]);

  return (
    <div className="w-full flex justify-center mt-12">
      <div className="w-60 text-sm tracking-wide mr-10">
        <h3 className="uppercase font-bold mt-0">
          Filters
        </h3>
        <div className="flex mb-5 mt-4">
          <img className="mr-1.5" src="icons/expand-down.svg" 
            onClick={isCheckboxVisible ? () => setIsCheckboxVisible(false) : () => setIsCheckboxVisible(true)}
          />
          <p className="font-bold">Paper type</p>
        </div>
        {isCheckboxVisible ? (
          <div className="my-5">
            <div>
              <label>
                <input
                  type="checkbox"
                  name="paperType"
                  value="sticky"
                  id="sticky"
                  className="bg-pnc-black mr-4 ml-2.5"
                  onChange={(e) => setIsPaperType1Checked(e.target.checked)}
                />
                Sticky label paper
              </label>
            </div>
            <div className="my-5">
              <label>
                <input
                  type="checkbox"
                  name="paperType"
                  value="instruction"
                  id="instruction"
                  className="bg-pnc-black mr-4 ml-2.5"
                  onChange={(e) => setIsPaperType2Checked(e.target.checked)}
                />
                Instruction paper
              </label>
            </div>
          </div>
        ) : null }
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
          rows={printerData}
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
