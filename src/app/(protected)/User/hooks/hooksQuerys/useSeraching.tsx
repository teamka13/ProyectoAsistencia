import { useMemo, useState } from "react";

export interface useSearchingProps<T> {
  data: T[];
  keys: (keyof T)[];
}

function useSearching<T extends object>({
  data = [],
  keys,
}: useSearchingProps<T>) {
  const [search, setSearch] = useState("");
  const filterData = useMemo(() => {
    if (!search.trim()) return data;
    return data.filter((item) =>
      keys.some((key) => {
        const value = item[key];
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, data, keys]);

  return { search, setSearch, filterData };
}
export default useSearching;
