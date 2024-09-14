import PropTypes from 'prop-types';

const ContactInfo = ({ icon, text }) => (
  <div className="flex flex-row">
    <img src={icon} alt="Icon" />
    <p className="text-2xl ml-5">{text}</p>
  </div>
);

ContactInfo.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ContactInfo;
