import PropTypes from "prop-types";

export default function Banner({ imageSrc }) {
    return (
        <div className="w-full max-w-md h-48 bg-slate-300 rounded-2xl flex items-center justify-center mx-auto">
            {imageSrc ? (
                <img 
                    src={imageSrc} 
                    alt="Banner" 
                    className="w-full h-full object-cover rounded-2xl"
                />
            ) : (
                <div className="text-gray-500"></div>
            )}
        </div>
    );
}

Banner.propTypes = {
    imageSrc: PropTypes.string,
};
