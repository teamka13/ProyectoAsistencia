import {
  exportToCSV,
  exportToExcel,
  exportToPDF,
} from "@root/src/utils/exportData";
import { FileDown, FileSpreadsheet, FileSignature } from "lucide-react";

type DataComponent = {
  data: any[];
  colums: any[];
};

export default function ExportButtons({ data, colums }: DataComponent) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => exportToPDF(data, colums)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 
            focus:ring-red-600  focus:outline-none focus:ring-2  focus:ring-offset-2 active:scale-95 active:shadow-inner active:opacity-90 transition-all duration-300"
      >
        <FileSignature className="w-5 h-5 text-red-600" />
        PDF
      </button>
      <button
        onClick={() => exportToExcel(data, colums)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50  
            focus:ring-emerald-600  focus:outline-none focus:ring-2  focus:ring-offset-2 active:scale-95 active:shadow-inner active:opacity-90 transition-all duration-300"
      >
        <FileSpreadsheet className="w-5 h-5 text-green-600" />
        Excel
      </button>
      <button
        onClick={() => exportToCSV(data, colums)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50  
             focus:ring-cyan-500 focus:outline-none focus:ring-2  focus:ring-offset-2 active:scale-95 active:shadow-inner active:opacity-90 transition-all duration-300"
      >
        <FileDown className="w-5 h-5 text-teal-600" />
        CSV
      </button>
    </div>
  );
}
