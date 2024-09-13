import PropTypes from "prop-types";

export default function Profile({ imageSrc, profileLink }) {
    return (
        <a href={profileLink}>
            <div className="w-12 h-12">
                <img 
                    src={imageSrc} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                />
            </div>
        </a>
    );
}

Profile.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    profileLink: PropTypes.string.isRequired,
};
