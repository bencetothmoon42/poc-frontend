import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'current_paper', headerName: 'Current paper', width: 200 },
    { field: 'comment', headerName: 'Comment', width: 200 },
    { field: 'enabled', headerName: 'Enabled', width: 100 },
];

const rows: GridRowsProp = [
    {id: 1, name: 'ETI 0359 SATO 3', current_paper: 'sticky label paper', comment: 'socket: 092.97.81.15', enabled: 'y'},
    {id: 2, name: 'ETI 0358 SATO 8', current_paper: 'instruction paper', comment: 'socket: 200.97.81.15', enabled: 'x'},
    {id: 3, name: 'ETI 0259 SATO 3', current_paper: 'sticky label paper', comment: 'socket: 092.97.81.33', enabled: 'y'},
];

export interface IFilter {
    columnField: string,
    operatorValue: string,
    value: string
}

const initialFilter = {
    columnField: '',
    operatorValue: '',
    value: ''
}

const MUIGrid: NextPage = () => {
    const [filter, setFilter] = useState<IFilter>(initialFilter)
    const [isPaperType1Checked, setIsPaperType1Checked] = useState<boolean>(false)
    const [isPaperType2Checked, setIsPaperType2Checked] = useState<boolean>(false)

    useEffect(() => {
        if (isPaperType1Checked && isPaperType2Checked) setFilter(initialFilter)
        if (!isPaperType1Checked && !isPaperType2Checked) setFilter(initialFilter)
        if (isPaperType1Checked && !isPaperType2Checked) {
            setFilter({
                columnField: "current_paper",
                operatorValue: "contains",
                value: "sticky label paper"
            })
        }
        if (isPaperType2Checked && !isPaperType1Checked) {
            setFilter({
                columnField: "current_paper",
                operatorValue: "contains",
                value: "instruction paper"
            })
        }
    }, [isPaperType1Checked, isPaperType2Checked])
    
    return (
        <div>
        <div style={{ display: 'flex', marginLeft: 'auto', marginBottom: '20px', color: 'gray'}}>
            <p style={{ margin: 0, fontWeight: 'bold'}}>Paper type:</p>
            <label>
                <input
                    type="checkbox"
                    name="paperType"
                    value="sticky"
                    id="sticky"
                    onChange={e => setIsPaperType1Checked(e.target.checked)}
                />
                Sticky label paper
            </label>
            <label>
                <input
                    type="checkbox"
                    name="paperType"
                    value="instruction"
                    id="instruction"
                    onChange={e => setIsPaperType2Checked(e.target.checked)}
                />
                Instruction paper
            </label>
        </div>
        <div style={{ height: 330, width: 710 }}>
            <DataGrid disableColumnFilter  disableColumnSelector disableDensitySelector rows={rows} columns={columns} 
                filterModel={{
                    items: [filter],
                }}
                components={{ Toolbar: GridToolbar }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true, //doesn't work
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
            />
        </div>
        </div>
    );
}

export default MUIGrid