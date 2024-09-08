import React from 'react';

const SocialLink = ({ href, src, alt }) => (
  <a href={href} className="mr-8">
    <img src={src} alt={alt} />
  </a>
);

export default SocialLink;
