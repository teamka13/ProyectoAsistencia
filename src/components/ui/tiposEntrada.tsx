import { PropsQuery } from "@/utils/tipes";
export type Estado =
  | "AT"
  | "T"
  | "SINREGISTRO"
  | "SEGUNDOREGISTRO"
  | "INVALID"
  | "Error"
  | null;
export type EstadoComedor =
  | "C"
  | "SINREGISTRO"
  | "SINENTRADA"
  | "INVALID"
  | "Error"
  | null;
export type EstadoSalida =
  | "ANTES"
  | "DESPUES"
  | "SINREGISTRO"
  | "SEGUNDOREGISTRO"
  | "SINENTRADA"
  | "INVALID"
  | "Error"
  | null;
import {
  AlertTriangle,
  AlertOctagon,
  Ban,
  Clock,
  Info,
  Smile,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { montserrat, source } from "@/components/ui/fonts";
const BaseCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`${montserrat.variable} ${source.variable} font-sans text-xl ${className}`}
  >
    {children}
  </div>
);

export const RegistroExitoso = (props: PropsQuery) => (
  <BaseCard className="w-full max-w-xl mx-auto px-6 py-4 bg-blue-200 rounded-lg text-gray-800">
    <div className="grid grid-cols-2 gap-y-2">
      <span className="font-medium">Matrícula:</span>{" "}
      <span>{props.Matricula}</span>
      <span className="font-medium">Nombre:</span> <span>{props.Nombre}</span>
      <span className="font-medium">Apellido:</span>{" "}
      <span>{props.Paterno}</span>
      <span className="font-medium">Semestre:</span>{" "}
      <span>{props.Semestre}</span>
      <span className="font-medium">Nivel:</span> <span>{props.Nivel}</span>
      <span className="font-medium">Hora de entrada:</span>
      <span className="flex items-center gap-2">
        <Clock size={18} /> {props.Hora}
      </span>
    </div>
  </BaseCard>
);

export const RegistroTarde = (props: PropsQuery) => (
  <BaseCard className="w-full max-w-xl mx-auto px-6 py-4 bg-yellow-200 border border-yellow-200 rounded-lg text-gray-800">
    <div className="grid grid-cols-2 gap-y-2">
      <span className="font-medium">Matrícula:</span>{" "}
      <span>{props.Matricula}</span>
      <span className="font-medium">Nombre:</span> <span>{props.Nombre}</span>
      <span className="font-medium">Apellido:</span>{" "}
      <span>{props.Paterno}</span>
      <span className="font-medium">Semestre:</span>{" "}
      <span>{props.Semestre}</span>
      <span className="font-medium">Nivel:</span> <span>{props.Nivel}</span>
      <span className="font-medium">Hora de entrada:</span>
      <span className="flex items-center gap-2">
        <Clock size={18} /> {props.Hora}
      </span>
      <span className="font-medium text-yellow-800">Tiempo de retardo:</span>
      <span className="text-red-600 font-semibold">{props.Retraso}</span>
    </div>
  </BaseCard>
);
export const SalidaExitosa = (props: PropsQuery) => (
  <BaseCard className="w-full max-w-xl mx-auto  px-6 py-4 bg-green-200 rounded-lg text-gray-800">
    <div className="grid grid-cols-2 gap-y-2">
      <span className="font-medium">Matrícula:</span>{" "}
      <span>{props.Matricula}</span>
      <span className="font-medium">Nombre:</span> <span>{props.Nombre}</span>
      <span className="font-medium">Apellido:</span>{" "}
      <span>{props.Paterno}</span>
      <span className="font-medium">Semestre:</span>{" "}
      <span>{props.Semestre}</span>
      <span className="font-medium">Nivel:</span> <span>{props.Nivel}</span>
      <span className="font-medium">Hora de salida:</span>
      <span className="flex items-center gap-2">
        <Clock size={18} /> {props.Hora}
      </span>
    </div>
  </BaseCard>
);

export const SalidaAnticipada = (props: PropsQuery) => (
  <BaseCard className="w-full max-w-xl mx-auto px-6 py-4 bg-green-100 border-l-4 border-yellow-400 rounded-lg text-gray-800">
    <div className="mb-4">
      <h3 className="text-lg font-bold text-yellow-700 flex items-center gap-2">
        <AlertTriangle size={20} />
        Registro de Salida Anticipada
      </h3>
      <p className="text-sm text-yellow-600 mt-1">
        Estás registrando una salida antes del horario establecido.
      </p>
    </div>

    <div className="grid grid-cols-2 gap-y-3">
      <span className="font-medium">Matrícula:</span>
      <span>{props.Matricula}</span>

      <span className="font-medium">Nombre completo:</span>
      <span>
        {props.Nombre} {props.Paterno}
      </span>

      <span className="font-medium">Semestre/Nivel:</span>
      <span>
        {props.Semestre} ({props.Nivel})
      </span>

      <span className="font-medium text-yellow-800">
        Tiempo de salida anticipada:
      </span>
      <span className="text-red-600 font-semibold">{props.anticipacion}</span>
    </div>

    <div className="mt-4 p-3 bg-yellow-100 rounded text-sm text-yellow-700">
      <p>⚠️ Recuerda que las salidas anticipadas deben ser justificadas.</p>
    </div>
  </BaseCard>
);

