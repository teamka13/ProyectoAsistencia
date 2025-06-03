import { useState, useEffect } from "react";
import axios from "axios";

interface Grupo {
  id: number;
  semestre: string;
}

export default function useAllGroup() {
  const [grupos, setGrupos] = useState<Grupo[]>([]);

  useEffect(() => {
    axios
      .get<Grupo[]>("/api/Alumnos/Data/AllGruposQuery")
      .then((res) => {
        setGrupos(res.data);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
  }, []);

  return { grupos };
}
