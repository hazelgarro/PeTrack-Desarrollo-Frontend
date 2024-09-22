import PropTypes from 'prop-types';
import LogoImage from '../../../../public/assets/img/PetrackTextWithLogo.svg';
import './styles.css'; 

export default function Logo({ size }) {
  return (
    <img
      src={LogoImage}
      alt="Logo"
      className={`logo ${size ? `logo--${size}` : ''}`.trim()}
    />
  );
}

Logo.propTypes = {
  size: PropTypes.oneOf(['extra-small', 'small', 'medium', 'large', 'extra-large']).isRequired, //Define  the posibles variantes
};
