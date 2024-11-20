import { useForm, SubmitHandler } from "react-hook-form";
import './style.css';
import { useRef, useState } from "react";
import Button from "../../components/Button";
import { Helmet } from "react-helmet";
import defaultServerImg from '../../assets/defaultServerImg.webp'
import { saveServer } from "../../api/services/server";
import { useUser } from "../../context/UserContext";
interface ServerFormData {
  serverAddress: string;
  serverTitle: string;
  serverDescription: string;
  serverBanner?: any;
}

const ServerForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ServerFormData>();
  const [file, setFile] = useState<any>(null)
  const [formattedSelectedFile, setFormattedSelectedFile] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoadingSaveServer, setIsLoadingSaveServer] = useState(false)
  const {user} = useUser()

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setFormattedSelectedFile(imageUrl);
      setFile(selectedFile);
    }
  };


  const handleSubmitServer: SubmitHandler<ServerFormData> = async (data) => {
    setIsLoadingSaveServer(true)
    try {
      const serverData = await saveServer({
        ip: data.serverAddress,
        title: data.serverTitle,
        description: data.serverDescription,
        imageFile: file,
        userId: user?.uid || ""
      });
      setIsLoadingSaveServer(false)
      console.log("Server created successfully:", serverData);
      // Handle success, e.g., redirect to the server page or show success message

    } catch (error) {
      setIsLoadingSaveServer(false)
      console.error("Error creating server:", error);
      // Handle error, e.g., show an error message
    }
  };


  return (
    <>
      <Helmet>
        <title>Criar servidor</title>
      </Helmet>
      <section className="server-form">
        <form className="server-form__form" onSubmit={handleSubmit(handleSubmitServer)}>
        <div className="server-form__form-input">
            <span className="server-form__form-input-field">
              <div className="server-form__image-preview">
                <img
                  src={formattedSelectedFile || defaultServerImg}
                  alt="Banner do servidor"
                  className="server-form__image-preview-img"
                />
              </div>

            
              <p
                className="server-form__select-banner-text"
              >
                <span onClick={() => {fileInputRef.current?.click()}}>Selecione um banner</span>
              </p>
              <input
                type="file"
                id="serverBanner"
                accept="image/*"
                {...register("serverBanner")}
                ref={fileInputRef}
                className="server-form__file-input"
                onChange={handleImageChange} // Handle image selection
              />
            </span>
          </div>
          <div className="server-form__form-input">
            <p className="server-form__form-input-text">IP do Servidor:</p>
            <span className="server-form__form-input-field">
              <input
                {...register("serverAddress", {
                  required: "O endereço do servidor é obrigatório.",
                  pattern: {
                    value: /^(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|((25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2}))$/,
                    message: "Nome de domínio ou endereço IP do servidor inválido.",
                  },
                })}
                placeholder="Digite o endereço do servidor"
              />
              <span className={`server-form__form-input-error ${errors.serverAddress ? 'visible' : 'hidden'}`}>
                {errors.serverAddress?.message}
              </span>
            </span>
          </div>

          <div className="server-form__form-input">
            <p className="server-form__form-input-text">Nome do Servidor:</p>
            <span className="server-form__form-input-field">
              <input
                {...register("serverTitle", { required: "O nome do servidor é obrigatório." })}
                placeholder="Digite o nome do servidor"
              />
              <span className={`server-form__form-input-error ${errors.serverTitle ? 'visible' : 'hidden'}`}>
                {errors.serverTitle?.message}
              </span>
            </span>
          </div>

          <div className="server-form__form-input">
            <p className="server-form__form-input-text">Descrição do Servidor:</p>
            <span className="server-form__form-input-field">
              <textarea
                {...register("serverDescription", { required: "A descrição do servidor é obrigatória." })}
                placeholder="Digite a descrição do servidor"
              />
              <span className={`server-form__form-input-error ${errors.serverDescription ? 'visible' : 'hidden'}`}>
                {errors.serverDescription?.message}
              </span>
            </span>
          </div>
          <Button isLoading={isLoadingSaveServer} type="submit">Criar</Button>
        </form>
      </section>
    </>
  );
};

export default ServerForm;