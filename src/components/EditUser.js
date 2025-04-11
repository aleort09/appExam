import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getUserById, updateUser } from "../services/UserService";

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUserById(id);
            setUser(data);
        };
        fetchUser();
    }, [id]);

    const handleUpdate = async () => {
        if (!user.name || !user.email) {
            Swal.fire("Error", "Nombre y email son obligatorios", "error");
            return;
        }
        await updateUser(id, user);
        Swal.fire("Actualizado", "Usuario actualizado correctamente", "success");
        navigate("/");
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Editar Usuario</h2>
            <div className="p-3 border rounded bg-light">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nombre"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Contraseña (opcional)"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <button className="btn btn-warning" onClick={handleUpdate}>Actualizar</button>
                <button className="btn btn-secondary ms-2" onClick={() => navigate("/")}>Cancelar</button>
            </div>
        </div>
    );
};

export default EditUser;