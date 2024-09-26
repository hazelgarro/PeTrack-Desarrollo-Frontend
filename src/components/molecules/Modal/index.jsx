import React from 'react';
import ExitIcon from '../../atoms/Icons/Exit';
import GreenBorderContainer from '../../atoms/GreenBorderContainer';

export default function DropdownMenu({ isOpen, toggleModal, children }) {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    {/* Fondo semitransparente al hacer clic */}
                    <div className="my-10 mx-4">
                        <GreenBorderContainer>
                            <div className="relative p-7 md:pr-10 pr-9 ">
                                <div className="absolute top-2 right-2">
                                    <button label="Exit" onClick={toggleModal}>
                                        <ExitIcon size="large" />
                                    </button>
                                </div>
                                {/* Contenido */}
                                {children}
                            </div>
                        </GreenBorderContainer>
                    </div>
                </div>
            )}
        </>
    );
};

