import React from "react";
import { useSession } from "../../../context/SessionContext";
import Button from "../../atoms/Button";

const ActionButtons = () => {
    const { isAuthenticated } = useSession();

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-center md:justify-start items-center md:gap-4 lg:gap-18 gap-5 mt-6">
            {isAuthenticated ? (
                <>
                <Button
                        type="button"
                        variant="border-white"
                        size="medium"
                        onClick={() => scrollToSection("pets-section")}
                    >
                        Mis Mascotas
                    </Button>
                    <Button
                        type="button"
                        variant="border-white"
                        size="medium"
                        onClick={() => scrollToSection("adoption-section")}
                    >
                        Adopciones
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        type="button"
                        variant="border-white"
                        size="medium"
                        onClick={() => window.location.href = '/Login'}
                    >
                        Iniciar Sesión
                    </Button>
                    <Button
                        type="button"
                        variant="border-white"
                        size="medium"
                        onClick={() => window.location.href = '/SignUp'}
                    >
                        Registrarse
                    </Button>
                </>
            )}
        </div>
    );
};

export default ActionButtons;
