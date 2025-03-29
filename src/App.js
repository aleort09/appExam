import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import Swal from "sweetalert2";
import useUsers from "./hooks/useUser";
import { deleteUser, loginUser } from "./services/UserService";
import { useNavigate } from "react-router-dom";

function App() {
    const { users, fetchUsers } = useUsers();
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleDeleteUser = async (id) => {
        const confirmDelete = await Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás recuperar este usuario",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (confirmDelete.isConfirmed) {
            await deleteUser(id);
            fetchUsers();
            Swal.fire("Eliminado", "Usuario eliminado correctamente", "success");
        }
    };

    const handleLogin = async () => {
        if (!loginData.email || !loginData.password) {
            Swal.fire("Error", "Todos los campos son obligatorios", "error");
            return;
        }

        const response = await loginUser(loginData);
        if (response.access_token) {
            localStorage.setItem("user", JSON.stringify(response.user));
            navigate("/perfil");
        } else {
            Swal.fire("Error", "Credenciales inválidas", "error");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Lista de Usuarios</h2>

            <button className="btn btn-primary mb-3" onClick={() => navigate("/create")}>
                Crear Usuario
            </button>

            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 p-3 border rounded bg-light">
                <h3>Iniciar Sesión</h3>
                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />
                <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Contraseña"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
                <button className="btn btn-success" onClick={handleLogin}>
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
}

export default App;
