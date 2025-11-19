// components/Home.jsx - ARCHIVO NUEVO
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirigir a login si no hay usuario
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">QuackWallet</h1>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">Hola, {user.nombre}</span>
                <button
                  onClick={() => navigate("/profile")}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Mi Perfil
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Registrarse
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Bienvenido a QuackWallet
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Tu billetera digital segura y confiable
          </p>
          
          {!user && (
            <div className="mt-10">
              <button
                onClick={() => navigate("/register")}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
              >
                Comenzar Ahora
              </button>
            </div>
          )}

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-blue-600 text-xl font-bold mb-2">Tarjetas</div>
              <p className="text-gray-600">Gestiona todas tus tarjetas en un solo lugar</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-blue-600 text-xl font-bold mb-2">Seguridad</div>
              <p className="text-gray-600">Protección avanzada para tus transacciones</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-blue-600 text-xl font-bold mb-2">Consultas</div>
              <p className="text-gray-600">Consulta tu historial y saldos</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-blue-600 text-xl font-bold mb-2">Novedades</div>
              <p className="text-gray-600">Mantente informado con las últimas actualizaciones</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}