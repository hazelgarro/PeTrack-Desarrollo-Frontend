import PropTypes from "prop-types";

export default function Banner({ imageSrc = "", defaultImage = "", onClick = null }) {
  const imgSrc = imageSrc || defaultImage;

  return (
    <div
      className={`w-full h-0 pb-[56.25%] relative rounded-2xl overflow-hidden bg-slate-300 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {imgSrc ? (
        <img src={imgSrc} className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl" />
      ) : (
        <span className="text-gray-500"></span>
      )}
    </div>
  );
}

// PropTypes validation
Banner.propTypes = {
  imageSrc: PropTypes.string,
  defaultImage: PropTypes.string,
  onClick: PropTypes.func,
};

// Valores por defecto
// Banner.defaultProps = {
//   imageSrc: "",       // Valor por defecto si no se proporciona 'imageSrc'
//   defaultImage: "",   // Valor por defecto si no se proporciona 'defaultImage'
//   onClick: null,      // Valor por defecto si no se proporciona una función 'onClick'
// };