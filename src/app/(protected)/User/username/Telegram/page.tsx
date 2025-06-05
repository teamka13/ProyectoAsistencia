import { InboxIcon, PaperclipIcon } from "lucide-react";
import EntradaPrueba from "../components/modules/Telegram/Entrada/entrada";
import SalidaPrueba from "../components/modules/Telegram/Salida/salida";
import SinRegistroLlegadaPrueba from "../components/modules/Telegram/SinRegistro/sinRegistroLLegada";
import SinRegistroSalidaPrueba from "../components/modules/Telegram/SinSalida/sinSalida";
import { FaExclamationCircle, FaExclamationTriangle } from "react-icons/fa";

export default function TelegramPruebas() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Pruebas de Notificaciones Telegram
          </h1>
          <p className="text-gray-600">
            Simulador de eventos para pruebas del sistema de notificaciones
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <InboxIcon className="text-blue-500 w-5 h-5" />
                Evento de Entrada
              </h2>
              <EntradaPrueba />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <PaperclipIcon className="text-green-500 w-5 h-5" />
                Evento de Salida
              </h2>
              <SalidaPrueba />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <FaExclamationTriangle className="text-red-500 w-5 h-5" />
                Sin Registro de Llegada
              </h2>
              <SinRegistroLlegadaPrueba />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <FaExclamationCircle className="text-yellow-500 w-5 h-5" />
                Sin Registro de Salida
              </h2>
              <SinRegistroSalidaPrueba />
            </div>
          </div>
        </div>

        <footer className="mt-45 text-center text-sm text-gray-500">
          <p>Sistema de notificaciones - Versión {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}
