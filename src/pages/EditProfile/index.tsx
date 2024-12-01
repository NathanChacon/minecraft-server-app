import { useForm, SubmitHandler} from "react-hook-form";
import './style.css'
import { useRef} from "react";
import { uploadUserImage, updateUserData } from "../../api/services/user";
import { useUser } from "../../context/UserContext";
import UserDefaultImage from "../../components/UserDefaultImage";
import MultiSelectDropdown from "../../components/MultiSelectDropdown";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { daysOfWeek, gameModes, ores } from "../../constants";
import { Helmet } from "react-helmet";

interface EditProfileFormData {
  name: string;
  bio?: string;
  discordId?: string;
  isUserVisible?: boolean;
  gameModes?: Array<string>;
  availableDays?: Array<string>;
  ores?: Array<string>
}

const EditProfile: React.FC = () => {
  const {user, setUser} = useUser()
  const navigate = useNavigate()
  const userLocalStorage = JSON.parse(localStorage.getItem("user") || "{}");

  const { register, handleSubmit, formState: { errors } } = useForm<EditProfileFormData>({
    defaultValues : {
      name: userLocalStorage?.name || "",
      bio: userLocalStorage?.bio || "",
      discordId: userLocalStorage?.discordId || "",
      isUserVisible: userLocalStorage?.isUserVisible || false,
      gameModes: userLocalStorage?.gameModes || [],
      availableDays: userLocalStorage?.availableDays || [],
      ores: userLocalStorage?.ores || []
  }});



  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const onSubmit: SubmitHandler<EditProfileFormData> = async (data) => {
    if (user && user.uid) {
      try {
        const isUserVisible = data.isUserVisible;

        await updateUserData(user.uid, { ...data, isUserVisible });

        const newUserData = {
          ...user,
          name: data.name,
          bio: data?.bio || "",
          discordId: data?.discordId || null,
          gameModes: data?.gameModes || [],
          availableDays: data?.availableDays || [],
          ores: data?.ores || [],
          isUserVisible
        };

        localStorage.setItem("user", JSON.stringify(newUserData));
        setUser(newUserData);
        navigate("/players")
        
      } catch {
        console.log("Handle update user error");
      }
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try{
      const file = event.target.files?.[0];
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
        
      userLocalStorage.profileImg = null;
      localStorage.setItem("user", JSON.stringify(userLocalStorage));

      setUser({
        ...userLocalStorage
      })
    }
  };

  return (
    <>
      <Helmet>
        <title>Editar Perfil</title>
      </Helmet>

      <section className="edit-profile">
        <form className="edit-profile__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="edit-profile__user-picture-container">
              {
                user?.profileImg ? <img src={user?.profileImg} className="edit-profile__user-picture"></img> : <UserDefaultImage name={user?.name || user?.defaultName || "?"}/>
              }
                
                <h4 className="edit-profile__img-inpt-txt" onClick={() => {fileInputRef.current?.click()}}>editar foto ou avatar</h4>
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
          <span className="edit-profile__form-input-field-checkbox">
          <p className="edit-profile__form-input-text">Ficar visível: </p>
         
            <input
                    type="checkbox"
                    className="edit-profile__checkbox"
                    {...register("isUserVisible")}
              />
            
          </span>
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
                  value: /^(@[a-z0-9._]{2,32}|[a-zA-Z0-9._]{2,32}#[0-9]{4,19})$/,
                  message: "Digite um Discord ID válido: @username ou username#1234"
                },
              })}
              placeholder="Digite seu Discord ID"
            />
            <span className={`edit-profile__form-input-error ${errors.discordId ? 'visible' : 'hidden'}`}>{errors?.discordId?.message}</span>
          </span>
        </div>

        
        <div className="edit-profile__form-input">
            <p className="edit-profile__form-input-text edit-profile__form-input-text--select">Dias disponíveis:</p>
            <MultiSelectDropdown
              title="Selecione os dias"
              formName="availableDays"
              register={register}
              options={daysOfWeek}
            />
        </div>

        <div className="edit-profile__form-input">
            <p className="edit-profile__form-input-text edit-profile__form-input-text--select">Modos de Jogo:</p>
            <MultiSelectDropdown
              title="Selecione os modos de jogo"
              register={register}
              options={gameModes}
              formName="gameModes"
            />
        </div>

        <div className="edit-profile__form-input">
            <p className="edit-profile__form-input-text edit-profile__form-input-text--select">Minério Favorito:</p>
            <MultiSelectDropdown
              title="Selecione seu minério favorito"
              register={register}
              options={ores}
              formName="ores"
              isMultiple={false}
            />
        </div>
          <Button buttonType="cta" type="submit"> Salvar </Button>
        </form>
    </section>
    </>

  );
};

export default EditProfile;