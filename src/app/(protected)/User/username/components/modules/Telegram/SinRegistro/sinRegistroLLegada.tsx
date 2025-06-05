"use client";

import { useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { Send } from "lucide-react";

export default function sinRegistroLlegadaPrueba() {
  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState("");

  const handleEnviar = async () => {
    setLoading(true);
    setEstado("");

    try {
      const res = await axios.post("/api/bot/prueba/sinRegistro");
      setEstado(
        `✅ Se enviaron ${res.data.total} notificaciones correctamente.`
      );
    } catch (err) {
      console.error(err);
      setEstado("❌ Error al enviar notificaciones.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-3">
      <button
        onClick={handleEnviar}
        disabled={loading}
        className={`
      w-full md:w-auto
      bg-blue-900 text-white px-6 py-2 rounded-lg
      hover:bg-blue-700 transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      disabled:opacity-60 disabled:cursor-not-allowed
      flex items-center justify-center gap-2
    `}
      >
        {loading ? (
          <>
            <FaSpinner size={15} />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Enviar Notificaciones
          </>
        )}
      </button>

      {estado && (
        <p
          className={`mt-2 p-3 rounded text-sm ${
            estado.includes("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {estado}
        </p>
      )}
    </div>
  );
}
