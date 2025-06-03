"use client";
import { soloLetras } from "@/components/features/inputFilters";
import { useForm } from "react-hook-form";
import axios from "axios";

enum Rol {
  DataEntry,
  User,
  Admin,
}
type Register = {
  nombre: string;
  patern: string;
  matern: string;
  pwd: string;
  Rol: Rol;
  confirmPwd: string;
  user: string;
  correo: string;
  nivel: string;
};

export default function RegistroCuenta() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Register>();
  const onSubmit = async (data: Register) => {
    /**  
    try {
      const res = await axios.post("/api/auth/register", data);
      console.log("Respuesta del servidor:", res.data);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
*/

    console.log(data);
    if (data.pwd !== data.confirmPwd) {
      return alert("Passwords no coinciden ");
    }
    try {
      const res = await axios.post("/api/register", {
        name: data.nombre,
        patern: data.patern,
        matern: data.matern,
        nivel: data.nivel,
        rol: data.Rol,
        user: data.user,
        email: data.correo,
        password: data.pwd,
      });
      console.log("Respuesta del servidor:", res.data);
    } catch (err: any) {
      console.error(
        "Error al enviar los datos",
        err.response?.data || err.message
      );
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="text-black">
        <div className="flex justify-end items-end">
          <button type="submit" className="btn btn-neutral">
            Enviar
          </button>
        </div>
        {/*DATOS PERSONALES  */}
        <div>
          <label>Nombre *</label>
          <input
            placeholder="Luis Angel"
            {...register("nombre", {
              required: {
                value: true,
                message: "Campo obligatorio",
              },
              minLength: {
                value: 4,
                message: "Nombre debe ser mayor a 3 caracteres ",
              },
            })}
            onInput={soloLetras}
            className="block input input-neutral cursor-pointer"
          />
          {errors.nombre && (
            <span className="block text-red-500 font-mono">
              {errors.nombre.message}
            </span>
          )}
        </div>
        <div>
          <label>Apellido Paterno *</label>
          <input
            placeholder="González"
            {...register("patern", {
              required: {
                value: true,
                message: "Campo obligatorio",
              },
              minLength: {
                value: 4,
                message: "Apellido debe ser mayor a 4 caracteres ",
              },
            })}
            onInput={soloLetras}
            className="block input input-neutral cursor-pointer"
          />
          {errors.patern && (
            <span className="block text-red-500 font-mono">
              {errors.patern.message}
            </span>
          )}
        </div>

        <div>
          <label>Apellido Materno *</label>
          <input
            placeholder="Perez "
            {...register("matern", {
              required: {
                value: true,
                message: "Campo obligatorio",
              },
              minLength: {
                value: 4,
                message: "Apellido debe ser mayor a 4 caracteres ",
              },
            })}
            onInput={soloLetras}
            className="block input input-neutral cursor-pointer"
          />
          {errors.matern && (
            <span className="block text-red-500 font-mono">
              {errors.matern.message}
            </span>
          )}
        </div>

        <div>
          <label>Correo *</label>
          <input
            type="email"
            placeholder="ejemplo@gmail.com"
            {...register("correo", {
              required: {
                value: true,
                message: "Campo obligatorio",
              },
              minLength: {
                value: 7,
                message: "Apellido debe ser mayor a 7 caracteres ",
              },
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9*-]+\.[a-z]{2,4}$/,
                message: "Correo Inválido",
              },
            })}
            className="block input input-neutral cursor-pointer"
          />
          {errors.correo && (
            <span className="block text-red-500 font-mono">
              {errors.correo.message}
            </span>
          )}
        </div>
        {/*INFORMACÍON ACADÉMICA  */}

        <div>
          <label className="block ">Nivel </label>
          <select
            className="block select select-neutral cursor-pointer"
            defaultValue={""}
            {...register("nivel", {
              required: { value: true, message: "Campo obligatorio" },
            })}
          >
            <option disabled value={""}>
              Seleciona el nivel
            </option>
            <option value="Bach">Bachillerato</option>
            <option value="DES">Division de Estudios Superiores</option>
          </select>
          {errors.nivel && (
            <span className="block text-red-500 font-mono">
              {errors.nivel.message}
            </span>
          )}
        </div>

        <div>
          <label className="block ">Rol </label>
          <select
            className="block select select-neutral cursor-pointer"
            defaultValue={""}
            {...register("nivel", {
              required: { value: true, message: "Campo obligatorio" },
            })}
          >
            <option disabled value="">
              Selecciona el rol
            </option>
            <option value="DataEntry">Capturador</option>
            <option value="User">Usuario</option>
            <option value="Admin">Administrador</option>
          </select>
          {errors.nivel && (
            <span className="block text-red-500 font-mono">
              {errors.nivel.message}
            </span>
          )}
        </div>

        <div>
          <label className="block ">Usuario *</label>
          <input
            placeholder="Usuario123"
            className="block input input-neutral cursor-pointer"
            {...register("user", {
              required: { value: true, message: "Campo obligatorio" },
            })}
          />
        </div>
        {errors.user && (
          <span className="block text-red-500 font-mono">
            {errors.user.message}
          </span>
        )}

        <div>
          <label className="block "> Password *</label>
          <input
            className="block input input-neutral cursor-pointer"
            type="password"
            placeholder="*********"
            {...register("pwd", {
              minLength: {
                value: 8,
                message: "El minímo de carácteres es de 8 ",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message: "Debe incluir mayúscula, minúscula, número y símbolo",
              },
            })}
          />
          {errors.pwd && (
            <span className="block text-red-500 font-mono">
              {errors.pwd.message}
            </span>
          )}
        </div>

        <div>
          <label className="block ">Confirmar Password *</label>
          <input
            placeholder="*********"
            className="block input input-neutral cursor-pointer"
            {...register("confirmPwd", {
              validate: (value) => {
                if (value === watch("pwd")) {
                  return true;
                } else {
                  return "Los passwords no coinciden";
                }
              },
            })}
          />
          {errors.confirmPwd && (
            <span className="block text-red-500 font-mono">
              {errors.confirmPwd.message}
            </span>
          )}
        </div>
        <pre className="bg-gray-200 p-2 rounded">
          {JSON.stringify(watch(), null, 2)}
        </pre>
      </form>
    </div>
  );
}
