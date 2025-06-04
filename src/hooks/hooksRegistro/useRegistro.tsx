import { useState, useRef, useEffect } from "react";
import { Estado, EstadoSalida } from "@/components/ui/tiposEntrada";
import { PropsQuery, PropsQueryComedor } from "@/utils/tipes";
import { RenderEntrada, RenderComedor, RenderSalida } from "./userRender";
import axios from "axios";
import { EstadoComedor } from "@/components/ui/tiposEntrada";

export function useValidarRegistro(clearInput: () => void) {
  const [FetchQuery, setFetchQuery] = useState<PropsQuery | null>(null);
  const [Estado, setEstado] = useState<Estado>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, []);

  const resetEstado = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    setFetchQuery(null);
    setEstado(null);
    clearInput();
  };

  const fetchQuery = async (inputEntrada: string): Promise<void> => {
    try {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      const res = await axios.get<PropsQuery | { error: string }>(
        "/api/Alumnos/Captura/entrada",
        {
          params: { Matricula: inputEntrada },
        }
      );

      if ("error" in res.data) {
        setEstado(res.data.error as Estado);
        console.log("Error recibido:", res.data.error);
      } else {
        const estadoValido: Estado =
          res.data.estado === "AT" || res.data.estado === "T"
            ? res.data.estado
            : "Error";

        setFetchQuery(res.data);
        setEstado(estadoValido);
      }

      timeoutRef.current = setTimeout(resetEstado, 5000);
    } catch (error: any) {
      const estadoMap: Record<number, Estado> = {
        422: "INVALID",
        409: "SINREGISTRO",
        404: "SEGUNDOREGISTRO",
      };
      const estadoError: Estado =
        axios.isAxiosError(error) && error.response
          ? estadoMap[error.response.status] || "Error"
          : "Error";
      setEstado(estadoError);
      timeoutRef.current = setTimeout(resetEstado, 5000);
    }
  };

  const renderQuery = RenderEntrada(Estado, FetchQuery);

  return { fetchQuery, renderQuery };
}

export function useValidarComedor(clearInput: () => void) {
  const [fetchQueryData, setFetchQueryData] =
    useState<PropsQueryComedor | null>(null);
  const [estado, setEstado] = useState<EstadoComedor | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const resetEstado = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    setFetchQueryData(null);
    setEstado(null);
    clearInput();
  };

  const fetchQuery = async (inputComedor: string): Promise<void> => {
    try {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      const res = await axios.get<PropsQueryComedor | { error: string }>(
        "/api/Alumnos/Captura/comedor",
        { params: { Matricula: inputComedor } }
      );

      if ("error" in res.data) {
        setEstado(res.data.error as EstadoComedor);
        console.log("Error recibido:", res.data.error);
      } else {
        const { estado: apiEstado, ...query } = res.data;
        setFetchQueryData(query as PropsQueryComedor);
        setEstado(apiEstado as EstadoComedor);
        console.log("Datos renderizados:", query);
      }

      timeoutRef.current = setTimeout(resetEstado, 5000);
    } catch (error: any) {
      const estadoMap: Record<number, EstadoComedor> = {
        422: "INVALID",
        409: "SINREGISTRO",
        404: "SINENTRADA",
      };
      const estadoError: EstadoComedor =
        axios.isAxiosError(error) && error.response
          ? estadoMap[error.response.status] || "Error"
          : "Error";
      setEstado(estadoError);
      timeoutRef.current = setTimeout(resetEstado, 5000);
    }
  };
  const renderQueryComedor = RenderComedor(estado, fetchQueryData);

  return { fetchQuery, renderQueryComedor };
}

export function useValidarSalida(clearInput: () => void) {
  const [FetchQuery, setFetchQuery] = useState<PropsQuery | null>(null);
  const [Estado, setEstado] = useState<EstadoSalida>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, []);

  const resetEstado = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    setFetchQuery(null);
    setEstado(null);
    clearInput();
  };

  const fetchQuery = async (inputEntrada: string): Promise<void> => {
    try {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      const res = await axios.get<PropsQuery | { error: string }>(
        "/api/Alumnos/Captura/salida",
        {
          params: { Matricula: inputEntrada },
        }
      );

      if ("error" in res.data) {
        // Asignamos directamente el mensaje de error recibido
        setEstado(res.data.error as EstadoSalida);
        console.log("Error recibido:", res.data.error);
        return;
      } else {
        const estadoValido: EstadoSalida =
          res.data.estado === "ANTES" || res.data.estado === "DESPUES"
            ? res.data.estado
            : "Error";

        setFetchQuery(res.data);
        setEstado(estadoValido);
      }

      timeoutRef.current = setTimeout(resetEstado, 5000);
    } catch (error: any) {
      const estadoMap: Record<number, EstadoSalida> = {
        422: "INVALID",
        409: "SINREGISTRO",
        404: "SEGUNDOREGISTRO",
        401: "SINENTRADA",
      };
      const estadoError: EstadoSalida =
        axios.isAxiosError(error) && error.response
          ? estadoMap[error.response.status] || "Error"
          : "Error";
      setEstado(estadoError);
      timeoutRef.current = setTimeout(resetEstado, 5000);
    }
  };

  const renderQuery = RenderSalida(Estado, FetchQuery);

  return { fetchQuery, renderQuery };
}
