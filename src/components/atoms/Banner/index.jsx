import PropTypes from "prop-types";

export default function Banner({ imageSrc, bannerLink }) {
    return (
        <a href={bannerLink}>
            <div className=" w-96 h-48 bg-slate-300 rounded-2xl  flex items-center justify-center">
                {imageSrc ? (
                    <img 
                        src={imageSrc} 
                        alt="Banner" 
                        className="w-full h-full object-cover rounded-2xl"
                    />
                ) : (
                    <span className="text-gray-500"></span>
                )}
            </div>
        </a>
    );
}

Banner.propTypes = {
    imageSrc: PropTypes.string,
    bannerLink: PropTypes.string.isRequired,
};
