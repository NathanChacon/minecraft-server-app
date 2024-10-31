import { useForm, SubmitHandler} from "react-hook-form";
import './style.css'
import discord from '../../assets/discord.png'
import { useRef} from "react";
import { uploadUserImage, updateUserData } from "../../api/services/user";
import { useUser } from "../../context/UserContext";

interface EditProfileFormData {
  name: string;
  bio?: string;
  serverIp?: string;
  discordId?: string;
  isUserVisible?: boolean;
}

const EditProfile: React.FC = () => {
  const {user, setUser} = useUser()
  const userLocalStorage = JSON.parse(localStorage.getItem("user") || "{}");

  const { register, watch, handleSubmit, formState: { errors } } = useForm<EditProfileFormData>({
    defaultValues : {
      name: userLocalStorage?.name || "",
      bio: userLocalStorage?.bio || "",
      discordId: userLocalStorage?.discordId || "",
      serverIp: userLocalStorage?.serverIp || "",
      isUserVisible: userLocalStorage?.isUserVisible || false,
  }});


  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const discordId = watch("discordId");
  const serverIp = watch("serverIp");

  const isToggleEnabled = !!(discordId || serverIp);

  const onSubmit: SubmitHandler<EditProfileFormData> = async (data) => {
    if(user && user.uid){
      try{
        await updateUserData(user?.uid, data)


        const newUserData = {
          ...user, 
          name: data.name,
          bio: data?.bio || "",
          discordId: data?.discordId || null,
          serverIp: data?.serverIp || null,
          isUserVisible: data?.isUserVisible || false
        }
        localStorage.setItem("user", JSON.stringify(newUserData));
  
        setUser(newUserData)
  
        console.log("sucess")
      }
      catch{
        console.log("handle update user error")
      }
    }

    console.log("test data", data);
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try{
      const file = event.target.files?.[0]; // Get the selected file
      if (file && file.type.startsWith("image/") && user?.uid) {
        const imageUrl = await uploadUserImage(user.uid, file);
  
  
        const userLocalStorage = JSON.parse(localStorage.getItem("user") || "{}");
        
        userLocalStorage.profileImg = imageUrl;
        localStorage.setItem("user", JSON.stringify(userLocalStorage));
  
        setUser({
          ...user,
          profileImg: imageUrl
        })
  
      } 
    }
    catch(error){
      const userLocalStorage = JSON.parse(localStorage.getItem("user") || "{}");
        
      userLocalStorage.profileImg = null; // Assuming you store imagePath in local storage
      localStorage.setItem("user", JSON.stringify(userLocalStorage));

      setUser({
        ...userLocalStorage
      })
    }
  };

  return (
    <section className="edit-profile">
        <form className="edit-profile__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="edit-profile__user-picture-container">
                <img src={user?.profileImg || discord} className="edit-profile__user-picture"></img>
                <h4 className="edit-profile__user-name" onClick={() => {fileInputRef.current?.click()}}>editar foto ou avatar</h4>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="edit-profile__file-input" 
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
          </div>
          <div className="edit-profile__form-input">
            <p className="edit-profile__form-input-text">Seu Nome:</p>
            <span className="edit-profile__form-input-field">
              <input
                  {...register("name", { 
                    required: "Nome é obrigatório",               
                    minLength: { value: 2, message: "minimo 2 caracteres" },
                    maxLength: { value: 10, message: "maximo 10 caracteres" } 
                  })} 
                  placeholder="Digite seu nome"
                />
              <span className={`edit-profile__form-input-error ${errors.name ? 'visible' : 'hidden'}`}>{errors?.name?.message}</span>
            </span>

          </div>
          <div className="edit-profile__form-input">
            <p className="edit-profile__form-input-text">Sua Bio: </p>
            <span className="edit-profile__form-input-field">
              <input 
                {...register("bio", {
                  minLength: { value: 10, message: "minimo 10 caracteres" },
                  maxLength: { value: 60, message: "maximo 60 caracteres" }
                })} 
                placeholder="Digite sua bio"
              />
              <span className={`edit-profile__form-input-error ${errors.bio ? 'visible' : 'hidden'}`}>{errors?.bio?.message}</span>
            </span>
          </div>

          <div className="edit-profile__form-input">
          <p className="edit-profile__form-input-text">Discord ID:</p>
          <span className="edit-profile__form-input-field">
            <input 
              {...register("discordId", {
                pattern: {
                  value: /^[a-zA-Z0-9._]{2,32}#[0-9]+$/, // Allows letters, numbers, underscores, dots, and any number of digits after '#'
                  message: "Digite um Discord ID válido, no formato 'username#1234'"
                },
              })}
              placeholder="Digite seu Discord ID"
            />
            <span className={`edit-profile__form-input-error ${errors.discordId ? 'visible' : 'hidden'}`}>{errors?.discordId?.message}</span>
          </span>
        </div>

        {/* Server IP Field */}
        <div className="edit-profile__form-input">
          <p className="edit-profile__form-input-text">Server IP:</p>
          <span className="edit-profile__form-input-field">
            <input 
              {...register("serverIp", {
                pattern: {
                  value: /^(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|((25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})|(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4})(:\d{1,5})?$/,
                  message: "IP ou domínio inválido para servidor Minecraft",
                },
              })} 
              placeholder="Digite o IP do servidor"
            />

          <span className={`edit-profile__form-input-error ${errors.serverIp ? 'visible' : 'hidden'}`}>{errors?.serverIp?.message}</span>
          </span>
        </div>

          <div className="edit-profile__form-input">
          <span className="edit-profile__form-input-field-checkbox">
          <p className="edit-profile__form-input-text">Ficar visível: </p>
         
            <input
                    type="checkbox"
                    className="edit-profile__checkbox"
                    {...register("isUserVisible")}
                    disabled={!isToggleEnabled}
              />
            
          </span>
          <span className={`edit-profile__form-input-error ${!isToggleEnabled ? 'visible' : 'hidden'}`}>Discord ID ou IP do Servidor necessários.</span>
        </div>
          
          <input className="edit-profile__form-btn" type="submit" value="Salvar" />
        </form>
    </section>
  );
};

export default EditProfile;