import MyChart from "./grafficos/barras";
import RefererChart from "./grafficos/pastel";
import RadarAsistencias from "./grafficos/radar";
import AttendanceChart from "./grafficos/2barras";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a] py-10 px-4 md:px-12">
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
        Simulacion de Graficos de Asistencia
      </h1>

      <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg">
        <MyChart />
      </div>

      <div className="space-y-12">
        <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg">
          <AttendanceChart />
        </div>

        <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg">
          <RefererChart />
        </div>

        <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg">
          <RadarAsistencias />
        </div>
      </div>
    </div>
  );
}
