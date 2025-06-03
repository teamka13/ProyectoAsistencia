import Link from "next/link";
export default function Home() {
  return (
    <div className=" min-h-screen bg-black flex justify-center items-center">
      <Link
        href={`/User/username/Captura/Entrada`}
        className="bg-amber-50 w-16"
      >
        Empezar
      </Link>
    </div>
  );
}
