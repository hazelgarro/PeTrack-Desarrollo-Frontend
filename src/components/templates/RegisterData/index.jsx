import TextInput from "../../atoms/TextInput";
import SelectInput from "../../molecules/SelectInput";
import PasswordInput from "../../molecules/PasswordInput";
import Logo from "../../atoms/Logo";
import BgImage from "../../../assets/img/Bg.png";
import "./styles.css";
import ButtonLogin from "../../atoms/Button";

export default function CreateAccount() {
  const options = [
    { value: "1", label: "Personal" },
    { value: "2", label: "Servicio Veterinario" },
    { value: "3", label: "Servicio de Adopción/Refugio" },
  ];

  return (
    <div className="absolute flex justify-center items-center h-full w-full">
      <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${BgImage})` }}>
      </div>
      <div className="relative flex justify-center items-center h-full">
        <div className="flex flex-col p-12 bg-white bg-opacity-90 rounded-3xl">
          <div className="mb-10">
            <Logo size="extra-large" />
            <h1 className="text-4xl text-center mt-6">Crear cuenta</h1>

          </div>
          <div className="flex flex-col justify-between w-96 h-96">
            <SelectInput
              size="medium"
              placeholder="Tipo de Usuario"
              options={options}
            />
            <TextInput size="medium" placeholder="Full name" />
            <TextInput size="medium" placeholder="Email" />
            <PasswordInput size="medium" placeholder="Password" />
            <PasswordInput size="medium" placeholder="Confirm password" />
            <ButtonLogin size="small" variant="solid-green">Registrarme</ButtonLogin>
            <h1 className="text-center mt-6">Already have an account? <a className="font-bold text-petrack-green" href="/">Sign In</a></h1>
          </div>
        </div>
      </div>
    </div>
  );
}
