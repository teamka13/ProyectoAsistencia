import { PropsQuery, PropsQueryComedor } from "@/utils/tipes";
import {
  ErrorDesconocido,
  RegistroTarde,
  YaRegistrado,
  MatriculaNoEncontrada,
  RegistroComedor,
  RegistroExitoso,
  INVALID,
  Error,
  SinAsistencia,
  SalidaAnticipada,
  SalidaExitosa,
  YaRegistradoSalida,
} from "@/components/ui/tiposEntrada";

export function RenderEntrada(
  estado: string | null,
  datosQuery: PropsQuery | null
): React.ReactElement | null {
  if (!estado) return null;

  switch (estado) {
    case "AT":
      return datosQuery ? <RegistroExitoso {...datosQuery} /> : null;
    case "T":
      return datosQuery ? <RegistroTarde {...datosQuery} /> : null;
    case "SEGUNDOREGISTRO":
      return <YaRegistrado />;
    case "SINREGISTRO":
      return <MatriculaNoEncontrada />;
    case "Error":
      return <Error />;
    case "INVALID":
      return <INVALID />;
    default:
      return <ErrorDesconocido />;
  }
}

export function RenderComedor(
  estado: string | null,
  datosQuery: PropsQueryComedor | null
): React.ReactElement | null {
  if (estado !== null && datosQuery !== null) {
  }

  if (!estado) return null;

  switch (estado) {
    case "C":
      return <RegistroComedor {...datosQuery!} />;
    case "SINENTRADA":
      return (
        <SinAsistencia
          Nombre={datosQuery?.Nombre}
          Paterno={datosQuery?.Paterno}
        />
      );
    case "SINREGISTRO":
      return <MatriculaNoEncontrada />;
    case "Error":
      return <Error />;
    case "INVALID":
      return <INVALID />;
    default:
      return <ErrorDesconocido />;
  }
}

export function RenderSalida(
  estado: string | null,
  datosQuery: PropsQuery | null
): React.ReactElement | null {
  if (!estado) return null;

  switch (estado) {
    case "DESPUES":
      return datosQuery ? <SalidaExitosa {...datosQuery} /> : null;
    case "ANTES":
      return datosQuery ? <SalidaAnticipada {...datosQuery} /> : null;
    case "SEGUNDOREGISTRO":
      return <YaRegistradoSalida />;
    case "SINREGISTRO":
      return <MatriculaNoEncontrada />;
    case "SINENTRADA":
      return (
        <SinAsistencia
          Nombre={datosQuery?.Nombre}
          Paterno={datosQuery?.Paterno}
        />
      );
    case "Error":
      return <Error />;
    case "INVALID":
      return <INVALID />;
    default:
      return <ErrorDesconocido />;
  }
}
