"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import useSearching from "../../../../hooks/hooksQuerys/useSeraching";
import usePagination from "../../../../hooks/hooksQuerys/usePagination";
import TableSkeleton from "@/components/skeletons/tableSkeleton";
import { General } from "@/components/features/colums";
import ExportButtons from "@/components/features/exportButtons";
import { BtnPagination } from "@/components/features/pagination";
import { Search } from "lucide-react";
import { Usuario } from "@/utils/tipes";
import useEstado from "@/hooks/DataHooks/useEstado";
import usePersonal from "@/hooks/DataHooks/usePersonal";

export function Consult() {
  const [dataEffect, setDataEffect] = useState<Usuario[]>([]);
  const [estado, setEstado] = useState("500");
  const [tipo, setTipo] = useState("10");
  const [loading, setIsLoading] = useState(false);

  const { estadoRD } = useEstado();
  const { personal } = usePersonal();

  const handleParamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    name === "estado" ? setEstado(value) : setTipo(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.post("/api/Alumnos/Busqueda", {
          estado,
          tipo,
        });
        setDataEffect(res.data);

        // Simulación de retardo (opcional)
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [estado, tipo]);

  const { search, setSearch, filterData } = useSearching<Usuario>({
    data: dataEffect,
    keys: ["Nombre", "Paterno", "Materno", "Matrícula", "Teléfono", "Semestre"],
  });

  const { currentData, currentPage, totalPage, changePage } = usePagination({
    dataEffect: filterData,
    numb: filterData.length,
  });
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
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                {Object.keys(currentData[0])
                  .filter((key) => key !== "IdAlumno")
                  .map((key) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-sm font-semibold text-indigo-800 uppercase tracking-wider"
                    >
                      {key}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-indigo-50 transition-colors"
                >
                  {Object.entries(row)
                    .filter(([key]) => key !== "IdAlumno")
                    .map(([key, value]) => (
                      <td
                        key={key}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700"
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
    <div className="p-6 mt-6 max-w-7xl mx-auto bg-gray-200 rounded-lg shadow-lg shadow-gray-800">
      {/* Encabezado */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Search className="text-indigo-600 mr-3 h-6 w-6" />
          <h1 className="text-2xl font-bold text-indigo-800">
            Búsqueda General de Alumnos
          </h1>
        </div>
      </div>
      <div className="flex flex-wrap items-center  gap-4 mb-6">
        {/* Controles de paginación */}
        <input
          type="text"
          placeholder="Buscar alumno..."
          className="p-3 border-2 border-indigo-300 rounded-lg w-full focus:outline-none focus:ring-2 
          focus:ring-indigo-500 focus:ring-offset-2 active:scale-97 active:shadow-inner active:opacity-90 transition-all duration-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          name="tipo"
          value={tipo}
          onChange={handleParamChange}
          className="h-10 w-40  text-center bg-white  rounded-md shadow-sm hover:bg-gray-100  
            focus:ring-emerald-600  focus:outline-none focus:ring-2  focus:ring-offset-2 active:scale-95 active:shadow-inner active:opacity-90 transition-all duration-300"
        >
          <option disabled value={""}>
            Selecciona el tipo
          </option>
          {personal.map((p) => (
            <option key={p.id} value={p.id}>
              {p.personal}
            </option>
          ))}
        </select>
        <select
          name="estado"
          value={estado}
          onChange={handleParamChange}
          className="h-10 w-45  text-center  bg-white  rounded-md shadow-sm hover:bg-gray-100  
            focus:ring-emerald-600  focus:outline-none focus:ring-2  focus:ring-offset-2 active:scale-95 active:shadow-inner active:opacity-90 transition-all duration-300"
        >
          <option disabled value={""}>
            Selecciona el estado
          </option>
          {estadoRD.map((e) => (
            <option key={e.id} value={e.id}>
              {e.estado}
            </option>
          ))}
        </select>

        <ExportButtons data={filterData} colums={General} />
      </div>

      {/* Tabla de datos */}
      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-lg shadow-gray-400">
        {renderTableContent()}
      </div>
      {pagination()}
    </div>
  );
}
