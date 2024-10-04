import PropTypes from "prop-types";

export default function Banner({ imageSrc = "", defaultImage = "", imageAlt = "Banner", onClick = null }) {
    return (
        <div className={`w-full max-w-md h-48 bg-slate-300 rounded-2xl flex items-center justify-center mx-auto ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}>
            {imageSrc || defaultImage ? (
                <img
                    src={imageSrc || defaultImage}  // Usa imageSrc si existe, si no usa defaultImage
                    alt={imageAlt}
                    className="w-full h-full object-cover rounded-2xl"
                />
            ) : (
                <span className="text-gray-500"></span>  // Muestra el mensaje si no hay imágenes
            )}
        </div>
    );
}

Banner.propTypes = {
    imageSrc: PropTypes.string,
    defaultImage: PropTypes.string,
    imageAlt: PropTypes.string,
    onClick: PropTypes.func,
}