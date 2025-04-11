import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../services/UserService";

const ViewUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUserById(id);
            setUser(data);
        };
        fetchUser();
    }, [id]);

    if (!user) return <div className="container mt-4">Cargando...</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Detalle de Usuario</h2>
            <div className="p-3 border rounded bg-light">
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <button className="btn btn-secondary" onClick={() => navigate("/")}>Volver</button>
            </div>
        </div>
    );
};

export default ViewUser;