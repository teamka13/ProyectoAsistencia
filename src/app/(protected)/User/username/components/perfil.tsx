"use client";

import { useSettings } from "../sesion/profile/useSettings";
import { ButtonControler } from "../components/modules/buttonLogic";

export default function Perfil() {
  const { handleList, renderContent } = useSettings();
  return (
    <div className=" min-h-screen">
      {/* Contenedor 2 (2 columnas)   */}
      <div className="flex flex-row space-x-2 mt-0">
        {/* Columna izquierda (Lista) */}
        <div className="flex-1 text-black rounded-2xl">
          <div className=" flex items center justify-center pt-8">
            <ButtonControler hanldeList={handleList} />
          </div>
        </div>
        {/* Columna derecha   */}
        {renderContent()}
      </div>
    </div>
  );
}
