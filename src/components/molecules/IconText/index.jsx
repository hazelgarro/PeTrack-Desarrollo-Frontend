import PropTypes from 'prop-types';

import Info from "../../atoms/Icons/Info";

const IconText = ({ iconName, text }) => (
  <div className="flex flex-row items-end">
    <Info iconName={iconName} color="petrack-green" className="h-6 w-6"></Info>
    <p className="text-lg ml-2">{text}</p>
  </div>
);

IconText.propTypes = {
  iconName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default IconText;
