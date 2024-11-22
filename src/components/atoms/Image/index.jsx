import PropTypes from "prop-types";

export default function Image({ imgSrc, imgAlt, defaultImage="" }) {
  const handleImageError = (event) => {
    event.target.src = defaultImage; // Cambia a la imagen predeterminada si falla la carga
  };

  return (
    <div className="w-full h-0 pb-[56.25%] relative rounded-2xl overflow-hidden">
      <img
        src={imgSrc}
        alt={imgAlt || "Image"}
        onError={handleImageError} // Maneja el error de carga
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
  );
}

Image.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string,
  defaultImage: PropTypes.string,
};
