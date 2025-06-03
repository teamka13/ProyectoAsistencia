import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";

type ModalType = "SUCCESFULL" | "error" | "MATRICULAEXISTE" | "CURPEXISTE";

interface ModalProps {
  id: string;
  type: ModalType;
  title: string;
  message: string;
  onClose?: () => void;
}

const getModalConfig = (type: ModalType) => {
  const config = {
    SUCCESFULL: {
      icon: <CheckCircle className="h-10 w-10 text-green-600" />,
      bgColor: "bg-green-100",
    },
    error: {
      icon: <XCircle className="h-10 w-10 text-red-600" />,
      bgColor: "bg-red-100",
    },
    MATRICULAEXISTE: {
      icon: <AlertTriangle className="h-10 w-10 text-yellow-600" />,
      bgColor: "bg-yellow-100",
    },
    CURPEXISTE: {
      icon: <Info className="h-10 w-10 text-yellow-600" />,
      bgColor: "bg-yellow-100",
    },
  };
  return config[type];
};

export const Modal = ({ id, type, title, message, onClose }: ModalProps) => {
  const modalConfig = getModalConfig(type) || {
    icon: <Info className="h-10 w-10 text-gray-500" />, // Valor por defecto
    bgColor: "bg-gray-100",
  };
  const { icon, bgColor } = modalConfig;
  const handleClose = () => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  return (
    <dialog
      id={id}
      className="modal"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="modal-box bg-white max-w-lg  relative">
        <div className="text-center p-6">
          <div
            className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${bgColor} mb-4 animate-bounce`}
          >
            {icon}
          </div>

          <h3 className="text-3xl font-bold font-montserrat text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-lg font-montserrat text-gray-800 mb-2">
            {message}
          </p>

          <div className="mt-6">
            <p className=" font-sans text-gray-900">
              Presiona <kbd className="px-2 py-1 bg-gray-400 rounded">ESC</kbd>{" "}
              o haz clic fuera para cerrar
            </p>
          </div>
        </div>
      </div>
    </dialog>
  );
};

// Funcion para manejar el modal
export const trigger = {
  open: (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) modal.showModal();
  },
};
