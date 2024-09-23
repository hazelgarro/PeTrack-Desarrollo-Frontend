import TextInput from "../../atoms/TextInput";
import PasswordInput from "../../molecules/PasswordInput";
import Logo from "../../atoms/Logo";
import BgImage from "../../../assets/img/Bg.png";
import "./styles.css";
import ButtonLogin from "../../atoms/Button";

export default function Login() {
    return (
        <div className="absolute flex justify-center items-center h-full w-full">
            <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${BgImage})` }}>
            </div>
            <div className="relative flex justify-center items-center h-full">
                <div className="flex flex-col p-12  bg-white bg-opacity-90 rounded-3xl">
                    <div className="mb-10">
                        <Logo size="extra-large" />
                    </div>
                    <div className="flex flex-col justify-between w-96 h-72">
                        <TextInput size="medium" placeholder="Email" />
                        <PasswordInput size="medium" placeholder="Password" />
                        <h2 className="text-right text-sm text-gray-500 mb-2">Forgot your password?</h2>
                        <ButtonLogin size="small" variant="solid-green">Log In</ButtonLogin>
                        <h3 className="text-center pt-5">Don't have an account? <a className="font-bold text-petrack-green" href="/SignUp">Sign Up</a></h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
