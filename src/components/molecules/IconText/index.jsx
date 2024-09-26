import PropTypes from 'prop-types';

const IconText = ({ children, text }) => (
  <div className="flex flex-row items-end items-center">
    {children}
    <p className="text-lg ml-2">{text}</p>
  </div>
);

IconText.propTypes = {
  iconName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default IconText;
