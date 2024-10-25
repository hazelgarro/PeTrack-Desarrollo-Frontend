import PropTypes from "prop-types";
export default function Image({ imgSrc, imgAlt }) {
  return (
    <div className="w-full h-0 pb-[56.25%] relative rounded-2xl overflow-hidden"> {/* Añadido rounded-2xl y overflow-hidden */}
      <img src={imgSrc} alt={imgAlt} className="absolute top-0 left-0 w-full h-full object-cover" />
    </div>
  );
}

Image.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string,
};