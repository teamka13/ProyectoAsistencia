import { useState, useEffect } from "react";
import axios from "axios";

interface Personal {
  id: number;
  personal: string;
}

export default function usePersonal() {
  const [personal, setpersonal] = useState<Personal[]>([]);

  useEffect(() => {
    axios
      .get<Personal[]>("/api/Alumnos/Data/Personal")
      .then((res) => {
        setpersonal(res.data);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
  }, []);

  return { personal };
}
