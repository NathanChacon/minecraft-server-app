import { useForm, SubmitHandler } from "react-hook-form";
import './style.css';
import { useRef } from "react";
import Button from "../../components/Button";
import { Helmet } from "react-helmet";

interface ServerFormData {
  serverAddress: string;
  serverTitle: string;
  serverDescription: string;
  serverBanner?: FileList;
}

const ServerForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ServerFormData>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const serverBanner = watch("serverBanner");

  const onSubmit: SubmitHandler<ServerFormData> = async (data) => {
    try {
      console.log("Server data submitted:", data);

      if (data.serverBanner?.[0]) {
        const bannerFile = data.serverBanner[0];
        console.log("Server Banner File:", bannerFile);
        // Handle banner file upload
      }
    } catch (error) {
      console.error("Failed to submit server data:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Minecraft Server</title>
      </Helmet>
      <section className="server-form">
        <form className="server-form__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="server-form__form-input">
            <p className="server-form__form-input-text">Server Address:</p>
            <span className="server-form__form-input-field">
              <input
                {...register("serverAddress", {
                  required: "Server address is required",
                  pattern: {
                    value: /^(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|((25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2}))$/,
                    message: "Invalid server domain name or IP address",
                  },
                })}
                placeholder="Enter server address"
              />
              <span className={`server-form__form-input-error ${errors.serverAddress ? 'visible' : 'hidden'}`}>
                {errors.serverAddress?.message}
              </span>
            </span>
          </div>

          <div className="server-form__form-input">
            <p className="server-form__form-input-text">Server Title:</p>
            <span className="server-form__form-input-field">
              <input
                {...register("serverTitle", { required: "Server title is required" })}
                placeholder="Enter server title"
              />
              <span className={`server-form__form-input-error ${errors.serverTitle ? 'visible' : 'hidden'}`}>
                {errors.serverTitle?.message}
              </span>
            </span>
          </div>

          <div className="server-form__form-input">
            <p className="server-form__form-input-text">Server Description:</p>
            <span className="server-form__form-input-field">
              <textarea
                {...register("serverDescription", { required: "Server description is required" })}
                placeholder="Enter server description"
              />
              <span className={`server-form__form-input-error ${errors.serverDescription ? 'visible' : 'hidden'}`}>
                {errors.serverDescription?.message}
              </span>
            </span>
          </div>

          <div className="server-form__form-input">
            <p className="server-form__form-input-text">Server Banner (Optional):</p>
            <span className="server-form__form-input-field">
              <input
                type="file"
                accept="image/*"
                {...register("serverBanner")}
                ref={fileInputRef}
                className="server-form__file-input"
              />
              {serverBanner?.[0] && <p>Selected file: {serverBanner[0].name}</p>}
            </span>
          </div>

          <Button type="submit" className="server-form__form-button">Create Server</Button>
        </form>
      </section>
    </>
  );
};

export default ServerForm;