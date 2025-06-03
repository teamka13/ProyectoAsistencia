export interface RegistroAlumno {
  nombre: string;
  patern?: string;
  matern?: string;
  plantel: number;
  tipo: number;
  matricula: string;
  tel?: number;
  sexo: number;
  curp: string;
  nss?: string;
  gpo?: number;
  estado: number;
}
export type Usuario = {
  IdAlumno: string;
  Nombre: string;
  Paterno: string;
  Materno: string;
  CURP: string;
  Plantel: string;
  Matrícula: string;
  Sexo: string;
  Semestre: string;
  Teléfono: string;
  Nivel: string;
};
export type PropsQuery = {
  Matricula: string;
  Nombre: string;
  Paterno: string;
  Semestre?: string;
  Nivel: string;
  Hora: string;
  Retraso?: string;
  estado?: string;
};
export type PropsQueryComedor = {
  Matricula: string;
  Nombre: string;
  Paterno: string;
  Nivel: string;
  Hora: string;
  estado: string;
};

export interface ReporteParams {
  idMes: number;
  anio: number;
  dia: number;
  idGrupo: number;
}
export interface ReporteParamsMonthly {
  anio: number;
  idMes: number;
  idGrupo: number;
}
export interface AsistenciaData {
  Matrícula: string;
  ApPaterno: string;
  ApMaterno: string;
  Nombre: string;
  Sexo: string;
  Semestre: string;
  Nivel: string;
  Fecha: string | null;
  Situación: string;
}
export interface MesData {
  Matrícula: string;
  ApPaterno: string;
  ApMaterno: string;
  Nombre: string;
  Sexo: string;
  Semestre: string;
  Dias: (number | string)[];
  [key: string]: string | number | any[];
}

export const CamposFijos = [
  "Matricula",
  "Nombre",
  "Paterno",
  "Materno",
  "Sexo",
  "Semestre",
  "Nivel",
];
