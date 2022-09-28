import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { NextPage } from 'next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RowNode } from 'ag-grid-community';

export interface IPrinterData {
    name: string;
    paperType: string;
    comment: string;
    enabled: string;
}

let columnDefs = [
    { field: 'name' },
    { headerName: 'Current paper', field: 'paperType' },
    { field: 'comment' },
    { field: 'enabled' },
]

let rowData = [
    {name: 'ETI 0359 SATO 3', paperType: 'sticky label paper', comment: 'socket: 092.97.81.15', enabled: 'y'},
    {name: 'ETI 0358 SATO 8', paperType: 'instruction paper', comment: 'socket: 200.97.81.15', enabled: 'x'},
    {name: 'ETI 0259 SATO 3', paperType: 'sticky label paper', comment: 'socket: 092.97.81.33', enabled: 'y'},
]

const AGGrid: NextPage = () => {
    const gridRef = useRef<AgGridReact>(null);
    const [isPaperType1Checked, setIsPaperType1Checked] = useState<boolean>(false)
    const [isPaperType2Checked, setIsPaperType2Checked] = useState<boolean>(false)

    const onSearch = useCallback(() => {
        gridRef.current!.api.setQuickFilter(
            (document.getElementById('filter-text-box') as HTMLInputElement).value
        );
    }, []);

    useEffect(() => {
        gridRef.current!.api?.onFilterChanged();
    }, [isPaperType1Checked, isPaperType2Checked])

    const isExternalFilterPresent = useCallback((): boolean => {
        if (isPaperType1Checked === true && isPaperType2Checked === true) return false
        if (isPaperType1Checked === false && isPaperType2Checked === false) return false
        return true
      }, [isPaperType1Checked, isPaperType2Checked]);

    const doesExternalFilterPass = useCallback(
        (node: RowNode<IPrinterData>): boolean => {
            if (node.data) {
                if (isPaperType1Checked === true) return node.data.paperType === 'sticky label paper'; 
                if (isPaperType2Checked === true) return node.data.paperType === 'instruction paper'; 
            }
            return true
        }, [isPaperType1Checked, isPaperType2Checked]);

    return (
        <div className="ag-theme-alpine" style={{ height: '200px', width: '830px'}}>
            <div style={{ display: 'flex'}}>
                <input
                    type="text"
                    id="filter-text-box"
                    placeholder="Filter..."
                    onInput={onSearch}
                />
                <div style={{ display: 'flex', marginLeft: 'auto', color: 'gray'}}>
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
            </div>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                animateRows={true}
                isExternalFilterPresent={isExternalFilterPresent}
                doesExternalFilterPass={doesExternalFilterPass}
            ></AgGridReact>
        </div>
    )
}

export default AGGrid