import { useState } from "react";
import { registerUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import Logo_QuackWallet from '../../assets/Logo_QuackWallet.png';

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    pin: "",
    confirmPin: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (formData.pin.length !== 4 || !/^\d+$/.test(formData.pin)) {
      setError("El PIN debe ser de 4 dígitos numéricos");
      return;
    }

    if (formData.pin !== formData.confirmPin) {
      setError("Los PINs no coinciden");
      return;
    }

    setIsLoading(true);

    try {
      await registerUser({
        Nombre_Usuario: formData.nombre,
        correo: formData.correo,
        Telefono: formData.telefono,
        Hash_Password: formData.password,
        Pin_Seguridad: formData.pin
      });
      
      alert("Te hemos enviado un correo de verificación. Por favor, verifica tu cuenta antes de iniciar sesión.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrar usuario");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <img src={Logo_QuackWallet} alt="Logo_QuackWallet" className="logo mb-8 w-48" />
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Crear Cuenta</h2>
        
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="password"
          name="pin"
          placeholder="PIN de seguridad (4 dígitos)"
          value={formData.pin}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          maxLength="4"
          pattern="\d{4}"
        />

        <input
          type="password"
          name="confirmPin"
          placeholder="Confirmar PIN"
          value={formData.confirmPin}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          maxLength="4"
          pattern="\d{4}"
        />
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <button 
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-black w-full py-3 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Registrando..." : "Registrarse"}
        </button>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <button 
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:text-blue-800"
          >
            Inicia sesión
          </button>
        </p>
      </form>
    </div>
  );
}