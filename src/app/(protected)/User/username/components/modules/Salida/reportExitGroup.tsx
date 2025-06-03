"use client";
import { useState } from "react";
import axios from "axios";
import useSearching from "@/app/(protected)/User/hooks/hooksQuerys/useSeraching";
import { BtnPagination } from "@/components/features/pagination";
import TableSkeleton from "@/components/skeletons/tableSkeleton";
import { ReporteParams } from "@/utils/tipes";
import { AsistenciaData } from "@/utils/tipes";
import ExportButtons from "@/components/features/exportButtons";
import { DialyAttendance } from "@/components/features/colums";
import {
  Calendar,
  Search,
  AlertTriangle,
  Loader2,
  DoorOpen,
} from "lucide-react";
import usePagination from "../../../../hooks/hooksQuerys/usePagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useGroup from "@/hooks/DataHooks/useGroups";

export function ReporteSalidaDiario() {
  const { grupos } = useGroup();
  const today = new Date();
  const [params, setParams] = useState<ReporteParams>({
    idMes: today.getMonth() + 1,
    anio: today.getFullYear(),
    dia: today.getDate(),
    idGrupo: 0,
  });
  const [data, setData] = useState<AsistenciaData[]>([]);
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "/api/Alumnos/Salida/reportExitGroup",
        params
      );
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error al obtener datos:", err);
      setError("Error al cargar el reporte");
      setLoading(undefined);
    }
  };

  const handleParamChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setParams((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };
  const { search, setSearch, filterData } = useSearching<AsistenciaData>({
    data,
    keys: ["Nombre", "ApPaterno", "ApMaterno", "Matrícula", "Semestre"],
  });
  const { currentData, currentPage, totalPage, changePage } = usePagination({
    dataEffect: filterData,
    numb: data.length,
  });

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setParams((prev) => ({
        ...prev,
        dia: date.getDate(),
        idMes: date.getMonth() + 1,
        anio: date.getFullYear(),
      }));
    }
  };
  const pagination = () => {
    if (!loading && filterData.length > 0) {
      return (
        <BtnPagination
          changePage={changePage}
          currentPage={currentPage}
          totalPage={totalPage}
        />
      );
    }
    return null;
  };
  const renderTableContent = () => {
    if (loading) {
      return <TableSkeleton />;
    }
    if (currentData.length > 0) {
      return (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-300">
              <tr>
                {Object.keys(currentData[0])
                  .filter((key) => key !== "IdAlumno")
                  .map((key) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-sm font-semibold text-black uppercase tracking-wider w-48"
                    >
                      {key}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {Object.entries(row)
                    .filter(([key]) => key !== "IdAlumno")
                    .map(([key, value]) => (
                      <td
                        key={key}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium hover:text-black hover:font-bold text-gray-500"
                      >
                        {value || <span className="text-gray-400">-</span>}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };
  return (
    <div className="p-6 mt-6 max-w-7xl mx-auto bg-white rounded-lg shadow-sm border-l-4 border-emerald-500">
      <div className="p-4 bg-emerald-50 rounded-lg shadow-sm shadow-green-700">
        {/* Encabezado */}
        <div className="flex items-center mb-6">
          <DoorOpen className="text-emerald-600 mr-3 h-5 w-5" />{" "}
          {/* Icono de puerta */}
          <h1 className="text-2xl font-bold text-emerald-800">
            Reporte Diario de Salida
          </h1>
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar alumno..."
            className="p-2 border-4 border-emerald-300 rounded-lg w-full 
            focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all uppercase"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Filtros */}
        <div className="flex flex-wrap items-end gap-3 mb-6">
          {/* Fecha */}

          <div className="w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha
            </label>
            <div className="relative flex items-center h-10">
              <Calendar className="absolute left-3 h-4 w-4 text-gray-400" />
              <DatePicker
                selected={new Date(params.anio, params.idMes - 1, params.dia)}
                onChange={handleDateChange}
                className="pl-10 pr-3 py-2 h-10 w-48 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>

          {/* Grupo */}
          <div className="w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grupo
            </label>
            <div className="relative flex items-center h-10">
              <Search className="absolute left-3 h-4 w-4 text-gray-400" />
              <select
                name="idGrupo"
                value={params.idGrupo}
                onChange={handleParamChange}
                className="pl-10 pr-8 py-2 h-10 w-48 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option disabled value={0}>
                  Buscar Grupo
                </option>
                {grupos.map((grupo) => (
                  <option key={grupo.id} value={grupo.id}>
                    {grupo.semestre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botón */}
          <div className="w-auto h-10">
            <button
              onClick={fetchData}
              disabled={loading}
              className="h-full px-4 py-2 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white rounded-md shadow 
              hover:from-emerald-600 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 
              disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Buscando
                </span>
              ) : (
                <span className="flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </span>
              )}
            </button>
          </div>
          <div>
            <ExportButtons colums={DialyAttendance} data={data} />
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="flex items-start p-4 mb-6 bg-red-50 border-l-4 border-red-500 rounded">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        {renderTableContent()}
        {pagination()}
      </div>
    </div>
  );
}
