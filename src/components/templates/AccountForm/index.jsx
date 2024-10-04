import PropTypes from "prop-types";
import "./styles.css";

export default function AccountForm({ children }) {
    return (
        <div className="flex justify-center items-center min-h-screen w-full relative">
            <div
                className="bg-background-image"
            ></div>
            
            {/* Contenedor para los formulario */}
            <div className="relative flex justify-center items-center w-full min-h-screen">
                {children}
            </div>
        </div>
    );
}

AccountForm.propTypes = {
    children: PropTypes.any.isRequired,
};