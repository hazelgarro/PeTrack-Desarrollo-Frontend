import { useState } from 'react';

export default function({title, children}){
  const [isOpen, setIsOpen] = useState(false);

  const toggleCards = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="my-5">
      <div className="flex justify-start items-center cursor-pointer" onClick={toggleCards}>
        <h2 className="text-petrack-yellow font-bold text-lg">{title}</h2>
        <span className={`ml-2 text-petrack-yellow transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ⬇️
        </span>
      </div>

      {isOpen && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
};
