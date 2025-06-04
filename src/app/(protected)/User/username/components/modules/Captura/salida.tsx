"use client";
import { useState, useEffect, useRef } from "react";
import { useValidarSalida } from "@/hooks/hooksRegistro/useRegistro";
import { useInputAlfanumerico } from "@/hooks/useInputEnter";
import { montserrat, source } from "@root/src/components/ui/fonts";

export default function Salida() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const clearInput = () => setInputValue("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { fetchQuery, renderQuery } = useValidarSalida(clearInput);

  const enhancedFetch = async (matricula: string) => {
    setIsLoading(true);
    try {
      await fetchQuery(matricula);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const { handleChange, handleEnter } = useInputAlfanumerico(
    enhancedFetch,
    inputValue,
    setInputValue
  );

  return (
    <section
      className={`min-h-[calc(100vh-80px)] flex items-start justify-center ${montserrat.variable} ${source.variable} font-sans bg-[url('/images/Fondo.jpeg')] bg-cover bg-center`}
    >
      {/* Tarjeta principal */}
      <div className="relative w-full mt-6 max-w-xl bg-gray-100 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 shadow-black ">
        {/* Barra superior  */}
        <div className="h-4 bg-gradient-to-r from-orange-400 to-red-600"></div>

        {/* Contenedor de logos */}
        <div className="flex justify-between items-center px-10 pt-8">
          <img
            src="/images/CM.png"
            alt="Logo CM"
            className="h-23 object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Registro de Salida
            </h1>
            <p className="text-base text-gray-500 mt-2">
              Sistema de acceso institucional
            </p>
          </div>
          <img
            src="/images/NL.png"
            alt="Logo NL"
            className="h-20 object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>

        {/* Cuerpo del formulario */}
        <div className="px-10 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-700">
              ¡Bienvenido!
            </h2>
            <p className="text-gray-500 mt-2 text-lg">
              Ingrese su matrícula o credencial para continuar
            </p>
          </div>

          {/* Campo de entrada */}
          <div className="relative mb-8">
            <input
              type="text"
              ref={inputRef}
              value={inputValue}
              onChange={handleChange}
              maxLength={12}
              onKeyDown={handleEnter}
              placeholder="Ejemplo: CBM123456"
              className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-center font-mono uppercase placeholder-gray-400"
              disabled={isLoading}
            />
            {isLoading && (
              <div className="absolute inset-y-0 right-4 flex items-center">
                <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Resultados */}
          <div className="min-h-32 bg-gray-50 rounded-xl p-6 border-2 border-gray-200 transition-all duration-200 text-lg">
            {renderQuery || (
              <p className="text-gray-400 text-center py-6">
                Ingrese su identificación para ver los detalles de salida
              </p>
            )}
          </div>

          {/* Pie de tarjeta - más visible */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Sistema de Registro Institucional - Versión 1.0</p>
            <p className="mt-1 text-xs text-gray-400">
              © {new Date().getFullYear()} Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
