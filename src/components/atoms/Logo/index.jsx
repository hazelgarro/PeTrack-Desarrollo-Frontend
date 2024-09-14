import PropTypes from 'prop-types';
import LogoImage from '../../../../public/assets/img/PetrackTextWithLogo.svg';
import './styles.css'; 

export default function Logo({ variant }) {
  return (
    <img
      src={LogoImage}
      alt="Logo"
      className={`logo ${variant ? `logo--${variant}` : ''}`.trim()}
    />
  );
}

Logo.propTypes = {
  variant: PropTypes.oneOf(['extra-small', 'small', 'medium', 'large']).isRequired, //Define  the posibles variantes
};
