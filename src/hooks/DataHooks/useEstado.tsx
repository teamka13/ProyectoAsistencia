import { useState, useEffect } from "react";
import axios from "axios";

interface estado {
  id: string;
  estado: string;
}

export default function useEstado() {
  const [estadoRD, setEstado] = useState<estado[]>([]);

  useEffect(() => {
    axios
      .get<estado[]>("/api/Alumnos/Data/Estado")
      .then((res) => {
        setEstado(res.data);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
  }, []);

  return { estadoRD };
}
