import { useEffect, useMemo, useState } from "react";

interface UsuariosProps<T> {
  dataEffect: T[];
  numb: number;
}
function usePagination<T>({ dataEffect, numb }: UsuariosProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = 10;
  const totalPage = Math.ceil((numb ?? 5) / pages);

  useEffect(() => {
    const totalPages = Math.ceil((numb ?? 5) / pages);
    if (currentPage > totalPages) {
      setCurrentPage(1); // o setCurrentPage(totalPages);
    }
  }, [dataEffect.length, pages]);

  const currentData = useMemo(() => {
    const inicio = (currentPage - 1) * pages;
    const fin = inicio + pages;
    return dataEffect.slice(inicio, inicio + pages);
  }, [dataEffect, currentPage, pages]);

  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setCurrentPage(newPage);
    }
  };
  return {
    currentPage,
    totalPage,
    currentData,
    changePage,
  };
}
export default usePagination;
