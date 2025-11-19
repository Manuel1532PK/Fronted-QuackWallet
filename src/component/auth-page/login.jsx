import { useState, useContext } from "react";
import { loginUser, resendVerificationEmail } from "../../api/authApi";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo_QuackWallet from '../../assets/Logo_QuackWallet.png';

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowResend(false);
    setIsLoading(true);

    try {
      const response = await loginUser(correo, password);
      // Verifica que la respuesta tenga los datos esperados
      if (response && response.token && response.user) {
        login(response.user, response.token);
        navigate("/home");
      } else {
        setError("Respuesta del servidor inválida");
      }
    } catch (err) {
      console.error("Error en login:", err);
      
      // Manejo mejorado de errores
      if (err.response?.status === 400) {
        if (err.response?.data?.message === "Usuario no encontrado") {
          setError("Correo no registrado");
        } else if (err.response?.data?.message === "Contraseña incorrecta") {
          setError("Contraseña incorrecta");
        } else {
          setError(err.response?.data?.message || "Credenciales incorrectas");
        }
      } else if (err.message === "Email no verificado") {
        setError("Tu correo no ha sido verificado. Por favor, verifica tu correo.");
        setShowResend(true);
      } else {
        setError("Error de conexión. Intenta nuevamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendVerificationEmail(correo);
      setError("Correo de verificación enviado. Por favor, revisa tu bandeja de entrada.");
      setShowResend(false);
    } catch {
      setError("Error al reenviar el correo de verificación. Intenta nuevamente más tarde.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src={Logo_QuackWallet} alt="Logo_QuackWallet" className="logo mb-8 w-48" />
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-80">
        <h2 className="text-2xl font-semibold mb-6 text-center">Iniciar sesión</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <br></br>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        
        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
        
        {showResend && (
          <button
            type="button"
            onClick={handleResendVerification}
            className="mb-4 text-sm text-blue-600 underline w-full text-center"
          >
            Reenviar correo de verificación
          </button>
        )}
        <br></br>
        <button 
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-black w-full py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Iniciando sesión..." : "Entrar"}
        </button>
        
        <p className="mt-4 text-center text-sm text-black-600">
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:text-blue-800"
          >
            Regístrate aquí
          </button>
        </p>
      </form>
    </div>
  );
}