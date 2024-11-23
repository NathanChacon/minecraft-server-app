import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { getServersByUserId } from "../../api/services/server";
import { useNavigate } from "react-router-dom";
import ServerCard from "../../components/ServerCard";
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
                <ServerCard 
                server={{title: server.title, ip: server.ip, description: server.description, imageUrl: server.imageUrl, isVisible: server.isVisible }} 
                action={{label: "editar", onClick: handleEditServer}}/>
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