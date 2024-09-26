import { useState } from 'react';

//Maneja estados para la apertura y cierre de modales, menús desplegables, entre otros
export const useOpenClose = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return { isOpen, toggleModal };
};