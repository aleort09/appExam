import { useState } from "react";
import Swal from "sweetalert2";
import { createUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";

const CreateUser = ({ fetchUsers }) => {
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleAddUser = async () => {
        if (!newUser.name || !newUser.email || !newUser.password) {
            Swal.fire("Error", "Todos los campos son obligatorios", "error");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(newUser.email)) {
            Swal.fire("Error", "Correo electrónico no válido", "error");
            return;
        }

        if (newUser.password.length < 6) {
            Swal.fire("Error", "La contraseña debe tener al menos 6 caracteres", "error");
            return;
        }

        await createUser(newUser);
        setNewUser({ name: "", email: "", password: "" });

        Swal.fire("Éxito", "Usuario agregado correctamente", "success");
        navigate("/");
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Agregar Usuario</h2>
            <div className="p-3 border rounded bg-light">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nombre"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Contraseña"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
                <button className="btn btn-primary" onClick={handleAddUser}>
                    Agregar
                </button>
                <button className="btn btn-secondary ms-2" onClick={() => navigate("/")}>
                    Volver
                </button>
            </div>
        </div>
    );
};

export default CreateUser;
