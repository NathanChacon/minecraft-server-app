import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { getServersByUserId } from "../../api/services/server";
import { useNavigate } from "react-router-dom";
import './style.css';

const UserServer = () => {
    const { user } = useUser();
    const [server, setServer] = useState<any>(null);
    const navigate = useNavigate();

    const handleUserServer = async () => {
        const userServer = await getServersByUserId(user?.uid || "");
        if (userServer?.length > 0) {
            setServer(userServer[0]);
        }
    };

    const handleAddServer = () => {
        navigate("/create-server");
    };

    const handleEditServer = () => {
        navigate(`/edit-server/${server?.id}`);
    };

    useEffect(() => {
        handleUserServer();
    }, [user]);

    return (
        <section className="user-server">
            {server ? (
                <div className="user-server__card">
                    <img className="user-server__img" src={server.imageUrl} alt={server.title} />
                    <ul className="user-server__body">
                        <li className="user-server__item">
                            <p>Nome:</p> <p>{server?.title}</p>
                        </li>
                        <li className="user-server__item">
                            <p>Sobre:</p> <p>{server?.description}</p>
                        </li>
                        <li className="user-server__item">
                            <p>Ip:</p> <p>{server?.ip}</p>
                        </li>
                        <li className="user-server__item">
                            <p>Status:</p> <p>{server?.isVisible ?  "Visível" : "Invisível"}</p>
                        </li>
                    </ul>
                    <div className="user-server__actions">
                        <button className="user-server__edit-btn" onClick={handleEditServer}>
                            Editar
                        </button>
                    </div>
                </div>
            ) : (
                <div className="user-server__empty">
                    <button className="user-server__add-btn" onClick={handleAddServer}>
                        + Adicionar Servidor
                    </button>
                </div>
            )}
        </section>
    );
};

export default UserServer;