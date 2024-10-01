import PropTypes from "prop-types";
import './styles.css';

export default function ProfileImage({ imageSrc, size }) {
    return (
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
    );
}

ProfileImage.propTypes = {
    imageSrc: PropTypes.string,
    size: PropTypes.oneOf(["extra-small", "extra-large", "small", "medium", "large"]).isRequired,
};