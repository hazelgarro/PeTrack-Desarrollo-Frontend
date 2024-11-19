import PropTypes from "prop-types";
import ExitIcon from '../../atoms/Icons/Exit';
import BorderContainer from '../../atoms/BorderContainer';

export default function Modal({ isOpen, toggleModal, children, type = "default" }) {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    {/* Fondo semitransparente al hacer clic */}
                    <div className="my-10 mx-4 max-h-screen overflow-y-auto">
                        <BorderContainer>
                            <div className={`relative p-7 ${type === "buttons" ? "md:pr-10 pr-9" : ""}`}>
                                <div className="absolute top-2 right-2">
                                    <button label="Exit" onClick={toggleModal}>
                                        <ExitIcon size="large" />
                                    </button>
                                </div>
                                {children}
                            </div>
                        </BorderContainer>
                    </div>
                </div>
            )}
        </>
    );
};

Modal.propTypes = {
    type: PropTypes.oneOf(["default", "buttons"]),
    toggleModal: PropTypes.func,
    children: PropTypes.node.isRequired
};
