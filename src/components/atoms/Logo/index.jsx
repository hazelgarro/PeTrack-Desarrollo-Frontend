import PropTypes from 'prop-types';
import logoImage from "../../../assets/img/PetrackTextWithLogo.svg";
import './styles.css'; 

export default function Logo({ size }) {
  return (
    <img
      src={logoImage}
      alt="Logo"
      className={`logo ${size ? `logo--${size}` : ''}`.trim()}
    />
  );
}

Logo.propTypes = {
  size: PropTypes.oneOf(['extra-small', 'small', 'medium', 'large', 'extra-large']).isRequired, //Define  the posibles variantes
};
