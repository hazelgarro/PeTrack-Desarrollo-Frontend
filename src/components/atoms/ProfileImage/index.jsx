import PropTypes from "prop-types";
import './styles.css';

export default function ProfileImage({ imageSrc = "", defaultImage = "", size, imageAlt, onClick = null }) {
    return (
        <div className={`profile-container profile-${size} ${onClick ? 'cursor-pointer' : ''}`} 
            onClick={onClick}>
            {imageSrc || defaultImage ? (  // Usa imageSrc si existe, si no usa defaultImage
                <img
                    src={imageSrc || defaultImage}
                    alt={imageAlt}
                    className="profile-image"
                />
            ) : (
                <span className="profile-placeholder" />
            )}
        </div>
    );
}

ProfileImage.propTypes = {
    imageSrc: PropTypes.string,
    imageAlt: PropTypes.string,
    defaultImage: PropTypes.string,
    size: PropTypes.oneOf(["extra-small", "extra-large", "small", "medium", "large"]).isRequired,
    onClick: PropTypes.func,
};