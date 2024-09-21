// src/components/molecules/DropdownMenu.jsx
import React, { useState } from 'react';
import Button from '../../atoms/Button';
import MenuIcon from '../../atoms/Icons/Menu';
import ExitIcon from '../../atoms/Icons/Exit';

const DropdownMenu = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="lg:hidden">
            <button className="absolute bottom-4 right-4" label="Opciones" onClick={toggleMenu}><MenuIcon></MenuIcon></button>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    {/* Fondo semitransparente al hacer clic */}
                    <div className="relative bg-white border-2 border-petrack-green rounded-lg p-7 md:pr-10 pr-9 my-10 mx-4">
                        <div className="absolute top-2 right-2">
                            <button label="Exit" onClick={toggleMenu}>
                                <ExitIcon size="large" />
                            </button>
                        </div>

                        <div className="flex flex-wrap justify-start gap-4">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
