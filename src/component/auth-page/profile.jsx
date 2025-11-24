import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// Iconos
import {
  IoCardOutline,
  IoShieldCheckmarkOutline,
  IoAnalyticsOutline,
  IoBulbOutline,
  IoPersonCircleOutline,
  IoLogOutOutline,
  IoSettingsOutline,
  IoHomeOutline,
  IoPeopleOutline,
} from "react-icons/io5";

// Sidebar + secciones (iguales al home.jsx)
const SECCIONES = [
  {
    title: "Seguridad",
    text: "Configuración de PIN, protección más avanzada de tus tarjetas.",
    icon: IoShieldCheckmarkOutline,
    color: "success",
    path: "/security",
  },
  {
    title: "Consultas",
    text: "Revisa los movimientos recientes de tus tarjetas y cuentas.",
    icon: IoAnalyticsOutline,
    color: "info",
    path: "/reports",
  },
  {
    title: "Novedades",
    text: "Últimas funcionalidades y actualizaciones.",
    icon: IoBulbOutline,
    color: "warning",
    path: "/news",
  },
  {
    title: "Conexiones",
    text: "Nuestros aliados y socios.",
    icon: IoPeopleOutline,
    color: "primary",
    path: "/connections",
  },
];

function Sidebar({ user, navigate, handleLogout, nombreUsuario, location }) {
  const menuLinks = [
    { name: "Inicio", path: "/home", icon: IoHomeOutline },
    { name: "Tarjetas", path: "/cards", icon: IoCardOutline },
    { name: "Perfil", path: "/profile", icon: IoPersonCircleOutline },
    { name: "Configuración", path: "/configuracion", icon: IoSettingsOutline },
  ];

  return (
    <div
      className="sidebar d-flex flex-column bg-white border-end shadow-lg"
      style={{
        width: "250px",
        minWidth: "250px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <div className="p-4 border-bottom text-center fs-3 fw-bold">
        <span className="text-warning me-1"></span>Quack
        <span className="fw-normal">Wallet</span>
      </div>

      {/* User */}
      <div className="p-3 text-center border-bottom bg-light">
        <IoPersonCircleOutline size={30} className="text-secondary mb-1" />
        <p className="mb-0 fw-bold">{nombreUsuario}</p>
        <small className="text-muted">
          ID: {user?.id || "No disponible"}
        </small>
      </div>

      <Nav className="flex-column p-3 flex-grow-1" activeKey={location.pathname}>
        {menuLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Nav.Link
              key={link.path}
              onClick={() => navigate(link.path)}
              href={link.path}
              className={`d-flex align-items-center mb-1 rounded py-2 ${
                isActive
                  ? "bg-warning-subtle text-dark fw-bold border-start border-4 border-warning"
                  : "text-dark-50 hover-link-sidebar"
              }`}
            >
              <link.icon size={20} className="me-3" />
              {link.name}
            </Nav.Link>
          );
        })}

        <hr className="my-3" />

        <h6 className="px-3 mt-3 text-muted small fw-bold text-uppercase">
          Funciones rápidas
        </h6>

        {SECCIONES.map((sec) => {
          const isActive = location.pathname === sec.path;
          return (
            <Nav.Link
              key={sec.path}
              onClick={() => navigate(sec.path)}
              href={sec.path}
              className={`d-flex align-items-center mb-1 rounded py-2 ${
                isActive
                  ? "bg-warning-subtle text-dark fw-bold border-start border-4 border-warning"
                  : "text-dark-50 hover-link-sidebar"
              }`}
            >
              <sec.icon size={20} className="me-3" />
              {sec.title}
            </Nav.Link>
          );
        })}
      </Nav>

      <div className="p-3 border-top">
        <Button
          variant="danger"
          onClick={handleLogout}
          className="w-100 d-flex align-items-center justify-content-center"
        >
          <IoLogOutOutline size={20} className="me-2" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  if (!user) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", backgroundColor: "#fef5da" }}
      >
        <div className="spinner-border text-warning"></div>
      </div>
    );
  }

  const nombreUsuario = user.nombre;

  return (
    <div className="d-flex w-100 vh-100" style={{ backgroundColor: "#fef5da" }}>
      <Sidebar
        user={user}
        navigate={navigate}
        location={location}
        nombreUsuario={nombreUsuario}
        handleLogout={logout}
      />

      <div
        className="content-area flex-grow-1 d-flex flex-column bg-white"
        style={{ marginLeft: "250px", height: "100vh" }}
      >
        <Container fluid className="p-4 p-lg-5 flex-grow-1">
          <h1 className="fw-bold mb-3">Mi Perfil</h1>
          <p className="text-muted">Gestiona tu información personal.</p>

          {/* Card perfil */}
          <Card className="p-4 shadow-sm border-0">
            <Row>
              {/* Lado izquierdo: ícono y botón */}
              <Col
                xs={12}
                md={4}
                className="d-flex flex-column align-items-center justify-content-center mb-4 mb-md-0"
              >
                <IoPersonCircleOutline size={120} className="text-secondary mb-3" />

                <Button variant="warning" className="fw-bold px-4">
                  Editar perfil
                </Button>
              </Col>

              {/* Lado derecho: datos personales */}
              <Col xs={12} md={8}>
                <h4 className="fw-bold mb-3">Datos Personales</h4>

                <p>
                  <strong>Nombre:</strong> {user.nombre}
                </p>
                <p>
                  <strong>Correo:</strong> {user.correo}
                </p>
                <p>
                  <strong>ID:</strong> {user.id}
                </p>
              </Col>
            </Row>
          </Card>
        </Container>

        {/* FOOTER */}
        <footer
          className="text-center text-muted py-3 border-top"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <small>
            &copy; {new Date().getFullYear()} QuackWallet. Todos los derechos reservados.
          </small>
        </footer>
      </div>
    </div>
  );
}