import { GridRenderCellParams } from "@mui/x-data-grid";

export function getStatusIcon(params: GridRenderCellParams) {
    return params.value ? (
      <img src="icons/enabled.svg" />
    ) : (
      <img src="icons/disabled.svg" />
    );
};