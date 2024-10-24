import { useForm, SubmitHandler } from "react-hook-form";
import './style.css'
import minecraftPotion from '../../assets/minecraftPotion.png';
import discord from '../../assets/discord.png'
// Define the form data interface
interface EditProfileFormData {
  name: string; // required field
  bio?: string; // optional field
}

const EditProfile: React.FC = () => {
  // Configure the useForm hook with the form data type
  const { register, handleSubmit, formState: { errors } } = useForm<EditProfileFormData>();

  // The onSubmit handler with form data typed
  const onSubmit: SubmitHandler<EditProfileFormData> = data => {
    console.log(data);
  };

  return (
    <section className="edit-profile">
        <form className="edit-profile__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="edit-profile__user-picture-container">
                <img src={discord} className="edit-profile__user-picture"></img>
                <h4 className="edit-profile__user-name">editar foto ou avatar</h4>
          </div>
          <div className="edit-profile__form-input">
            <p className="edit-profile__form-input-text">Seu Nome:</p>
            <span className="edit-profile__form-input-field">
              <input 
                  defaultValue="" 
                  {...register("name", { required: "Nome é obrigatório"})} 
                  placeholder="Digite seu nome"
                />
              {errors.name && <span className="edit-profile__form-input-error">{errors.name.message}</span>}
            </span>

          </div>
          <div className="edit-profile__form-input">
            <p className="edit-profile__form-input-text">Sua Bio: </p>
            <span className="edit-profile__form-input-field">
              <input 
                {...register("bio")} 
                placeholder="Digite sua bio"
              />
              {errors.name && <span className="edit-profile__form-input-error">{errors.name.message}</span>}
            </span>
          </div>
          
          <input className="edit-profile__form-btn" type="submit" value="Salvar" />
        </form>
    </section>
  );
};

export default EditProfile;