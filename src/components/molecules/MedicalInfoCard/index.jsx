import { useState, useRef, useEffect } from "react";
import GreenBorderContainer from '../../atoms/GreenBorderContainer';
import ArrowDownIcon from "../../atoms/Icons/Arrow";
import TextBlock from "../TextBlock";

export default function MedicalInfoCard() {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el texto está expandido
  const [isOverflowing, setIsOverflowing] = useState(false); // Estado para verificar si hay desbordamiento
  const contentRef = useRef(null); // Referencia al contenido

  const toggleContent = () => {
    setIsOpen(!isOpen); // Alterna entre expandido y colapsado
  };

  // Uso de ResizeObserver para observar el cambio de tamaño del contenedor
  useEffect(() => {
    const content = contentRef.current;

    const checkOverflow = () => {
      if (content) {
        setIsOverflowing(content.scrollHeight > content.clientHeight); // Verifica si hay desbordamiento
      }
    };

    const resizeObserver = new ResizeObserver(checkOverflow);

    if (content) {
      resizeObserver.observe(content);
    }

    checkOverflow(); // Verifica inicialmente

    return () => {
      if (content) {
        resizeObserver.unobserve(content);
      }
    };
  }, [isOpen]);

  return (
    <div className="my-4">
      <GreenBorderContainer>
        <div className="p-4 flex justify-between">
          <div>
            <div className="text-md text-petrack-green">Datetime</div>
            <TextBlock title="Title">
              <p
                ref={contentRef}
                className={`text-petrack-black transition-all duration-300 ease-in-out ${!isOpen ? 'line-clamp-1' : ''}`} // Cambia de clase según el estado
              >
                Lorem ipsum dolor sit amet justo sit amet orci volutpat luctus. Quis quis id in cum.
              </p>
            </TextBlock>
          </div>
          {(isOpen || isOverflowing) && ( // Si está expandido o hay desbordamiento, muestra el botón
            <button onClick={toggleContent}>
              <span className="mx-2 transition-transform duration-300 ease-in-out">
                <ArrowDownIcon
                  isRotated={isOpen} // Rota el ícono según el estado
                  size="medium"
                  color="primary"
                  initialDirection='right'
                  thickness="18"
                />
              </span>
            </button>
          )}
        </div>
      </GreenBorderContainer>
    </div>
  );
};