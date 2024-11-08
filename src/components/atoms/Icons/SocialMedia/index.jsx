import PropTypes from 'prop-types';
import InstagramIcon from '../../../../assets/img/Instagram.png';
import YoutubeIcon from '../../../../assets/img/Youtube.png';
import XIcon from '../../../../assets/img/x.png';

const iconMap = {
    instagram: InstagramIcon,
    youtube: YoutubeIcon,
    x: XIcon,
};

export default function SocialIcon({ variant, href }) {
    const iconSrc = iconMap[variant];

    if (!iconSrc) {
        return null; // O puedes mostrar un icono por defecto o un mensaje de error
    }

    return (
        <a href={href} className="">
            <img src={iconSrc} alt={variant} />
        </a>
    );
}

SocialIcon.propTypes = {
    variant: PropTypes.oneOf(['instagram', 'youtube', 'x']).isRequired,
    href: PropTypes.string.isRequired,
};