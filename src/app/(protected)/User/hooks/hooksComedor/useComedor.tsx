import { useState, useRef, useEffect } from "react";
import { PropsQuery } from "@/utils/tipes";
import { RenderComedor } from "@/hooks/hooksRegistro/userRender";
import { EstadoComedor } from "@/components/ui/tiposEntrada";
import axios from "axios";

export function useValidarComedor(clearInput: () => void) {
  const [DatosQuery, setDatosQuery] = useState<PropsQuery | null>(null);
  const [Estado, setEstado] = useState<EstadoComedor | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetEstado = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    setDatosQuery(null);
    setEstado(null);
    clearInput();
  };
  useEffect(() => {
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, []);

  const fetchQuery = async (inputComedor: string): Promise<void> => {
    try {
      resetEstado();
      const res = await axios.get<PropsQuery | { error: string }>(
        "api/Alumnos/Captura/comedor",
        { params: { Matricula: inputComedor } }
      );
      if ("error" in res.data) {
        setEstado(res.data.error === "SINREGISTRO" ? "NF" : "Error");
        return;
      }
      setDatosQuery(res.data);
      setEstado("C");

      timeoutRef.current = setTimeout(resetEstado, 4000);
    } catch (error: any) {
      const estadoError: EstadoComedor =
        axios.isAxiosError(error) && error.response
          ? error.response.status === 409
            ? "SR"
            : error.response.status === 404 || error.response.status === 400
            ? "NF"
            : "Error"
          : "Error";
      setEstado(estadoError);
      timeoutRef.current = setTimeout(resetEstado, 4000);
    }
  };
  const renderQueryComedor = RenderComedor(Estado, DatosQuery);
  return { fetchQuery, renderQueryComedor };
}
