import { useState } from "react";

export default function usePageSettings(defaultPages = 10, defaultNumb = 50) {
  const [pages, setPages] = useState<number>(defaultPages);
  const [numb, setNumb] = useState<number>(defaultNumb);

  const [tempPages, setTempPages] = useState<number>(defaultPages);
  const [tempNumb, setTempNumb] = useState<number>(defaultNumb);

  const pagesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTempPages(Number(e.target.value));
  };

  const numbChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTempNumb(Number(e.target.value));
  };

  const aplicarCambios = () => {
    setPages(tempPages);
    setNumb(tempNumb);
  };

  return {
    pages,
    numb,
    tempPages,
    tempNumb,
    pagesChange,
    numbChange,
    aplicarCambios,
  };
}
