import { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { tableStyle } from "../../styles/mui-datagrid";

const GET_HOUSES = gql`
  query {
    getAllHouses {
        id
        name
    }
  }
`;

const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 290,
      cellClassName: "column-with-bold-text",
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

interface IHouse {
    id: string;
    name: string;
}

const HousesTable: NextPage = () => {
    const [houseData, setHouseData] = useState<IHouse[]>([]);

    const { data, error } = useQuery(GET_HOUSES);

    useEffect(() => {
        if (error) {
          console.log(error);
        }
        if (data?.getAllHouses) {
            setHouseData(data.getAllHouses);
        }
      }, [data, error]);

    return (
        <div className="w-full flex justify-center mt-12">
            <div>
                <DataGrid
                style={{ width: 400 }}
                autoHeight={true}
                headerHeight={28}
                rowHeight={40}
                sx={tableStyle}
                checkboxSelection
                disableColumnMenu
                rows={houseData}
                columns={columns}
                />
            </div>
        </div>
    )
}

export default HousesTable