export interface IPrinter {
  id: number;
  name: string;
  description: string;
  uri: string;
  enabled: boolean;
  active_paper_id: string | number;
  data_format: string;
  location: string;
  model: string;
  serial_number: number;
  comment: string;
}

export function printerDataFactory() {
  const amountOfPrinters: number = 50;
  const printers: IPrinter[] = [];
  let formattedPrinters: IPrinter[] = [];

  for (let i = 0; i < amountOfPrinters; i++) {
    let printerModel = {
      id: i + 1,
      name: `ETI_0072_SATO_${i}`,
      description: "Etikettendrucker SATO (CL4NX)",
      uri: "socket://192.168.104.16",
      enabled: i % 2 === 0 ? true : false,
      active_paper_id: i % 4 === 0 ? 2 : 1,
      data_format: "STCL",
      location: "Retail Tech, Tower 10. OG",
      model: "SATO CL4NX",
      serial_number: 123,
      comment: `${i % 5 === 0 ? "" : `comment${i}`}`,
    };
    printers.push(printerModel);
  }

  formattedPrinters = printers.map((p) =>
    p.active_paper_id === 1
      ? { ...p, active_paper_id: "sticky label paper" }
      : { ...p, active_paper_id: "instruction paper" }
  );
  return formattedPrinters;
}
