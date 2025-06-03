"use client";

import { useState } from "react";
import axios from "axios";

export default function SimuladorMensajesTelegram() {
  const [form, setForm] = useState({
    Tel: "",
    nombre: "",
    paterno: "",
    semestre: "",
    hora: "",
  });

  const [resultado, setResultado] = useState<Record<string, string | null>>({
    entrada: null,
    salida: null,
    sinLlegada: null,
    noRegistro: null,
  });

  const [cargando, setCargando] = useState(false);
  const rutas = ["entrada", "salida", "sinLlegada", "noRegistro"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviarTodos = async () => {
    setCargando(true);
    setResultado({
      entrada: null,
      salida: null,
      sinLlegada: null,
      noRegistro: null,
    });

    const resultadosActualizados: Record<string, string> = {};

    await Promise.all(
      rutas.map(async (ruta) => {
        try {
          await axios.post(`/api/mensajes/${ruta}`, form);
          resultadosActualizados[ruta] = "✅ Enviado";
        } catch {
          resultadosActualizados[ruta] = "❌ Error";
          console.error;
        }
      })
    );

    setResultado(resultadosActualizados);
    setCargando(false);
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4 border rounded shadow">
      <h2 className="text-xl font-bold">Simulador de Mensajes Telegram</h2>

      {["Tel", "nombre", "paterno", "semestre", "hora"].map((campo) => (
        <input
          key={campo}
          name={campo}
          placeholder={campo}
          value={(form as any)[campo]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      ))}

      <button
        onClick={enviarTodos}
        disabled={cargando}
        className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        {cargando ? "Enviando..." : "Enviar todos los mensajes"}
      </button>

      <div>
        {rutas.map((ruta) => (
          <p key={ruta}>
            {ruta}: <span className="font-semibold">{resultado[ruta]}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