export const SinAsistencia = (props: {
  Nombre: string | undefined;
  Paterno: string | undefined;
}) => (
  <BaseCard className="w-full max-w-md mx-auto px-6 py-5 bg-amber-100 border-l-4 border-amber-400 rounded-lg">
    <div className="flex items-start gap-3">
      <AlertCircle className="flex-shrink-0 mt-0.5 text-amber-600" size={20} />
      <div>
        <h3 className="font-medium text-amber-800">
          {props.Nombre} {props.Paterno}
        </h3>
        <p className="text-sm text-amber-600 mt-1">
          No has registrado tu entrada hoy
        </p>
      </div>
    </div>
  </BaseCard>
);

export const YaRegistrado = () => (
  <BaseCard className="w-full max-w-xl mx-auto px-6 py-4 bg-blue-50 border border-blue-200 rounded-lg text-center text-gray-800">
    <div className="flex flex-col items-center gap-2">
      <Info size={40} className="text-blue-600" />
      <h2 className="font-bold text-xl text-blue-700">Ya estás registrado</h2>
      <p className="text-sm">Tu entrada ya fue capturada previamente</p>
    </div>
  </BaseCard>
);

export const YaRegistradoSalida = () => (
  <BaseCard className="w-full max-w-xl mx-auto px-6 py-4 bg-indigo-100 border border-indigo-200 rounded-lg text-center text-gray-800">
    <div className="flex flex-col items-center gap-2">
      <Info size={40} className="text-indigo-600" />
      <h2 className="font-bold text-xl text-indigo-700">
        Ya has registrado tu salida
      </h2>
      <p className="text-sm">Tu salida ya fue capturada previamente</p>
    </div>
  </BaseCard>
);

export const ErrorDesconocido = () => (
  <BaseCard className="w-full max-w-xl mx-auto px-6 py-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center text-gray-800">
    <div className="flex flex-col items-center gap-2">
      <AlertCircle size={40} className="text-yellow-600" />
      <h2 className="font-bold text-xl text-yellow-800">Error desconocido</h2>
      <p className="text-sm">
        Ocurrió un problema inesperado. Intenta nuevamente o contacta a soporte.
      </p>
    </div>
  </BaseCard>
);

export const RegistroComedor = (props: PropsQuery) => (
  <BaseCard className="w-full max-w-xl mx-auto px-6 py-4 bg-white rounded-lg text-gray-800">
    <div className="grid grid-cols-2 gap-y-2">
      <span className="font-medium">Matrícula:</span>{" "}
      <span>{props.Matricula}</span>
      <span className="font-medium">Nombre:</span> <span>{props.Nombre}</span>
      <span className="font-medium">Apellido:</span>{" "}
      <span>{props.Paterno}</span>
      <span className="font-medium">Nivel:</span> <span>{props.Nivel}</span>
      <span className="font-medium">Hora de entrada:</span>
      <span className="flex items-center gap-2">
        <Clock size={18} /> {props.Hora}
      </span>
    </div>
    <div className="mt-4 flex justify-center items-center text-sky-700 font-semibold text-lg gap-2">
      <Smile size={20} /> ¡Buen provecho!
    </div>
  </BaseCard>
);

export function Error() {
  return (
    <BaseCard className="w-full max-w-xl mx-auto px-6 py-4 bg-red-100 border border-red-200 rounded-lg text-center text-gray-800">
      <div className="flex flex-col items-center gap-2">
        <AlertOctagon size={40} className="text-red-700" />
        <h2 className="font-bold text-xl text-red-700">Error de conexión</h2>
        <p className="text-sm">
          Verifica tu conexión de red o contacta a soporte
        </p>
      </div>
    </BaseCard>
  );
}

export const MatriculaNoEncontrada = () => (
  <BaseCard className="w-full max-w-xl mx-auto px-6 py-6 bg-red-100 border border-red-200 rounded-lg text-center text-gray-800">
    <div className="flex flex-col items-center gap-2">
      <Ban size={40} className="text-red-600" />
      <h2 className="font-bold text-2xl text-red-700">
        Matrícula no encontrada
      </h2>
      <p className="text-sm">
        Verifica que hayas ingresado correctamente tu número
      </p>
    </div>
  </BaseCard>
);

export const INVALID = () => (
  <BaseCard className="w-full max-w-xl mx-auto px-6 py-4 bg-orange-50 border border-orange-200 rounded-lg text-center text-gray-800">
    <div className="flex flex-col items-center gap-2">
      <XCircle size={40} className="text-orange-600" />
      <h2 className="font-bold text-xl text-orange-700">Datos no válidos</h2>
      <p className="text-sm">
        Verifica que la información ingresada sea correcta y esté completa
      </p>
    </div>
  </BaseCard>
);
