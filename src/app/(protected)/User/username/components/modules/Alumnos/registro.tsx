"use client";
import { Send } from "lucide-react";
import { montserrat, source } from "@/components/ui/fonts";
import useAllGroup from "@/hooks/DataHooks/useAllGrups";
import usePersonal from "@/hooks/DataHooks/usePersonal";
import usePlantel from "@/hooks/DataHooks/usePlantel";
import axios from "axios";
import { useForm } from "react-hook-form";
import { transformarDatos } from "@/lib/tranformData";
import { RegistroAlumno } from "@/utils/tipes";
import {
  soloCURP,
  soloLetras,
  soloNumeros,
  hanldeChange,
} from "@/components/features/inputFilters";
import { Modal, trigger } from "@/components/ui/modals";

export function Registro() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegistroAlumno>({
    defaultValues: {
      estado: 500, // Valor por defecto
    },
  });
  const { grupos } = useAllGroup();
  const { personal } = usePersonal();
  const { plantel } = usePlantel();

  const tipoSeleccionado = watch("tipo");
  const onSubmit = async (data: RegistroAlumno) => {
    const datosParaEnviar = transformarDatos(data);
    try {
      const response = await axios.post(
        "/api/Alumnos/Registro",
        datosParaEnviar,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Datos enviados correctamente", response.data);
        console.log("Datos", data);
        trigger.open("registro-exito");
        reset();
      }
    } catch (err: any) {
      // Validar el código de error recibido desde el backend
      const statusCode = err.response?.status;
      if (statusCode === 409) {
        trigger.open("registro-matricula"); // Matricula existente
      } else if (statusCode === 404) {
        trigger.open("registro-curp"); // CURP existente
      } else {
        console.error("Error al enviar el formulario:", err);
        trigger.open("registro-error"); // Error general
      }
    }
    // Mostrar mensaje de error al usuario
  };
  const render = () => {
    if (tipoSeleccionado === 10) {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Grupo *
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            defaultValue=""
            {...register("gpo", {
              required: "Campo obligatorio",
            })}
          >
            <option disabled value="">
              Selecciona un grupo
            </option>

            {grupos.map((g) => (
              <option key={g.id} value={g.id}>
                {g.semestre}
              </option>
            ))}
          </select>
          {errors.gpo && (
            <p className="mt-1 text-sm text-red-600">{errors.gpo.message}</p>
          )}
        </div>
      );
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-800 to-purple-950 ${montserrat.variable} ${source.variable} font-sans`}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-black shadow-2xl border-4 border-black ">
          {/* Header del formulario */}
          <div className="bg-indigo-900 rounded-t-lg px-8 py-6">
            <h1 className="text-2xl font-bold text-white">
              Registro de Personal
            </h1>
            <p className="text-white mt-1">
              Complete todos los campos obligatorios (*)
            </p>
          </div>

          {/* Cuerpo del formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            {/* Sección de información personal */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-400 pb-2">
                Información Personal
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    {...register("nombre", {
                      required: "Campo obligatorio",
                      minLength: {
                        value: 4,
                        message: "Mínimo 4 caracteres",
                      },
                    })}
                    onInput={soloLetras}
                    placeholder="Diego Alejandro"
                    className="w-full px-4 py-2 border uppercase border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.nombre.message}
                    </p>
                  )}
                </div>

                {/* Apellidos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido Paterno *
                  </label>
                  <input
                    {...register("patern", {
                      required: "Campo obligatorio",
                      minLength: {
                        value: 4,
                        message: "Mínimo 4 caracteres",
                      },
                    })}
                    onInput={soloLetras}
                    placeholder="Domínguez"
                    className="w-full px-4 py-2 border uppercase border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                  {errors.patern && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.patern.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido Materno *
                  </label>
                  <input
                    {...register("matern", {
                      required: "Campo obligatorio",
                      minLength: {
                        value: 4,
                        message: "Mínimo 4 caracteres",
                      },
                    })}
                    onInput={soloLetras}
                    placeholder="Gomez"
                    className="w-full px-4 py-2 border uppercase border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                  {errors.matern && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.matern.message}
                    </p>
                  )}
                </div>

                {/* Sexo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sexo *
                  </label>
                  <select
                    defaultValue={""}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    {...register("sexo", {
                      required: "Campo obligatorio",
                    })}
                  >
                    <option disabled value="">
                      Selecciona el sexo
                    </option>
                    <option value="1">Masculino</option>
                    <option value="2">Femenino</option>
                  </select>
                  {errors.sexo && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.sexo.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sección de información académica */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-400 pb-2">
                Información Académica
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                {/* Matrícula */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Matrícula *
                  </label>
                  <input
                    {...register("matricula", {
                      required: "Campo obligatorio",
                      minLength: {
                        value: 6,
                        message: "Mínimo 6 caracteres",
                      },
                    })}
                    onInput={hanldeChange}
                    maxLength={12}
                    placeholder="DES0422"
                    className="w-full px-4 py-2 border uppercase border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                  {errors.matricula && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.matricula.message}
                    </p>
                  )}
                </div>

                {/* TipoPersonal */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Personal *
                  </label>
                  <select
                    {...register("tipo", {
                      required: "Campo obligatorio",
                      valueAsNumber: true,
                    })}
                    defaultValue={""}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  >
                    <option disabled value={""}>
                      Selecciona un Tipo
                    </option>
                    {personal.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.personal}
                      </option>
                    ))}
                  </select>
                  {errors.tipo && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.tipo.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Plantel *
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    defaultValue={""}
                    {...register("plantel", {
                      required: "Campo obligatorio",
                    })}
                  >
                    <option disabled value={""}>
                      Selecciona un Plantel
                    </option>
                    {plantel.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.plantel}
                      </option>
                    ))}
                  </select>
                  {errors.plantel && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.plantel.message}
                    </p>
                  )}
                </div>
                {render()}
              </div>
            </div>

            {/* Sección de información adicional */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-400 pb-2">
                Información Adicional
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {/* CURP */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CURP *
                  </label>
                  <input
                    placeholder="ABC151208HNLMGSS"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    {...register("curp", {
                      required: "Campo obligatorio",
                      pattern: {
                        value:
                          /^[A-Z][AEIOU][A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}[A-Z\d]\d$/,
                        message: "CURP inválido",
                      },
                    })}
                    onInput={soloCURP}
                  />
                  {errors.curp && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.curp.message}
                    </p>
                  )}
                </div>

                {/* NSS */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    NSS
                  </label>
                  <input
                    placeholder="08121234567"
                    maxLength={11}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    onInput={soloNumeros}
                    {...register("nss")}
                  />
                  {errors.nss && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.nss.message}
                    </p>
                  )}
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono (Agrega el código del país "52")
                  </label>
                  <input
                    placeholder="528188050938"
                    {...register("tel", {
                      minLength: {
                        value: 12,
                        message: "Deben ser 12 dígitos",
                      },
                    })}
                    onInput={soloNumeros}
                    maxLength={12}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                  {errors.tel && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.tel.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Botón de envío */}
            <div className="pt-4">
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition duration-150 ease-in-out shadow-sm flex items-center justify-center space-x-2"
              >
                <Send size={18} />
                <span>Enviar Registro</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Modal de confirmación */}
      <Modal
        id="registro-exito"
        type="SUCCESFULL"
        title="! Registro Exitoso!"
        message="El personal fue registrado de manera exitosa"
      />
      ;
      <Modal
        id="registro-error"
        type="error"
        title="! Error!"
        message="Solicitud no completada"
      />
      <Modal
        id="registro-matricula"
        type="MATRICULAEXISTE"
        title="! Error!"
        message={`La "MATRICULA" que proporcionaste ya existe`}
      />
      <Modal
        id="registro-curp"
        type="CURPEXISTE"
        title="! Error!"
        message={`El "CURP" que proporcionante ya existe`}
      />
      ;
    </div>
  );
}
