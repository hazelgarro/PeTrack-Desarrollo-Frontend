import PropTypes from "prop-types";
import BgImage from "../../../assets/img/Bg.png";
import "./styles.css";

export default function AccountForm({ children }) {
    return (
        <div className="flex justify-center items-center min-h-screen w-full">
            {/* Imagen de fondo */}
            <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${BgImage})` }}>
            </div>
            {/* Contenedor para el formulario */}
            <div className="relative z-10 flex justify-center items-center w-full">
                {children}
            </div>
        </div>
    );
}

AccountForm.propTypes = {
    children: PropTypes.any.isRequired,
};