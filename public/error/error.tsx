import { FaArrowLeft } from "react-icons/fa";

export default function Error() {
  return (
    <section
      className="min-h-screen flex items-center justify-center font-mono bg-[url('/images/Fondo.jpeg')] 
       bg-[length:100%_100%] bg-center transition-all duration-500"
    >
      <div className="flex flex-col items-center justify-between p-8 sm:p-12 gap-8 bg-white rounded-2xl w-full max-w-md sm:max-w-lg mx-4">
        <h2 className="text-3xl sm:text-5xl text-black  font-bold">¡Error! </h2>
        <h2 className="text-6xl sm:text-9xl text-red-700  font-bold">404 </h2>
        <p className="flex-1  text-xl sm:text-2xl  text-black not-even:font-mono text-center">
          La página que intentabas buscar no se encuentra disponible.
        </p>
        <div className="mt-8 flex justify-center sm:justify-end">
          <button
            className="btn btn-lg rounded-3xl shadow-lg shadow-neutral-900 px-8 gap-2"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft />
            Regresar
          </button>
        </div>
      </div>
    </section>
  );
}
