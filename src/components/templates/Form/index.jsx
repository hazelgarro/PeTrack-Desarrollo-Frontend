import Logo from "../../atoms/Logo";
import BgImage from "../../../assets/img/Bg.png";
import "./styles.css";
import ButtonLogin from "../../atoms/Button";

export default function Login({ title, children }) {
    return (
        <div className="absolute flex justify-center items-center h-full w-full">
            <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${BgImage})` }}>
            </div>
            <div className="relative flex justify-center items-center h-full">
                <div className="flex flex-col p-12  bg-white bg-opacity-90 rounded-3xl">
                    <div className="mb-10">
                        <Logo size="extra-large" />
                        <h1 className="text-4xl text-center mt-6">{title}</h1>
                    </div>
                    <div className="flex flex-col justify-between w-96">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}