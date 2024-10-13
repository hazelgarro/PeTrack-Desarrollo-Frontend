import PropTypes from 'prop-types';
import logoImage from "../../../assets/img/PetrackTextWithLogo.svg";
import isotipo from "../../../assets/img/isotipo.svg";
import './styles.css'; 

export default function Logo({ size, type="imageWithLogo" }) {
  return (
    <img
      src={type === "imageWithLogo" ? (logoImage) : (isotipo)}
      alt="Logo"
      className={`logo ${size ? `logo--${size}` : ''}`.trim()}
    />
  );
}

Logo.propTypes = {
  size: PropTypes.oneOf(['extra-small', 'small', 'medium', 'large', 'extra-large']).isRequired, //Define  the posibles variantes
  type: PropTypes.oneOf(["imageWithLogo", "isotipo"]),
};