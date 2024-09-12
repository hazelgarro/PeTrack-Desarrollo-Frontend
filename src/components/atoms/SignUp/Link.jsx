import React from 'react';

const Link = ({ href, text, className }) => (
  <a className={className} href={href}>
    {text}
  </a>
);

export default Link;