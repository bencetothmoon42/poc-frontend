import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { gql, useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { tableStyle } from "../../styles/mui-datagrid";
import { getStatusIcon } from "../../utils/statusIcon";
import Image from "next/image";
import expandDown from "../../public/icons/expand-down.svg";

const GET_PRINTERS = gql`
    query printers ($filterBy: FiltersInput) {
      printers (filterBy: $filterBy) {
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
    renderCell: (params) => getStatusIcon(params),
  },
  {
    field: "expand",
    headerName: "",
    width: 50,
    cellClassName: "column-with-centered-text",
    renderCell: () => {
      return <Image src={expandDown} alt="expand button"/>;
    },
  },
];

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

const ListView: NextPage = () => {
  const [filter, setFilter] = useState<IFilter>(initialFilter);
  const [isCheckboxVisible, setIsCheckboxVisible] = useState<boolean>(false)
  const [isPaperType1Checked, setIsPaperType1Checked] =
    useState<boolean>(false);
  const [isPaperType2Checked, setIsPaperType2Checked] =
    useState<boolean>(false);
  const [printerData, setPrinterData] = useState<IConvertedPrinter[]>([]);
  const [fadeOut, setFadeOut] = useState<boolean>(false)

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

  const hideCheckbox = () => {
    setFadeOut(true)
    setTimeout(() => {
      setIsCheckboxVisible(false)
      setFadeOut(false)
    }, 500)
  }

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data?.printers) {
      setPrinterData(convertPrinterData(data.printers));
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
        <div className="flex mb-5 mt-4 items-center">
          <span className="flex mr-1.5 content-center">
            <Image src={expandDown} alt="expand button"
              onClick={isCheckboxVisible ? hideCheckbox : () => setIsCheckboxVisible(true)}
            />
          </span>
          <p className="font-bold">Paper type</p>
        </div>
        {isCheckboxVisible ? (
          <div className={`${fadeOut ? `animate-fadeOut`: `animate-fadeIn`}`}>
            <div className="my-5">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="paperType"
                  value="sticky"
                  id="sticky"
                  className="h-[18px] w-[18px] mr-4 ml-2.5 appearance-none border-2 border-pnc-black rounded-none checked:bg-checkbox bg-no-repeat bg-center"
                  onChange={(e) => setIsPaperType1Checked(e.target.checked)}
                />
                Sticky label paper
              </label>
            </div>
            <div className="my-5">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="paperType"
                  value="instruction"
                  id="instruction"
                  className="h-[18px] w-[18px] mr-4 ml-2.5 appearance-none border-2 border-pnc-black rounded-none checked:bg-checkbox bg-no-repeat bg-center"
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
          style={{ width: 708 }}
          autoHeight={true}
          headerHeight={28}
          rowHeight={40}
          sx={tableStyle}
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

export default ListView;
