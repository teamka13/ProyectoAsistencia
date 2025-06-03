import { useState, useEffect } from "react";
import axios from "axios";

interface Grupo {
  id: string;
  plantel: string;
}

export default function usePlantel() {
  const [plantel, setplantel] = useState<Grupo[]>([]);

  useEffect(() => {
    axios
      .get<Grupo[]>("/api/Alumnos/Data/Planteles")
      .then((res) => {
        setplantel(res.data);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
  }, []);

  return { plantel };
}
