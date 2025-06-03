import { PropsQuery, PropsQueryComedor } from "@/utils/tipes";
import {
  ErrorDesconocido,
  RegistroTarde,
  YaRegistrado,
  MatriculaNoEncontrada,
  RegistroComedor,
  RegistroExitoso,
  NoValido,
  Error,
  SinAsistencia,
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
    case "NOTVALID":
      return <NoValido />;
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
      return <SinAsistencia />;
    case "SINREGISTRO":
      return <MatriculaNoEncontrada />;
    case "Error":
      return <Error />;
    case "NOTVALID":
      return <NoValido />;
    default:
      return <ErrorDesconocido />;
  }
}
