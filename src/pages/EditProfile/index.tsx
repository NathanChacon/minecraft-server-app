import { useForm, SubmitHandler } from "react-hook-form";
import './style.css'
import minecraftPotion from '../../assets/minecraftPotion.png';
import discord from '../../assets/discord.png'
import { useRef, useState } from "react";
import { deleteUserImage, uploadUserImage } from "../../api/services/user";
import { useUser } from "../../context/UserContext";

interface EditProfileFormData {
  name: string;
  bio?: string;
}

const EditProfile: React.FC = () => {
  const {user, setUser} = useUser()

  const { register, handleSubmit, formState: { errors } } = useForm<EditProfileFormData>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit: SubmitHandler<EditProfileFormData> = data => {
    console.log(data);
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try{
      const file = event.target.files?.[0]; // Get the selected file
      if (file && file.type.startsWith("image/") && user?.uid) {
        await deleteUserImage(user.uid)
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
              {errors.name && <span className="edit-profile__form-input-error">{errors.name.message}</span>}
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
              {errors.bio && <span className="edit-profile__form-input-error">{errors.bio.message}</span>}
            </span>
          </div>
          
          <input className="edit-profile__form-btn" type="submit" value="Salvar" />
        </form>
    </section>
  );
};

export default EditProfile;