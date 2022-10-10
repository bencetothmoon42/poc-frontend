import { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { tableStyle } from "../../styles/mui-datagrid";
import { getStatusIcon } from "../../utils/statusIcon";

const GET_DESTINATIONS = gql`
  query {
    getAllDestination {
        id
        houseId
        name
        description
        enabled
        location
    }
  }
`;

const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      cellClassName: "column-with-bold-text",
    },
    { field: "location", headerName: "Location", minWidth: 170 },
    { field: "description", headerName: "Comment", minWidth: 190 },
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
        return <img src="icons/expand-down.svg" />;
      },
    },
];

interface IDestination {
    id: string;
    houseId: string;
    name: string;
    description: string;
    enabled: boolean;
    location: string;
}

const DestinationsTable: NextPage = () => {
    const [destinationData, setDestinationData] = useState<IDestination[]>([]);
    
    const { data, error } = useQuery(GET_DESTINATIONS);

    useEffect(() => {
        if (error) {
          console.log(error);
        }
        if (data?.getAllDestination) {
            setDestinationData(data.getAllDestination);
        }
      }, [data, error]);

    return (
        <div className="w-full flex justify-center mt-12">
            <div>
                <DataGrid
                style={{ width: 700 }}
                autoHeight={true}
                headerHeight={28}
                rowHeight={40}
                sx={tableStyle}
                checkboxSelection
                disableColumnMenu
                rows={destinationData}
                columns={columns}
                />
            </div>
        </div>
    )
}

export default DestinationsTable
