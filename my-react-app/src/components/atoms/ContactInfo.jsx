import React from 'react';

const ContactInfo = ({ icon, text }) => (
  <div className="flex flex-row">
    <img src={icon} alt="Icon" />
    <p className="text-2xl ml-5">{text}</p>
  </div>
);

export default ContactInfo;