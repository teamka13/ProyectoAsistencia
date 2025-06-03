"use client";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

type Usuario = {
  IdAlumno: string;
  Nombre: string;
  ApMaterno: string;
  ApPaterno: string;
  Matricula: string;
  CURP: string;
  NúmeroTel: string;
  Plantel: string;
};
type UsuariosProps = {
  numb: number | null;
  pages: number | null;
};
/*
Guardar dato
Traer Datos
Memorizar dato
Pagina actual
Total de paginas
  */

export default function Usuarios({ numb, pages }: UsuariosProps) {
  const [dataEffect, setDataEffect] = useState<Usuario[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPages = pages ?? 10;

  const totalpage = Math.ceil((numb ?? 10) / rowsPages);
  useEffect(() => {
    axios.get("/api/querys").then((datares) => {
      setDataEffect(datares.data);
      setCurrentPage(1);
      console.log("data recibida");
    });
  }, [numb, pages]);
  const dataRecibe = useMemo(() => {
    const inicio = (currentPage - 1) * rowsPages;
    const fin = inicio + rowsPages;
    return dataEffect.slice(inicio, fin);
  }, [dataEffect, currentPage]);
  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalpage) {
      setCurrentPage(newPage);
    }
  };
  return (
    <div className="p-6 bg-gray-300">
      <table
        className="min-w-full border border-gray-700 shadow-md 
      shadow-gray-600 rounded-lg hover:white "
      >
        <thead>
          <tr className="bg-gray-50">
            <th>Matrícula</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>CURP</th>
            <th>Teléfono</th>
            <th>Plantel</th>
          </tr>
        </thead>
        <tbody>
          {dataRecibe.map((alumno) => (
            <tr key={alumno.IdAlumno} className="hover:bg-gray-50">
              <td>{alumno.Matricula}</td>
              <td>{alumno.Nombre}</td>
              <td>{alumno.ApPaterno}</td>
              <td>{alumno.ApMaterno}</td>
              <td>{alumno.CURP}</td>
              <td>{alumno.NúmeroTel}</td>
              <td>{alumno.Plantel}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        {Array.from({ length: totalpage }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => changePage(i + 1)}
          >
            {i + 1}
          </button>
        )).slice(
          Math.max(0, currentPage - 3),
          Math.min(totalpage, currentPage + 2)
        )}

        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalpage}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
