import PropTypes from 'prop-types';

const SocialLink = ({ href, src, alt }) => (
  <a href={href} className="mr-8">
    <img src={src} alt={alt} />
  </a>
);

export default SocialLink;

SocialLink.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
