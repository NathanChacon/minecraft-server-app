import { useForm, SubmitHandler } from "react-hook-form";
import './style.css'
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
                <img className="edit-profile__user-picture"></img>
                <h4 className="edit-profile__user-picture">editar foto ou avatar</h4>
          </div>
          <input 
            defaultValue="test" 
            {...register("name", { required: "Name is required"})} 
            placeholder="Enter your name"
          />
          {errors.name && <span>{errors.name.message}</span>}

          <input 
            {...register("bio")} 
            placeholder="Enter your bio (optional)"
          />
          
          <input type="submit" value="Save Profile" />
        </form>
    </section>
  );
};

export default EditProfile;