import PropTypes from "prop-types";
import './styles.css';

export default function Profile({ imageSrc, profileLink, size }) {
    return (
        <a href={profileLink}>
            <div className={`profile-container profile-${size}`}>
                {imageSrc ? (
                    <img 
                        src={imageSrc} 
                        alt="Profile" 
                        className="profile-image"
                    />
                ) : (
                    <span className="profile-placeholder"></span>
                )}
            </div>
        </a>
    );
}

Profile.propTypes = {
    imageSrc: PropTypes.string,
    profileLink: PropTypes.string.isRequired,
    size: PropTypes.oneOf(["extra-small", "extra-large", "small", "medium", "large"]).isRequired,
};
