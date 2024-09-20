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
                    <div className="w-auto bg-white border-2 border-petrack-green rounded-lg shadow-lg p-4 m-8">
                        <div className="text-end">
                            <button label="Opciones" onClick={toggleMenu}><ExitIcon size="large"></ExitIcon></button>
                        </div>
                        <div className="flex-col-reverse">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
