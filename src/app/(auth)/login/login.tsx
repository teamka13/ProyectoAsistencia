"use client";
import { useForm } from "react-hook-form";
import { Send, User, Lock } from "lucide-react";
type Login = {
  usuario: string;
  pwd: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Login>();

  const OnSubmit = handleSubmit(() => {
    {
      /* LOGICA DE REGISTRO*/
    }
    console.log("Se hizo el registro");
    reset();
  });

  return (
    <section className="min-h-screen flex items-center justify-center font-mono bg-[url('/images/Fondo.jpeg')]  bg-[length:100%_100%]  transition-all duration-500 bg-center">
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg shadow-black">
        <h1 className="text-5xl font-bold text-center mb-8 font-mono text-blue-500">
          Login
        </h1>

        <form onSubmit={OnSubmit} className="space-y-7">
          <div>
            <label htmlFor="nombre" className="label text-white">
              <User size={18} />
              Usuario
            </label>
            <input
              {...register("usuario", {
                required: {
                  value: true,
                  message: "Se debe de llenar este campo ",
                },
              })}
              type="text"
              onInput={(e) => {
                const value = e.currentTarget.value;
                const letrasNumeros = value.replace(/[^A-Za-z0-9\s]/g, "");
                e.currentTarget.value = letrasNumeros;
              }}
              className="rounded-md p-1 border-2 outline-none w-full"
            />
            {errors.usuario && (
              <span className="text-warning block">
                {errors.usuario.message}
              </span>
            )}
          </div>

          <div>
            <label className="label text-white">
              <Lock size={18} />
              Contraseña
            </label>
            <input
              {...register("pwd", {
                required: {
                  value: true,
                  message: "Falta llenar este campo",
                },
              })}
              type="password"
              className="rounded-md p-1 border-2 outline-none w-full"
            />
            {errors.pwd && (
              <span className="text-warning block">{errors.pwd.message}</span>
            )}
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-accent w-full">
              <Send size={18} />
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
