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
  <BaseCard className="w-full max-w-xl mx-auto mt-6 px-6 py-4 bg-white rounded-lg text-gray-800">
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
  <BaseCard className="w-full max-w-xl mx-auto mt-6 px-6 py-4 bg-yellow-50 border border-yellow-200 rounded-lg text-gray-800">
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

export const YaRegistrado = () => (
  <BaseCard className="w-full max-w-xl mx-auto px-6 py-4 bg-blue-50 border border-blue-200 rounded-lg text-center text-gray-800">
    <div className="flex flex-col items-center gap-2">
      <Info size={40} className="text-blue-600" />
      <h2 className="font-bold text-xl text-blue-700">Ya estás registrado</h2>
      <p className="text-sm">Tu entrada ya fue capturada previamente</p>
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

export function SinAsistencia() {
  return (
    <BaseCard className="w-full max-w-xl mx-auto px-6 py-4 bg-red-50 border border-red-200 rounded-lg text-center text-gray-800">
      <div className="flex flex-col items-center gap-2">
        <AlertTriangle size={40} className="text-red-600" />
        <p className="font-semibold text-xl text-red-700">
          No se ha registrado tu entrada
        </p>
        <p className="text-sm">Por favor pasa al área de registro</p>
      </div>
    </BaseCard>
  );
}

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

export const NoValido = () => (
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
