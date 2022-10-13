import { GridRenderCellParams } from "@mui/x-data-grid";
import Image from "next/image";
import enabled from "../public/icons/enabled.svg";
import disabled from "../public/icons/disabled.svg";


export function getStatusIcon(params: GridRenderCellParams) {
    return params.value ? (
      <Image src={enabled} alt="enabled"/>
    ) : (
      <Image src={disabled} alt="disabled"/>
    );
};