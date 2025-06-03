"use client";
import {
  User,
  Briefcase,
  Phone,
  FileText,
  CalendarDays,
  AlertCircle,
  Upload,
  ClipboardEdit,
  Send,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { soloLetras } from "@/components/features/inputFilters";

type Inputs = {
  nombre: string;
  cargo: string;
  tipo: string;
  tel: number;
  plantel: string;
  descripcion: string;
  fecha: string;
  urgencia: string;
  evidencia: FileList;
  otro: string;
};

export default function Formulario() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  console.log(errors);

  const onSubmit = handleSubmit(() => {
    {
      /*LOGICA QUE ENVIAS AFUERA DE LA APP */
    }
    abrirModal();
    reset();
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg shadow-black">
        <h1 className="text-4xl font-bold text-center mb-5 font-mono text-blue-500">
          Reporte de Incidencias
        </h1>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label htmlFor="nombre" className="label text-white">
              <User size={18} />
              Nombre *
            </label>
            <input
              {...register("nombre", {
                required: {
                  value: true,
                  message: "Falta llenar este campo",
                },
                minLength: {
                  value: 5,
                  message: "Nombre debe de tener almenos 5 letras",
                },
                maxLength: {
                  value: 25,
                  message: "Se excedió el número de caracteres permitidos",
                },
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, // Solo letras y espacios
                  message: "Solo se permiten letras y espacios",
                },
              })}
              onInput={(e) => {
                const value = e.currentTarget.value;
                const soloLetras = value.replace(
                  /[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g,
                  ""
                );
                e.currentTarget.value = soloLetras;
              }}
              placeholder="Diego Domínguez"
              className="input input-neutral cursor-pointer w-full "
            />
            {errors.nombre && (
              <span className="text-red-500 font-mono">
                {errors.nombre.message}
              </span>
            )}
          </div>

          <div>
            <label className="label text-white">
              <Briefcase size={18} />
              Cargo o Departamento *
            </label>
            <input
              {...register("cargo", {
                required: {
                  value: true,
                  message: "Falta llenar este campo",
                },
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, // Solo letras y espacios
                  message: "Solo se permiten letras y espacios",
                },
                minLength: {
                  value: 4,
                  message: "El minimo es de 4 caracteres",
                },
              })}
              onInput={(e) => {
                const value = e.currentTarget.value;
                const soloLetras = value.replace(
                  /[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g,
                  ""
                );

                e.currentTarget.value = soloLetras;
              }}
              className="input input-neutral  cursor-pointer w-full"
              placeholder="Ej. Coordinador Académico, etc."
            />
            {errors.cargo && (
              <span className="text-red-500 font-mono">
                {errors.cargo.message}
              </span>
            )}
          </div>
          <div>
            <label>Plantel</label>
            <select
              defaultValue={""}
              className="input input-neutral  cursor-pointer w-full"
              {...register("plantel", {
                required: { value: true, message: "Falta llenar este campo" },
              })}
            >
              <option disabled></option>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            {errors.plantel && (
              <span className="text-red-500 font-mono">
                {errors.plantel.message}
              </span>
            )}
          </div>
          <div>
            <label className="label text-white">
              <Phone size={18} />
              Telefono para feedback *
            </label>
            <input
              maxLength={10}
              {...register("tel", {
                required: {
                  value: true,
                  message: "Falta llenar este campo",
                },
              })}
              onInput={soloLetras}
              className="input input-neutral cursor-pointer w-full"
              placeholder="123456789"
            />
            {errors.tel && (
              <span className="text-red-500 font-mono">
                {errors.tel.message}
              </span>
            )}
          </div>

          <div>
            <label className="label text-white">
              <AlertCircle size={18} />
              Tipo de Incidencia *
            </label>
            <select
              defaultValue={""}
              className="input input-neutral cursor-pointer w-full"
              {...register("tipo", {
                required: {
                  value: true,
                  message: "Falta llenar este campo",
                },
              })}
            >
              <option disabled></option>
              <option value="Fallo">Matrícula no encontrada</option>
              <option value="Conexion">
                Error en la conexión con la base de datos
              </option>
              <option value="Otro">Otro</option>
            </select>
            {watch("tipo") == "Otro" && (
              <input
                type="text"
                placeholder="Problema presentado"
                className="mt-4 input input-neutral  w-full"
                {...register("otro", {
                  required: {
                    value: true,
                    message: "Se debe describir el tipo de problema",
                  },
                })}
                onInput={(e) => {
                  const value = e.currentTarget.value;
                  const soloLetras = value.replace(
                    /[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g,
                    ""
                  );
                  e.currentTarget.value = soloLetras;
                }}
              />
            )}
            {errors.tipo && (
              <span className="text-red-500 font-mono">
                {errors.tipo.message}
              </span>
            )}
          </div>

          <div>
            <label className="label text-white">
              <CalendarDays size={18} />
              Dia de la Incidencia *
            </label>
            <input
              type="date"
              {...register("fecha", {
                required: {
                  value: true,
                  message: "Falta llenar este campo",
                },
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const today = new Date();

                  // Normaliza ambos a 00:00:00 para comparar solo fechas
                  selectedDate.setHours(0, 0, 0, 0);
                  today.setHours(0, 0, 0, 0);

                  return (
                    selectedDate <= today ||
                    "No puedes seleccionar una fecha futura"
                  );
                },
              })}
              className="input input-neutral cursor-pointer w-full"
            />
            {errors.fecha && (
              <span className="text-red-500 font-mono">
                {errors.fecha.message}
              </span>
            )}
          </div>
          <div>
            <label className="label text-white">
              <FileText size={18} />
              Descripción (opcional) *
            </label>
            <textarea
              {...register("descripcion", {})}
              className="textarea textarea-neutral cursor-pointer w-full"
            />
          </div>

          <div>
            <label className="label text-white mb-2">
              <ClipboardEdit size={18} />
              Urgencia *
            </label>
            <label className="text-red-500 font-mono block mb-2">
              {errors.urgencia && <span>{errors.urgencia.message}</span>}
            </label>
            <div className="flex gap-4">
              {["Baja", "Media", "Alta"].map((nivel) => (
                <label key={nivel} className="flex items-center gap-2">
                  <input
                    type="radio"
                    {...register("urgencia", {
                      required: {
                        value: true,
                        message: "Falta llenar este campo",
                      },
                    })}
                    className="radio  radio-primary"
                  />

                  {nivel}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="label text-white mb-2">
              <Upload size={18} />
              Subir evidencia (Opcional) *
            </label>
            <input
              {...register("evidencia")}
              className="file-input file-nuetral w-full"
              type="file"
              multiple
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-accent w-full">
              <Send size={18} />
              Enviar Reporte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
