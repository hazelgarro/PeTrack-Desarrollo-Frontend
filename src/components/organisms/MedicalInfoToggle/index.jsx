import { useState } from 'react';
import ArrowDownIcon from '../../atoms/Icons/Arrow';

export default function MedicalInfoToggle({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCards = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex justify-start items-center cursor-pointer" onClick={toggleCards}>
        <h2 className="font-mono font-medium text-2xl text-petrack-yellow">{title}</h2>
        <span className="mx-2">
          <ArrowDownIcon isRotated={isOpen} size="small" color="tertiary" thickness="18" />
        </span>
      </div>

      {isOpen && (
        <div>
          {children}
        </div>
      )}
    </>
  );
};
