import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-semibold text-gray-700">
          No hay sesión activa
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Perfil del Usuario</h2>
        <p className="mb-2">
          <strong>Nombre:</strong> {user.nombre}
        </p>
        <p className="mb-2">
          <strong>Correo:</strong> {user.correo}
        </p>
        <p className="mb-2">
          <strong>Teléfono:</strong> {user.telefono}
        </p>

        <button
          onClick={logout}
          className="mt-6 bg-red-500 text-white w-full py-2 rounded hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}