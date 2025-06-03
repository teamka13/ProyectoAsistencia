import { saveAs } from "file-saver";
import { utils as XLSXUtils, writeFile as writeXLSXFile } from "xlsx";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { MesData } from "./tipes";

// Tipado para las columnas dinámicas
type ExportColumn = {
  field: string;
  header: string; // título
};

// CSV dinámico
export const exportToCSV = (
  data: any[],
  columns: ExportColumn[],
  filename = "data.csv"
) => {
  const filteredData = data.map((item) => {
    const filteredItem: any = {};
    columns.forEach((col) => {
      filteredItem[col.header] = item[col.field];
    });
    return filteredItem;
  });

  const csv = Papa.unparse(filteredData);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, filename);
};

// Excel dinámico
export const exportToExcel = (
  data: any[],
  columns: ExportColumn[],
  filename = "data.xlsx"
) => {
  const filteredData = data.map((item) => {
    const filteredItem: any = {};
    columns.forEach((col) => {
      filteredItem[col.header] = item[col.field];
    });
    return filteredItem;
  });

  const worksheet = XLSXUtils.json_to_sheet(filteredData);
  const workbook = XLSXUtils.book_new();
  XLSXUtils.book_append_sheet(workbook, worksheet, "Sheet1");
  writeXLSXFile(workbook, filename);
};

// PDF dinámico
export const exportToPDF = (
  data: any[],
  columns: ExportColumn[],
  filename = ".pdf"
) => {
  const doc = new jsPDF();

  autoTable(doc, {
    head: [columns.map((col) => col.header)],
    startY: 5,
    margin: { top: 10, left: 10, right: 10 },
    body: data.map((item) => columns.map((col) => item[col.field] || "")),
    styles: { fontSize: 8 },
    headStyles: { fillColor: "#2c3e50" },
    tableWidth: "auto",
  });

  doc.save(filename);
};

export const transformarDatos = (data: MesData[], cantidadDias: number) => {
  return data.map((item) => {
    const diasSeparados: { [key: string]: string | number } = {};

    for (let i = 0; i < cantidadDias; i++) {
      const valor = item.Dias?.[i] ?? "";
      diasSeparados[`Dia_${i + 1}`] = valor === 100 ? "✓" : valor || "-";
    }

    return {
      Matricula: item.Matricula,
      Nombre: item.Nombre,
      Paterno: item.Paterno,
      Materno: item.Materno,
      Sexo: item.Sexo,
      Semestre: item.Semestre,
      Nivel: item.Nivel,
      ...diasSeparados,
    };
  });
};
export const generarColumnasDias = (cantidadDias: number) => {
  const columnasDias = [];
  for (let i = 1; i <= cantidadDias; i++) {
    columnasDias.push({ field: `Dia_${i}`, header: `Día ${i}` });
  }
  return columnasDias;
};
